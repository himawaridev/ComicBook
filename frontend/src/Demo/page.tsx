'use client';
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from "axios";

interface TruyenTienHiep {
    Slug: string;
    ImageLinks: string;
    Title: string;
    LinkComic: string;
    Author: string;
    Chapters: string;
    StatusCrawler?: number; // 0: Đang cập nhật, 1: Full
}

const Demo: React.FC = () => {
    const [demo, setDemo] = useState<TruyenTienHiep[]>([]); // Sửa kiểu dữ liệu phù hợp

    useEffect(() => {
        axios.get('http://localhost:2000/truyen-tien-hiep')
            .then(response => {
                console.log("[Data TruyenTienHiep: ]", response);
                if (response.data && response.data.data) {
                    setDemo(response.data.data); // Đảm bảo lấy đúng trường dữ liệu
                }
            })
            .catch((err) => console.log("Error: ", err.message));
    }, []);

    // Hàm render danh sách
    const RenderDemo = () => {
        return demo.map((item, index: number) => (
            <div key={index} className="border p-4 rounded-md shadow-md">
                <h2 className="text-xl font-bold">{item.Title}</h2>
                <Image src={item.ImageLinks} alt={item.Title} width={200} height={300} />
                <p className="text-gray-600">Tác giả: {item.Author}</p>
                <Link href={item.LinkComic} className="text-blue-500 hover:underline">
                    Đọc ngay
                </Link>
            </div>
        ));
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            {demo.length > 0 ? RenderDemo() : <p>Đang tải dữ liệu...</p>}
        </div>
    );
};

export default Demo;
