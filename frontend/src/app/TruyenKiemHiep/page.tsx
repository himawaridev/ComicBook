'use client';
import React, { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
// Import components and any :
import RenderListTruyen from "@/app/Render/RenderListTruyen/RenderListTruyen";
import TypeTruyen from "@/Types/TypeTruyen";

// Import scss and any:
import "@/app/TruyenKiemHiep/page.scss";

const TruyenKiemHiep: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
        <main id="TruyenKiemHiep">
            <RenderListTruyen
                title="TRUYỆN KIẾM HIỆP HOÀN"
                apiEndpoint="http://localhost:8000/getTruyenKiemHiepController"
            />
            <TypeTruyen />
        </main>
    )
}
export default TruyenKiemHiep;