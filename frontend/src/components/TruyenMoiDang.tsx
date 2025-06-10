'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Flex, Spin, Typography } from 'antd';
import './TruyenMoiDang.scss';

interface Story {
    id: number;
    Title: string;
    ImageLinks: string;
    LinkComic: string;
    Author: string;
    Chapters: string;
}

const TruyenMoiDang = () => {
    const [data, setData] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pageSize = 8;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getTruyenMoiDangController?page=1&limit=${pageSize}`);
                setData(response.data);
                setError(null);
            } catch (err) {
                setError('Không thể tải dữ liệu truyện mới đăng');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Flex justify="center" align="center" style={{ padding: '2rem' }}>
                <Spin size="large" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Typography.Text type="danger" style={{ display: 'block', textAlign: 'center', padding: '2rem' }}>
                {error}
            </Typography.Text>
        );
    }

    return (
        <div className="truyen-moi-dang">
            <div className="section-header">
                <h2>Truyện Mới Đăng</h2>
            </div>
            <div className="stories-grid">
                {data.map((story) => (
                    <Link href={`/truyen/${story.id}`} key={story.id} className="story-card">
                        <div className="story-image">
                            <Image
                                src={story.ImageLinks}
                                alt={story.Title}
                                width={200}
                                height={300}
                                style={{ objectFit: 'cover' }}
                                loading="lazy"
                            />
                        </div>
                        <div className="story-info">
                            <h3 className="story-title">{story.Title}</h3>
                            <p className="story-author">Tác giả: {story.Author}</p>
                            <p className="story-chapters">Chương: {story.Chapters}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TruyenMoiDang; 