'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Flex, Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "@/components/TruyenMoiCapNhat.scss";

interface Story {
    id: number;
    Title: string;
    ImageLinks: string;
    LinkComic: string;
    Author: string;
    Chapters: string;
    updatedAt: string;
}

const TruyenMoiCapNhat = () => {
    const [data, setData] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pageSize = 10;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/getTruyenMoiCapNhatController?page=1&limit=${pageSize}`);
            if (response.data && Array.isArray(response.data.TruyenMoiCapNhatController)) {
                setData(response.data.TruyenMoiCapNhatController);
            } else {
                setError("Dữ liệu không hợp lệ");
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Không thể tải dữ liệu");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Flex style={{ justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Flex style={{ justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <Typography.Text type="danger">{error}</Typography.Text>
            </Flex>
        );
    }

    return (
        <div className="truyen-moi-cap-nhat">
            <div className="section-header">
                <h2>TRUYỆN MỚI CẬP NHẬT</h2>
            </div>
            <div className="stories-grid">
                {data.map((story) => (
                    <div key={story.id} className="story-card">
                        <Link href={story.LinkComic}>
                            <div className="story-image">
                                <Image
                                    src={story.ImageLinks}
                                    width={120}
                                    height={160}
                                    alt={story.Title}
                                    className="story-thumbnail"
                                />
                            </div>
                            <div className="story-info">
                                <h3 className="story-title">{story.Title}</h3>
                                <p className="story-author">{story.Author}</p>
                                <p className="story-chapters">{story.Chapters}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TruyenMoiCapNhat; 