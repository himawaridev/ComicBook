'use client'
import {
    Pagination, Flex, Spin,
    useState, useEffect,
    axios,
    XFilled, EditFilled, ReadFilled,
    Image, Link
} from '@/lib/Export_lib'
import { EffectLoading, useLoading } from '@/app/components';

// Import scss and any:
import "@/Views/RenderListTruyen.scss";

interface RenderListTruyenType {
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

interface RenderListTruyenProps {
    title: string;
    apiEndpoint: string;
    showFilters?: boolean;
}

const RenderListTruyen: React.FC<RenderListTruyenProps> = ({
    title,
    apiEndpoint,
    showFilters = true
}) => {
    const [data, setData] = useState<RenderListTruyenType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const PAGE_SIZE = 25;

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = (page: number) => {
        setIsLoading(true);
        axios.get(`${apiEndpoint}?page=${page}&limit=${PAGE_SIZE}`)
            .then((response) => {
                if (response.data && Array.isArray(response.data[Object.keys(response.data)[0]])) {
                    setData(response.data[Object.keys(response.data)[0]]);
                    setTotalItems(response.data.total || 0);
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

    const renderStatus = () => {
        if (isLoading) {
            return (
                <Flex justify="center" align="center" style={{ width: '825px', height: '520px', cursor: 'pointer' }}>
                    <Spin size="default" />
                </Flex>
            );
        }
        if (error) {
            return (
                <Flex justify="center" align="center" style={{ width: '825px', height: '520px', cursor: 'pointer' }}>
                    <Spin size="default" />
                    <Link href="/HoTroNhanh" style={{ marginLeft: '25px', color: '#1890ff', fontSize: '13px' }}>{error}</Link>
                </Flex>
            );
        }
        if (!isLoading && !error && data.length === 0) {
            return (
                <Flex justify="center" align="center" style={{ width: '825px', height: '520px', cursor: 'pointer' }}>
                    <Spin size="default" />
                    <Link href="/HoTroNhanh" style={{ marginLeft: '25px', color: '#1890ff', fontSize: '13px' }}>Không có dữu liệu!</Link>
                </Flex>
            );
        }
        return null;
    };

    return (
        <div id="RenderListTruyen">
            <div className="RenderListTruyenTitle">
                <div className="TitleName">{title}</div>
                {showFilters && (
                    <div className="Button">
                        <div className="ButtonTogether ButtonSelective">CHỌN LỌC</div>
                        <div className="ButtonTogether ButtonHot">HOT</div>
                        <div className="ButtonTogether ButtonNew">MỚI</div>
                    </div>
                )}
            </div>

            {renderStatus()}

            <div className="">
                {data.map((item, index) => (
                    <div key={index} className="RenderListTruyenContent">
                        <Image
                            src={item.ImageLinks}
                            width={190}
                            height={90}
                            alt={item.Title}
                            className="RenderListTruyenImages"
                        />
                        <div className="RenderListTruyenInformation">
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
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}
export default RenderListTruyen;