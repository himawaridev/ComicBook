'use client'
import { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
import TruyenHoanHotBanner from '@/components/TruyenHoanHotBanner';
import SearchBar from '@/components/SearchBar/SearchBar';

// Import scss and any:
import "@/app/page.scss";

// ------
const HomePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <Flex justify="center" align="center" style={{ height: '520px', cursor: 'pointer' }}>
                <Spin size="large" />
            </Flex>
        );
    }

    return (
        <main id="HomePage">
            <TruyenHoanHotBanner />
            <SearchBar />
        </main>
    );
};

export default HomePage;