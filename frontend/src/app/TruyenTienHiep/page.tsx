'use client';
import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
// Import components and any :
import TruyenTienHIepComponent from "@/app/TruyenTienHiep/TruyenTienHiepComponent";
import TypeTruyen from "@/Types/TypeTruyen";

// Import scss and any:
import "@/app/TruyenTienHiep/page.scss";

const TruyenTienHiep: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Giả lập việc tải các thư viện hoặc CSS
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Sau khi thư viện CSS đã tải xong, set trạng thái isLoading về false
        }, 500); // 500ms hoặc thời gian bạn cho là đủ để tải CSS
        return () => clearTimeout(timer); // Clear timeout nếu component bị unmount
    }, []);

    if (isLoading) {
        return (
            <Flex style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </Flex>
        );
        // Hiển thị loader trong khi chờ tải
    }
    return (
        <div id="TruyenTienHiep">
            <TruyenTienHIepComponent />
            <TypeTruyen />
        </div>
    )
}
export default TruyenTienHiep;