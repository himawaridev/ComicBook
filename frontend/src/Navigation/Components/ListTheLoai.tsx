import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"; // Import Link để điều hướng trang
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Import scss and any:
import "@/Views/ListTheLoai.scss";

interface ContentTheLoai {
    title: string;
    slug: string;
    description: string;
    link: string;
}

interface ListTheLoaiProps {
    onClose: () => void;
}

const ListTheLoai: React.FC<ListTheLoaiProps> = ({ onClose }) => {
    const [theloai, setTheLoai] = useState<ContentTheLoai[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8000/getTheLoaiTruyenController")
            .then(response => {
                console.log("[TheLoaiTruyenController] Data:", response.data);
                if (response.data && Array.isArray(response.data.TheLoaiTruyenController)) {
                    setTheLoai(response.data.TheLoaiTruyenController);
                } else {
                    console.error("Error: Unexpected API data format", response.data);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const RenderListTheLoai = () => {
        if (theloai.length === 0) {
            return (
                <Flex style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '500px', height: '50vh' }}>
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </Flex>
            );
        }

        // Chia danh sách thành 3 cột
        const columnSize = Math.ceil(theloai.length / 3);
        const TypeTruyenLeft = theloai.slice(0, columnSize);
        const TypeTruyenMiddle = theloai.slice(columnSize, columnSize * 2);
        const TypeTruyenRight = theloai.slice(columnSize * 2);

        return (
            <div className="list-container">
                <div className="list-column">
                    {TypeTruyenLeft.map((item, index) => (
                        <Link key={index} href={item.link} className="list-item">
                            <div>
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="list-column">
                    {TypeTruyenMiddle.map((item, index) => (
                        <Link key={index} href={item.link} className="list-item">
                            <div>
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="list-column">
                    {TypeTruyenRight.map((item, index) => (
                        <Link key={index} href={item.link} className="list-item">
                            <div>
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div id="ListTheLoai" onClick={onClose}>
            {RenderListTheLoai()}
        </div>
    );
};

export default ListTheLoai;
