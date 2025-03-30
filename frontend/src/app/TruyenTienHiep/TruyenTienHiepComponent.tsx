'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "antd";
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

const TruyenTienHiepComponent: React.FC = () => {
    const [data, setData] = useState<TruyenTienHiepComponentType[]>([]);
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
        axios.get(`http://localhost:9000/getTruyenTienHiepController?page=${page}&limit=${pageSize}`)
            .then((response) => {
                console.log("API Response:", response.data);
                if (response.data && response.data.TruyenTienHiepController) {
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

    return (
        <div id="TruyenTienHiepComponent">
            {isloading && <p>Đang tải dữ liệu...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!isloading && !error && data.length === 0 && <p>Không có dữ liệu.</p>}
            <div className="TruyenTienHiepComponentTitle">
                <div className="TitleName">TRUYỆN TIÊN HIỆP HOÀN</div>
                <div className="Button">
                    <div className="ButtonTogether ButtonSelective">CHỌN LỌC</div>
                    <div className="ButtonTogether ButtonHot">HOT</div>
                    <div className="ButtonTogether ButtonNew">MỚI</div>
                </div>
            </div>
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
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false} // Ẩn thay đổi số item trên mỗi trang
                />
            </div>
        </div>
    );
};

export default TruyenTienHiepComponent;
