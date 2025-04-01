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