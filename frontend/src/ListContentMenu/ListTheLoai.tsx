import Link from "next/link";
import "@/ListContentMenu/ListTheLoai.scss";

interface ContentTheLoai {
    id: number;
    title: string;
    link: string;
}

const ListTheLoai: React.FC = () => {

    const ContentTheLoai: ContentTheLoai[] = [
        {
            id: 1,
            title: 'Tiên Hiệp',
            link: '/TienHiep'
        },
        {
            id: 2,
            title: 'Đô Thị',
            link: '/DoThi'
        },
        {
            id: 3,
            title: 'Khoa Huyễn',
            link: '/KhoaHuyen'
        },
        {
            id: 4,
            title: 'Dị Năng',
            link: '/DiNang'
        },
        {
            id: 5,
            title: 'Xuyên Không',
            link: '/XuyenKhong'
        },
        {
            id: 6,
            title: 'Thám Hiểm',
            link: '/ThamHiem'
        },
        {
            id: 7,
            title: 'Ngược',
            link: '/Nguoc'
        },
        {
            id: 8,
            title: 'Nữ Cường',
            link: '/NuCuong'
        },
        {
            id: 9,
            title: 'Đam Mỹ',
            link: '/DamMy'
        },
        {
            id: 10,
            title: 'Điền Văn',
            link: '/DienVan'
        },
        {
            id: 11,
            title: 'Truyện Teen',
            link: '/TruyenTeen'
        },
        {
            id: 12,
            title: 'Light Novel',
            link: '/LightNovel'
        },
        {
            id: 13,
            title: 'Khác',
            link: '/Khac'
        },
    ];

    const ContentTheLoai1: ContentTheLoai[] = [
        {
            id: 1,
            title: 'Tiên Hiệp',
            link: '/TienHiep'
        },
        {
            id: 2,
            title: 'Đô Thị',
            link: '/DoThi'
        },
        {
            id: 3,
            title: 'Khoa Huyễn',
            link: '/KhoaHuyen'
        },
        {
            id: 4,
            title: 'Dị Năng',
            link: '/DiNang'
        },
        {
            id: 5,
            title: 'Xuyên Không',
            link: '/XuyenKhong'
        },
        {
            id: 6,
            title: 'Thám Hiểm',
            link: '/ThamHiem'
        },
        {
            id: 7,
            title: 'Ngược',
            link: '/Nguoc'
        },
        {
            id: 8,
            title: 'Nữ Cường',
            link: '/NuCuong'
        },
        {
            id: 9,
            title: 'Đam Mỹ',
            link: '/DamMy'
        },
        {
            id: 10,
            title: 'Điền Văn',
            link: '/DienVan'
        },
        {
            id: 11,
            title: 'Truyện Teen',
            link: '/TruyenTeen'
        },
        {
            id: 12,
            title: 'Light Novel',
            link: '/LightNovel'
        },
    ];

    const ContentTheLoai2: ContentTheLoai[] = [
        {
            id: 1,
            title: 'Tiên Hiệp',
            link: '/TienHiep'
        },
        {
            id: 2,
            title: 'Đô Thị',
            link: '/DoThi'
        },
        {
            id: 3,
            title: 'Khoa Huyễn',
            link: '/KhoaHuyen'
        },
        {
            id: 4,
            title: 'Dị Năng',
            link: '/DiNang'
        },
        {
            id: 5,
            title: 'Xuyên Không',
            link: '/XuyenKhong'
        },
        {
            id: 6,
            title: 'Thám Hiểm',
            link: '/ThamHiem'
        },
        {
            id: 7,
            title: 'Ngược',
            link: '/Nguoc'
        },
        {
            id: 8,
            title: 'Nữ Cường',
            link: '/NuCuong'
        },
        {
            id: 9,
            title: 'Đam Mỹ',
            link: '/DamMy'
        },
        {
            id: 10,
            title: 'Điền Văn',
            link: '/DienVan'
        },
        {
            id: 11,
            title: 'Truyện Teen',
            link: '/TruyenTeen'
        },
        {
            id: 12,
            title: 'Light Novel',
            link: '/LightNovel'
        },
    ];

    const RenderListTheLoai = (contentList: ContentTheLoai[]) => (
        <div>
            {contentList.map((item) => (
                <div className="ContentTheLoai" key={item.id}>
                    <Link className="ContentTheLoaiLink" href={item.link}>
                        <div className="InLink">{item.title}</div>
                    </Link>
                </div>
            ))}
        </div>
    );

    return (
        <div id="ListTheLoai">
            <div>{RenderListTheLoai(ContentTheLoai)}</div>
            <div>{RenderListTheLoai(ContentTheLoai1)}</div>
            <div>{RenderListTheLoai(ContentTheLoai2)}</div>
        </div>
    );
};

export default ListTheLoai;
