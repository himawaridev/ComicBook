'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "antd";
import { XFilled, EditFilled, ReadFilled } from "@ant-design/icons";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

// Import scss and any:
import "@/app/TruyenKiemHiep/TruyenKiemHiepComponent.scss";

interface TruyenKiemHiepComponentType {
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

const TruyenKiemHiepComponent: React.FC = () => {
    const [data, setData] = useState<TruyenKiemHiepComponentType[]>([]);
    const [isloading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const pageSize = 25; // Số item trên mỗi trang

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = (page: number) => {
        setIsLoading(true);
        axios.get(`http://localhost:8000/getTruyenKiemHiepController?page=${page}&limit=${pageSize}`)
            .then((response) => {
                console.log("API Response:", response.data);
                if (response.data && Array.isArray(response.data.TruyenKiemHiepController)) {
                    setData(response.data.TruyenKiemHiepController);
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
        if (isloading) {
            return (
                <Flex style={{ justifyContent: 'center', alignItems: 'center', width: '825px', height: '700px' }}>
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                    <div style={{ marginLeft: '20px' }}>Đang tải dữ liệu...</div>
                </Flex>
            );
        }
        if (error) {
            return (
                <Flex style={{ justifyContent: 'center', alignItems: 'center', width: '825px', height: '700px' }}>
                    <Spin style={{ color: 'red' }} indicator={<LoadingOutlined spin />} size="large" />
                    <div style={{ marginLeft: '20px', color: 'red' }}>{error}</div>
                </Flex>
            );
        }
        if (!isloading && !error && data.length === 0) {
            return <p>Không có dữ liệu.</p>;
        }
        return null;
    };

    return (
        <div id="TruyenKiemHiepComponent">
            <div className="TruyenKiemHiepComponentTitle">
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
                    <div key={index} className="TruyenKiemHiepComponentContent">
                        <Image
                            src={item.ImageLinks}
                            width={190}
                            height={90}
                            alt={item.Title}
                            className="TruyenKiemHiepComponentImages"
                        />
                        <div className="TruyenKiemHiepComponentInformation">
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
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default TruyenKiemHiepComponent;
