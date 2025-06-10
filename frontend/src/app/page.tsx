'use client'
import { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import TruyenHoanHotBanner from '@/components/TruyenHoanHotBanner';
import TruyenMoiCapNhat from '@/components/TruyenMoiCapNhat';
import TruyenHoan from '@/components/TruyenHoan';

// Import scss and any:
import "@/app/page.scss";

// ------
const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <Flex justify="center" align="center" style={{ height: '100vh' }}>
                <Spin size="large" />
            </Flex>
        );
    }

    return (
        <main className="home-page">
            <TruyenHoanHotBanner />
            {/* <TruyenMoiCapNhat />
            <TruyenHoan /> */}
            {/* <TruyenMoiDang />
            <TruyenHot /> */}
        </main>
    );
};

export default HomePage;