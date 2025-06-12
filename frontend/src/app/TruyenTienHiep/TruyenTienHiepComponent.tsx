'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Pagination, Flex, Spin } from "antd";
import { XFilled, EditFilled, ReadFilled } from "@ant-design/icons";

// Import scss and any:
import "@/app/TruyenTienHiep/TruyenTienHiepComponent.scss";

interface TruyenTienHiepComponentType {
    id: number;
    Slug: string;
    ImageLinks: string;
    Title: string;
    LinkComic: string;
    Author: string;
    Chapters: string;
    createdAt: string;
    updatedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'; // Set API URL
const PAGE_SIZE = 25; // Set item quantity per page

const TruyenTienHiepComponent: React.FC = () => {
    const [data, setData] = useState<TruyenTienHiepComponentType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Phân trang
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = (page: number) => {
        setIsLoading(true);
        axios.get(`${API_BASE_URL}/getTruyenTienHiepController?page=${page}&limit=${PAGE_SIZE}`)
            .then((response) => {
                console.log("API Response:", response.data);
                if (response.data && Array.isArray(response.data.TruyenTienHiepController)) {
                    setData(response.data.TruyenTienHiepController);
                    setTotalItems(response.data.total || 0); // Tổng số truyện
                } else {
                    setError("Dữ liệu không hợp lệ!");
                }
            })
            .catch((error) => {
                console.error("API Error:", error.message);
                setError("Không thể tải dữ liệu!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Hàm render trạng thái loading / error / không có dữ liệu
    const renderStatus = () => {
        if (isLoading) {
            return (
                <Flex justify="center" align="center" style={{ height: '520px', cursor: 'pointer' }}>
                    <Spin size="large" />
                </Flex>
            );
        }
        if (error) {
            return (
                <Flex justify="center" align="center" style={{ height: '520px', cursor: 'pointer' }}>
                    <Spin size="large" />
                    <Link href="/HoTroNhanh" style={{ marginLeft: '25px', color: '#1890ff', fontSize: '13px' }}>{error}</Link>
                </Flex>
            );
        }
        if (!isLoading && !error && data.length === 0) {
            return (
                <Link href="/HoTroNhanh" style={{ marginLeft: '25px', color: '#1890ff', fontSize: '13px' }}>Không có dữu liệu!</Link>
            );
        }
        return null;
    };

    return (
        <div id="TruyenTienHiepComponent">
            <div className="TruyenTienHiepComponentTitle">
                <div className="TitleName">TRUYỆN TIÊN HIỆP HOÀN</div>
                <div className="Button">
                    <div className="ButtonTogether ButtonSelective">CHỌN LỌC</div>
                    <div className="ButtonTogether ButtonHot">HOT</div>
                    <div className="ButtonTogether ButtonNew">MỚI</div>
                </div>
            </div>

            {renderStatus()}

            <div className="">
                {data.map((item, index) => (
                    <div key={index} className="TruyenTienHiepComponentContent">
                        <Image
                            src={item.ImageLinks}
                            width={190}
                            height={90}
                            alt={item.Title}
                            className="TruyenTienHiepComponentImages"
                        />
                        <div className="TruyenTienHiepComponentInformation">
                            <div className="InformationAll">
                                <XFilled />
                                <Link href="/" className="Title InformationAllText">{item.Title}</Link>
                                <div className="Full">FULL</div>
                                <div className="Hot">HOT</div>
                            </div>
                            <div className="InformationAll">
                                <EditFilled />
                                <div className="Author InformationAllText">{item.Author}</div>
                            </div>
                            <div className="InformationAll">
                                <ReadFilled />
                                <div className="Chapters InformationAllText">{item.Chapters}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="Pagination">
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={PAGE_SIZE}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false} // Ẩn thay đổi số item trên mỗi trang
                />
            </div>
        </div>
    );
};

export default TruyenTienHiepComponent;