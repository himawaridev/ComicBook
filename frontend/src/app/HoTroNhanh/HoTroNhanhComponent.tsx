import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import Link from 'next/link';

// Import scss and any:
import "@/app/HoTroNhanh/HoTroNhanhComponent.scss";

interface DataType {
    gender?: string;
    name?: string;
    email?: string;
    avatar?: string;
    loading: boolean;
}

const PAGE_SIZE = 10;

const HoTroNhanhComponent: React.FC = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const [list, setList] = useState<DataType[]>([]);
    const [page, setPage] = useState(1);

    const fetchData = (currentPage: number) => {
        const fakeDataUrl = `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users?page=${currentPage}&limit=${PAGE_SIZE}`;
        return fetch(fakeDataUrl).then((res) => res.json());
    };

    useEffect(() => {
        fetchData(page).then((res) => {
            const results = Array.isArray(res) ? res : [];
            setInitLoading(false);
            setData(results);
            setList(results);
        });
    }, []);

    const onLoadMore = () => {
        setLoading(true);
        setList(data.concat(Array.from({ length: PAGE_SIZE }).map(() => ({ loading: true }))));
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData(nextPage).then((res) => {
            const results = Array.isArray(res) ? res : [];
            const newData = data.concat(results);
            setData(newData);
            setList(newData);
            setLoading(false);
            window.dispatchEvent(new Event('resize'));
        });
    };

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button style={{ marginTop: '25px' }} onClick={onLoadMore}>Load more</Button>
            </div>
        ) : null;

    return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">Edit</a>, <a key="list-loadmore-more">More</a>]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<Link href="/">{item.name}</Link>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

export default HoTroNhanhComponent;