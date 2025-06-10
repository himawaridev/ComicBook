'use client'
import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Flex, Spin, Dropdown, Space, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";
import "@/components/TruyenHoanHotBanner.scss";

interface Comic {
    id: number;
    Slug: string;
    ImageLinks: string;
    NameComic: string;
    LinkComic: string;
    Description?: string;
    Author?: string;
    Status?: string;
}

type CategoryType = 'hot' | 'tien-hiep' | 'kiem-hiep';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const PAGE_SIZE = 13;

const TruyenHoanHotComponent = () => {
    const [data, setData] = useState<Comic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState<CategoryType>('hot');

    const fetchData = useCallback(async (category: CategoryType) => {
        setLoading(true);
        setError(null);

        let apiUrl = '';
        switch (category) {
            case "tien-hiep":
                apiUrl = `${API_BASE_URL}/getTruyenTienHiepController?page=1&limit=${PAGE_SIZE}`;
                break;
            case "kiem-hiep":
                apiUrl = `${API_BASE_URL}/getTruyenHotController?page=1&limit=${PAGE_SIZE}`;
                break;
            default:
                apiUrl = `${API_BASE_URL}/getTruyenHoanHotController?page=1&limit=${PAGE_SIZE}`;
        }

        try {
            const { data: responseData } = await axios.get(apiUrl);
            const comicData = responseData.TruyenHoanHotController ||
                responseData.TruyenHotController ||
                responseData.TruyenTienHiepController;

            if (Array.isArray(comicData)) {
                setData(comicData);
            } else {
                throw new Error("Invalid data structure received from API");
            }
        } catch (err) {
            console.error("Error fetching data: ", err);
            setError(err instanceof Error ? err.message : "Không thể tải dữ liệu từ server. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(category);
    }, [category, fetchData]);

    const handleCategoryChange = useCallback((newCategory: CategoryType) => {
        setCategory(newCategory);
    }, []);

    if (loading) return <LoadingView text="Đang tải dữ liệu..." />;
    if (error) return <LoadingView text={error} isError />;

    return (
        <div id="TruyenHoanHotComponent">
            <div className="TruyenHoanHotComponentHeader">
                <Header setCategory={handleCategoryChange} currentCategory={category} />
            </div>
            <div className="THCC">
                <div className="WrapperTHCC">
                    {data.map((item, index) => (
                        <div key={item.id} className={clsx("TruyenHoanHotComponentContent", {
                            "first-item": index === 0,
                            "seventh-item": index === 7
                        })}>
                            <Link href={item.LinkComic}>
                                <Image
                                    src={item.ImageLinks}
                                    width={index === 0 ? 258 : 129}
                                    height={index === 0 ? 394 : 192}
                                    alt={item.NameComic || "Comic image"}
                                    className="TruyenHoanHotComponentImages"
                                    loading={index < 4 ? "eager" : "lazy"}
                                    priority={index === 0}
                                />
                                <div className="TruyenHoanHotComponentName">{item.NameComic}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface HeaderProps {
    setCategory: (category: CategoryType) => void;
    currentCategory: CategoryType;
}

const Header = ({ setCategory, currentCategory }: HeaderProps) => {
    const categoryMap: Record<CategoryType, string> = {
        'hot': 'TẤT CẢ',
        'tien-hiep': 'TIÊN HIỆP',
        'kiem-hiep': 'KIẾM HIỆP'
    };

    const handleMenuClick = useCallback((key: string) => {
        const categoryMap: Record<string, CategoryType> = {
            '1': 'hot',
            '2': 'tien-hiep',
            '3': 'kiem-hiep'
        };
        const newCategory = categoryMap[key];
        if (newCategory && newCategory !== currentCategory) {
            setCategory(newCategory);
        }
    }, [setCategory, currentCategory]);

    const menuItems = useMemo(() => [
        { key: '1', label: 'TẤT CẢ', onClick: () => handleMenuClick('1') },
        { key: '2', label: 'TIÊN HIỆP', onClick: () => handleMenuClick('2') },
        { key: '3', label: 'KIẾM HIỆP', onClick: () => handleMenuClick('3') }
    ], [handleMenuClick]);

    const getSelectedKey = useCallback(() => {
        const keyMap: Record<CategoryType, string> = {
            'hot': '1',
            'tien-hiep': '2',
            'kiem-hiep': '3'
        };
        return [keyMap[currentCategory]];
    }, [currentCategory]);

    return (
        <div className="TruyenHoanHotComponentTitle">
            <div className="TitleName">TRUYỆN HOT</div>
            <Dropdown
                menu={{
                    items: menuItems,
                    selectable: true,
                    selectedKeys: getSelectedKey(),
                }}
            >
                <Typography.Link>
                    <Space style={{ color: 'rgb(78, 78, 78)' }}>
                        {categoryMap[currentCategory]}
                    </Space>
                </Typography.Link>
            </Dropdown>
        </div>
    );
};

interface LoadingViewProps {
    text: string;
    isError?: boolean;
}

const LoadingView = ({ text, isError = false }: LoadingViewProps) => (
    <Flex style={{ justifyContent: 'center', alignItems: 'center', width: '825px', height: '700px' }}>
        <Spin indicator={<LoadingOutlined spin />} size="large" style={{ color: isError ? 'red' : 'inherit' }} />
        <div style={{ marginLeft: '20px', color: isError ? 'red' : 'inherit' }}>{text}</div>
    </Flex>
);

export default TruyenHoanHotComponent;


