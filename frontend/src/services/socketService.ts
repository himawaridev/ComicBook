import { io, Socket } from 'socket.io-client';

// Định nghĩa các types cho data
interface UpdateData {
    message: string;
    timestamp: Date;
    count: number;
}

interface ErrorData {
    message: string;
    error: string;
    timestamp: Date;
}

// Tạo kết nối socket
const socket: Socket = io('http://localhost:8000');

// Hàm để lắng nghe sự kiện cập nhật dữ liệu
export const listenForDataUpdates = (callback: (data: UpdateData) => void): void => {
    socket.on('dataUpdated', (data: UpdateData) => {
        console.log('Dữ liệu mới đã được cập nhật:', data);
        callback(data);
    });
};

// Hàm để lắng nghe sự kiện lỗi
export const listenForErrors = (callback: (error: ErrorData) => void): void => {
    socket.on('updateError', (error: ErrorData) => {
        console.error('Lỗi cập nhật dữ liệu:', error);
        callback(error);
    });
};

// Hàm để ngắt kết nối socket
export const disconnectSocket = (): void => {
    socket.disconnect();
};

// Export socket instance nếu cần sử dụng trực tiếp
export default socket; 