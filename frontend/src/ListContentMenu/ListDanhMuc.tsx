import Link from "next/link";

// Import scss and any:
import "@/ListContentMenu/ListDanhMuc.scss";

interface ContentDanhMuc {
    id: number,
    title: string,
    link: string,
}

interface ListDanhMucProps {
    onClose: () => void;
}

const ListDanhMuc: React.FC<ListDanhMucProps> = ({ onClose }) => {

    const ContentDanhMuc: ContentDanhMuc[] = [
        {
            id: 1,
            title: 'Truyện mới cập nhật',
            link: '/TruyenMoiCapNhat'
        },
        {
            id: 2,
            title: 'Truyện Hot',
            link: '/TruyenHot'
        },
        {
            id: 3,
            title: 'Truyện Full',
            link: '/TruyenFull'
        },
        {
            id: 4,
            title: 'Tiên Hiệp Hay',
            link: '/TienHiepHay'
        },
        {
            id: 5,
            title: 'Kiếm Hiệp Hay',
            link: '/KiemHiepHay'
        },
        {
            id: 6,
            title: 'Truyện Teen Hay',
            link: '/TruyenTeenHay'
        },
        {
            id: 7,
            title: 'Ngôn Tình Hay',
            link: '/NgonTinhHay'
        },
        {
            id: 8,
            title: 'Ngôn Tình Sắc',
            link: '/NgonTinhSac'
        },
        {
            id: 9,
            title: 'Ngôn Tình Ngược',
            link: '/NgongTinhNguoc'
        },
        {
            id: 10,
            title: 'Ngôn Tình Sủng',
            link: '/NgonTinhSung'
        },
        {
            id: 11,
            title: 'Ngôn Tình Tổng Tài',
            link: '/NgonTinhTongTai'
        },
        {
            id: 12,
            title: 'Ngôn Tình Xuyên Không',
            link: '/NgonTinhXuyenKhong'
        },
        {
            id: 13,
            title: 'Ngôn Tình Cổ Đại',
            link: '/NgonTinhCoDai'
        },
        {
            id: 14,
            title: 'Ngôn Tình Trọng Sinh',
            link: '/NgonTinhTrongSinh'
        },
        {
            id: 15,
            title: 'Ngôn Tình Phụ Nữ',
            link: '/NgonTinhPhuNu'
        },
        {
            id: 16,
            title: 'Đam Mỹ Hài',
            link: '/DamMyHai'
        },
        {
            id: 17,
            title: 'Đam Mỹ Hay',
            link: '/DamMyHay'
        },
        {
            id: 18,
            title: 'Đam Mỹ H Văn',
            link: '/DamMyHVan'
        },
        {
            id: 19,
            title: 'Đam Mỹ Sắc',
            link: '/DamMySac'
        },
        {
            id: 20,
            title: 'Đam Mỹ Trọng Sinh',
            link: '/DamMyTrongSinh'
        },
        {
            id: 21,
            title: 'Đam Mỹ Cổ Đại',
            link: '/DamMyCoDai'
        },
        {
            id: 22,
            title: 'Đam Mỹ Hiện Đại',
            link: '/DamMyHienDai'
        },
    ];

    const RenderContentDanhMuc: React.FC = () => {
        return (
            ContentDanhMuc.map((item) => {
                return (
                    <div className="ContentDanhMuc" key={item.id}>
                        <Link className="ContentDanhMucLink" href={item.link}>
                            <div className="InLink">{item.title}</div>
                        </Link>
                    </div>
                )
            })
        )
    }

    return (
        <div id="ListDanhMuc" onClick={onClose}><RenderContentDanhMuc /></div>
    );
};
export default ListDanhMuc;