'use client';
import React, { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
// Import components and any :
import RenderListTruyen from "@/app/Render/RenderListTruyen/RenderListTruyen";
import TypeTruyen from "@/Types/TypeTruyen";

// Import scss and any:
import "@/app/TruyenHot/page.scss";

const TruyenHot: React.FC = () => {
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
        <main id="TruyenHot">
            <RenderListTruyen
                title="TRUYỆN HOT"
                apiEndpoint="http://localhost:8000/getTruyenHotController"
            />
            <TypeTruyen />
        </main>
    )
}
export default TruyenHot;