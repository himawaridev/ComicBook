const { Server } = require('socket.io');

class SocketManager {
    constructor() {
        this.io = null;
        this.connectedClients = new Map();
        this.updateQueue = [];
        this.isProcessing = false;
    }

    // Khởi tạo Socket.IO server
    initialize(server) {
        this.io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            },
            // Tối ưu hóa hiệu suất
            pingTimeout: 60000,
            pingInterval: 25000,
            transports: ['websocket', 'polling'],
            maxHttpBufferSize: 1e8 // 100MB
        });

        this.setupEventHandlers();
        return this.io;
    }

    // Thiết lập các event handlers
    setupEventHandlers() {
        this.io.on('connection', (socket) => {
            // Lấy thông tin chi tiết về client
            const clientInfo = {
                id: socket.id,
                handshake: {
                    address: socket.handshake.address,
                    time: new Date(socket.handshake.time).toLocaleString(),
                    query: socket.handshake.query,
                    headers: {
                        'user-agent': socket.handshake.headers['user-agent'],
                        'accept-language': socket.handshake.headers['accept-language']
                    }
                },
                transport: socket.conn.transport.name,
                totalClients: this.connectedClients.size + 1
            };

            // Lưu thông tin client vào Map
            this.connectedClients.set(socket.id, {
                socket,
                info: clientInfo,
                clientData: null
            });

            // Xử lý thông tin client từ frontend
            socket.on('clientInfo', (data) => {
                const client = this.connectedClients.get(socket.id);
                if (client) {
                    client.clientData = data;
                    console.log('[🔌 Socket] Client information updated:', {
                        id: socket.id,
                        ip: clientInfo.handshake.address,
                        time: new Date().toLocaleString(),
                        browser: {
                            userAgent: data.browser.userAgent,
                            language: data.browser.language,
                            platform: data.browser.platform
                        },
                        screen: {
                            width: data.screen.width,
                            height: data.screen.height,
                            orientation: data.screen.orientation
                        },
                        viewport: {
                            width: data.viewport.width,
                            height: data.viewport.height
                        },
                        connection: {
                            type: data.connection.effectiveType,
                            downlink: data.connection.downlink,
                            rtt: data.connection.rtt
                        },
                        timezone: data.time.timezone,
                        url: data.url.pathname,
                        totalClients: this.connectedClients.size
                    });
                }
            });

            // Xử lý khi client ngắt kết nối
            socket.on('disconnect', (reason) => {
                const client = this.connectedClients.get(socket.id);
                console.log('[🔌 Socket] Client disconnected:', {
                    id: socket.id,
                    reason: reason,
                    time: new Date().toLocaleString(),
                    lastKnownInfo: client?.clientData ? {
                        browser: client.clientData.browser.userAgent,
                        screen: `${client.clientData.screen.width}x${client.clientData.screen.height}`,
                        url: client.clientData.url.pathname
                    } : null,
                    remainingClients: this.connectedClients.size - 1
                });
                this.connectedClients.delete(socket.id);
            });

            // Xử lý lỗi kết nối
            socket.on('error', (error) => {
                const client = this.connectedClients.get(socket.id);
                console.error('[❌ Socket Error]', {
                    id: socket.id,
                    error: error.message,
                    time: new Date().toLocaleString(),
                    stack: error.stack,
                    clientInfo: client?.clientData ? {
                        browser: client.clientData.browser.userAgent,
                        url: client.clientData.url.pathname
                    } : null
                });
                this.connectedClients.delete(socket.id);
            });
        });
    }

    // Gửi thông báo cập nhật dữ liệu
    async broadcastUpdate(data) {
        if (!this.io) return;

        try {
            // Thêm vào queue
            this.updateQueue.push(data);

            // Nếu đang xử lý queue, không làm gì cả
            if (this.isProcessing) return;

            // Bắt đầu xử lý queue
            this.isProcessing = true;

            while (this.updateQueue.length > 0) {
                const updateData = this.updateQueue.shift();

                // Gửi thông báo cho tất cả clients
                this.io.emit('dataUpdated', {
                    ...updateData,
                    timestamp: new Date(),
                    clientCount: this.connectedClients.size
                });
            }
        } catch (error) {
            console.error('[❌ Broadcast Error]', error);
            // Gửi thông báo lỗi cho tất cả clients
            this.io.emit('updateError', {
                message: 'Lỗi khi cập nhật dữ liệu',
                error: error.message,
                timestamp: new Date()
            });
        } finally {
            this.isProcessing = false;
        }
    }

    // Gửi thông báo lỗi
    broadcastError(error) {
        if (!this.io) return;

        this.io.emit('updateError', {
            message: 'Lỗi khi cập nhật dữ liệu',
            error: error.message,
            timestamp: new Date()
        });
    }

    // Lấy số lượng clients đang kết nối
    getConnectedClientsCount() {
        return this.connectedClients.size;
    }

    // Đóng kết nối Socket.IO
    close() {
        if (this.io) {
            this.io.close();
            this.connectedClients.clear();
            this.updateQueue = [];
            this.isProcessing = false;
        }
    }
}

// Export một instance duy nhất (Singleton pattern)
module.exports = new SocketManager(); 