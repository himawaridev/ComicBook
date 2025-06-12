'use client';
import React, { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
// Import components and any :
import TruyenTienHIepComponent from "@/app/TruyenTienHiep/TruyenTienHiepComponent";
import TypeTruyen from "@/Types/TypeTruyen";

// Import scss and any:
import "@/app/TruyenTienHiep/page.scss";

const TruyenTienHiep: React.FC = () => {
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
        <div id="TruyenTienHiep">
            <TruyenTienHIepComponent />
            <TypeTruyen />
        </div>
    )
}
export default TruyenTienHiep;