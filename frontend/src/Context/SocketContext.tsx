'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import socket, { listenForDataUpdates, listenForErrors, disconnectSocket } from '@/services/socketService';

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

interface SocketContextType {
    isConnected: boolean;
    lastUpdate: UpdateData | null;
    lastError: ErrorData | null;
}

const SocketContext = createContext<SocketContextType>({
    isConnected: false,
    lastUpdate: null,
    lastError: null,
});

export const useSocket = () => useContext(SocketContext);

const getClientInfo = () => {
    return {
        browser: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            platform: navigator.platform,
        },
        screen: {
            width: window.screen.width,
            height: window.screen.height,
            colorDepth: window.screen.colorDepth,
            pixelDepth: window.screen.pixelDepth,
            orientation: window.screen.orientation?.type,
        },
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
        connection: {
            effectiveType: (navigator as any).connection?.effectiveType,
            downlink: (navigator as any).connection?.downlink,
            rtt: (navigator as any).connection?.rtt,
        },
        time: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            offset: new Date().getTimezoneOffset(),
        },
        url: {
            href: window.location.href,
            pathname: window.location.pathname,
            search: window.location.search,
        }
    };
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdate, setLastUpdate] = useState<UpdateData | null>(null);
    const [lastError, setLastError] = useState<ErrorData | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        socket.emit('clientInfo', getClientInfo());

        socket.on('connect', () => {
            setIsConnected(true);
            socket.emit('clientInfo', getClientInfo());
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        listenForDataUpdates((data) => {
            setLastUpdate(data);
        });

        listenForErrors((error) => {
            setLastError(error);
        });

        return () => {
            disconnectSocket();
        };
    }, [isClient]);

    if (!isClient) {
        return <>{children}</>;
    }

    return (
        <SocketContext.Provider value={{ isConnected, lastUpdate, lastError }}>
            {children}
        </SocketContext.Provider>
    );
};