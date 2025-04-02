import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TruyenHotComponentType {
    // Định nghĩa kiểu dữ liệu của các mục trong `TruyenHotComponentType`
    // Ví dụ:
    id: number;
    title: string;
    author: string;
    // thêm các thuộc tính cần thiết khác
}

const TruyenHotView: React.FC<{ params: { id: number } }> = ({ params }) => {
    const [data, setData] = useState<TruyenHotComponentType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const pageSize = 25; // Số item trên mỗi trang

    useEffect(() => {
        setIsLoading(true); // Đặt trạng thái loading là true khi gọi API
        axios
            .get(`http://localhost:8000/getTruyenHotController?page=${page}&limit=${pageSize}`)
            .then((response) => {
                console.log("API Response:", response.data);
                if (response.data && Array.isArray(response.data.TruyenHotController)) {
                    setData(response.data.TruyenHotController);
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
                setIsLoading(false); // Đặt trạng thái loading là false khi API gọi xong
            });
    }, [params.id]); // useEffect sẽ chạy lại khi `params.id` thay đổi

    return (
        <div>
            {isLoading && <p>Đang tải dữ liệu...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!isLoading && !error && data.length > 0 && (
                <div>
                    <h2>Truyện Hot</h2>
                    <ul>
                        {data.map((truyen) => (
                            <li key={truyen.id}>
                                <h3>{truyen.title}</h3>
                                <p>Author: {truyen.author}</p>
                                {/* Hiển thị thông tin truyện tại đây */}
                            </li>
                        ))}
                    </ul>
                    <p>Tổng số truyện: {totalItems}</p>
                </div>
            )}
        </div>
    );
};

export default TruyenHotView;
