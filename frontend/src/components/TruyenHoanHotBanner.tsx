// 'use client'
// import { LoadingOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { Flex, Spin, Dropdown, Space, Typography } from "antd";
// import clsx from "clsx"; // Dùng để gộp class dễ dàng hơn
// import "@/components/TruyenHoanHotBanner.scss"; // Import CSS

// interface Comic {
//     id: number;
//     Slug: string;
//     ImageLinks: string;
//     NameComic: string;
//     LinkComic: string;
// }

// const TruyenHoanHotComponent = () => {
//     const [data, setData] = useState<Comic[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const pageSize = 13;

//     useEffect(() => {
//         axios.get(`http://localhost:8000/getTruyenHoanHotController?page=1&limit=${pageSize}`)
//             .then(({ data }) => {
//                 if (Array.isArray(data.TruyenHoanHotController)) {
//                     setData(data.TruyenHoanHotController);
//                 } else {
//                     setError("Dữ liệu không hợp lệ!");
//                 }
//             })
//             .catch(() => setError("Không thể tải dữ liệu!"))
//             .finally(() => setLoading(false));
//     }, []);

//     // Component Loading/Error
//     const LoadingView = ({ text, isError = false }: { text: string, isError?: boolean }) => (
//         <Flex style={{ justifyContent: 'center', alignItems: 'center', width: '825px', height: '700px' }}>
//             <Spin indicator={<LoadingOutlined spin />} size="large" style={{ color: isError ? 'red' : 'inherit' }} />
//             <div style={{ marginLeft: '20px', color: isError ? 'red' : 'inherit' }}>{text}</div>
//         </Flex>
//     );

//     if (loading) return <LoadingView text="Đang tải dữ liệu..." />;
//     if (error) return <LoadingView text={error} isError />;

//     return (
//         <div id="TruyenHoanHotComponent">
//             <Header />
//             <div className="THCC">
//                 {data.map((item, index) => (
//                     <div key={item.id} className={clsx("TruyenHoanHotComponentContent", {
//                         "first-item": index === 0,
//                         "seventh-item": index === 7
//                     })}>
//                         <Link href={item.LinkComic}>
//                             <Image
//                                 src={item.ImageLinks}
//                                 width={index === 0 ? 258 : 129}
//                                 height={index === 0 ? 394 : 192}
//                                 alt={item.NameComic}
//                                 className="TruyenHoanHotComponentImages"
//                             />
//                             <div className="TruyenHoanHotComponentName">{item.NameComic}</div>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // Component Header
// const Header = () => (
//     <div className="TruyenHoanHotComponentTitle">
//         <div className="TitleName">TRUYỆN HOT</div>
//         <Dropdown menu={{
//             items: [
//                 { key: '1', label: 'TẤT CẢ' },
//                 { key: '2', label: 'TIÊN HIỆP' },
//                 { key: '3', label: 'KIẾM HIỆP' }
//             ],
//             selectable: true,
//             defaultSelectedKeys: ['3'],
//         }}>
//             <Typography.Link>
//                 <Space>TẤT CẢ</Space>
//             </Typography.Link>
//         </Dropdown>
//     </div>
// );

// export default TruyenHoanHotComponent;
'use client'
import { useEffect, useState } from "react";
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
}

const TruyenHoanHotComponent = () => {
    const [data, setData] = useState<Comic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState("hot");
    const pageSize = 13;

    useEffect(() => {
        fetchData(category);
    }, [category]);

    const fetchData = (category: string) => {
        setLoading(true);
        let apiUrl = "";

        switch (category) {
            case "tien-hiep":
                apiUrl = `http://localhost:8000/getTruyenTienHiepController?page=1&limit=${pageSize}`;
                break;
            case "kiem-hiep":
                apiUrl = `http://localhost:8000/getTruyenHotController?page=1&limit=${pageSize}`;
                break;
            default:
                apiUrl = `http://localhost:8000/getTruyenHoanHotController?page=1&limit=${pageSize}`;
        }

        axios.get(apiUrl)
            .then(({ data }) => {
                if (Array.isArray(data.TruyenHoanHotController)) {
                    setData(data.TruyenHoanHotController);
                } else if (Array.isArray(data.TruyenHotController)) {
                    setData(data.TruyenHotController);
                } else if (Array.isArray(data.TruyenTienHiepController)) {
                    setData(data.TruyenTienHiepController);
                } else {
                    setError("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại cấu trúc API.");
                }
            })
            .catch((err) => {
                console.error("Error fetching data: ", err);
                setError("Không thể tải dữ liệu từ server. Vui lòng thử lại sau.");
            })
            .finally(() => setLoading(false));
    };

    if (loading) return <LoadingView text="Đang tải dữ liệu..." />;
    if (error) return <LoadingView text={error} isError />;

    return (
        <div id="TruyenHoanHotComponent">
            <Header setCategory={setCategory} />
            <div className="THCC">
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
                                alt={item.NameComic || "Comic image"} // Correct alt property
                                className="TruyenHoanHotComponentImages"
                            />
                            <div className="TruyenHoanHotComponentName">{item.NameComic}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Component Header with Dropdown
const Header = ({ setCategory }: { setCategory: (category: string) => void }) => {
    const handleMenuClick = (key: string) => {
        if (key === "1") setCategory("hot");
        else if (key === "2") setCategory("tien-hiep");
        else if (key === "3") setCategory("kiem-hiep");
    };

    return (
        <div className="TruyenHoanHotComponentTitle">
            <div className="TitleName">TRUYỆN HOT</div>
            <Dropdown
                menu={{
                    items: [
                        { key: '1', label: 'TẤT CẢ', onClick: () => handleMenuClick('1') },
                        { key: '2', label: 'TIÊN HIỆP', onClick: () => handleMenuClick('2') },
                        { key: '3', label: 'KIẾM HIỆP', onClick: () => handleMenuClick('3') }
                    ],
                    selectable: true,
                    defaultSelectedKeys: ['1'],
                }}
            >
                <Typography.Link onClick={() => setCategory("hot")}>
                    <Space style={{ color: 'rgb(78, 78, 78)' }}>TẤT CẢ</Space>
                </Typography.Link>
            </Dropdown>
        </div>
    );
};

// Component Loading/Error
const LoadingView = ({ text, isError = false }: { text: string, isError?: boolean }) => (
    <Flex style={{ justifyContent: 'center', alignItems: 'center', width: '825px', height: '700px' }}>
        <Spin indicator={<LoadingOutlined spin />} size="large" style={{ color: isError ? 'red' : 'inherit' }} />
        <div style={{ marginLeft: '20px', color: isError ? 'red' : 'inherit' }}>{text}</div>
    </Flex>
);

export default TruyenHoanHotComponent;


