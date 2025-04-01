import Link from "next/link";
// Import scss
import "@/Types/TypeTruyen.scss";

interface TypeTruyenInterface {
    id: number;
    title: string;
    link: string;
}

// Danh sách thể loại từ hình ảnh bạn cung cấp
const theLoaiTruyen: TypeTruyenInterface[] = [
    { id: 1, title: "Truyện Tiên Hiệp", link: "/TruyenTienHiep" },
    { id: 2, title: "Truyện Ngôn Tình", link: "/TruyenNgonTinh" },
    { id: 3, title: "Truyện Xuyên", link: "/TruyenXuyen" },
    { id: 4, title: "Truyện Thám Hiểm", link: "/TruyenThamHiem" },
    { id: 5, title: "Truyện Ngược", link: "/TruyenNguoc" },
    { id: 6, title: "Truyện Cung Đấu", link: "/TruyenCungDau" },
    { id: 7, title: "Truyện Đông", link: "/TruyenDong" },
    { id: 8, title: "Truyện Bách Hợp", link: "/TruyenBachHop" },
    { id: 9, title: "Truyện Cổ Đại", link: "/TruyenCoDai" },
    { id: 10, title: "Truyện Tiểu Thuyết", link: "/TruyenTieuThuyet" },
    { id: 11, title: "Truyện Võng Du", link: "/TruyenVongDu" },
    { id: 12, title: "Truyện Dị Năng", link: "/TruyenDiNang" },
    { id: 13, title: "Truyện Trọng Sinh", link: "/TruyenTrongSinh" },
    { id: 14, title: "Truyện Dị Giới", link: "/TruyenDiGioi" },
    { id: 15, title: "Truyện Điền Văn", link: "/TruyenDienVan" },
    { id: 16, title: "Truyện Quân Sự", link: "/TruyenQuanSu" },
    { id: 17, title: "Truyện Teen", link: "/TruyenTeen" },
    { id: 18, title: "Truyện Đoản Văn", link: "/TruyenDoanVan" },
    { id: 19, title: "Truyện Dã Sử", link: "/TruyenDaSu" },
    { id: 20, title: "Truyện Hệ Thống", link: "/TruyenHeThong" },
    { id: 21, title: "Truyện Hiện Đại", link: "/TruyenHienDai" },
    { id: 22, title: "Truyện Kiếm", link: "/TruyenKiemHiep" },
    { id: 23, title: "Truyện Quan", link: "/TruyenQuan" },
    { id: 24, title: "Truyện Trinh", link: "/TruyenTrinh" },
    { id: 25, title: "Truyện Linh Dị", link: "/TruyenLinhDi" },
    { id: 26, title: "Truyện Sủng", link: "/TruyenSung" },
    { id: 27, title: "Truyện Nữ", link: "/TruyenNu" },
    { id: 28, title: "Truyện Đam Mỹ", link: "/TruyenDamMy" },
    { id: 29, title: "Truyện Hài Hước", link: "/TruyenHaiHuoc" },
    { id: 30, title: "Truyện Mạt Thế", link: "/TruyenMatThe" },
    { id: 31, title: "Truyện Khác", link: "/TruyenKhac" },
    { id: 32, title: "Truyện Khoa", link: "/TruyenKhoa" },
    { id: 33, title: "Truyện Huyền", link: "/TruyenHuyen" },
    { id: 34, title: "Truyện Đô Thị", link: "/TruyenDoThi" },
    { id: 35, title: "Truyện Gia Đấu", link: "/TruyenGiaDau" },
    { id: 36, title: "Truyện Nữ Phụ", link: "/TruyenNuPhu" },
    { id: 37, title: "Truyện Lịch Sử", link: "/TruyenLichSu" },
    { id: 38, title: "Truyện Light", link: "/TruyenLight" },
    { id: 39, title: "Truyện Việt Nam", link: "/TruyenVietNam" },
    { id: 40, title: "Truyện Phương", link: "/TruyenPhuong" },
    { id: 41, title: "Truyện Xuyên", link: "/TruyenXuyen" },
    { id: 42, title: "Truyện Tổng tài", link: "/TruyenTongTai" },
];

// Chia danh sách thành 2 cột
const midIndex = Math.ceil(theLoaiTruyen.length / 2);
const TypeTruyenLeft = theLoaiTruyen.slice(0, midIndex);
const TypeTruyenRight = theLoaiTruyen.slice(midIndex);

const RenderTypeTruyen = (contentList: TypeTruyenInterface[]) => (
    <div>
        {contentList.map((item) => (
            <div className="TypeTruyen" key={item.id}>
                <Link className="TypeTruyenLink" href={item.link}>
                    <div className="InLink">{item.title}</div>
                </Link>
            </div>
        ))}
    </div>
);

const TypeTruyen = () => {
    return (
        <div id="TypeTruyen">
            <div className="TitleTypeTruyen">Thể loại truyện</div>
            <div className="TypeTruyenContent">
                <div>{RenderTypeTruyen(TypeTruyenLeft)}</div>
                <div>{RenderTypeTruyen(TypeTruyenRight)}</div>
            </div>
        </div>
    );
};

export default TypeTruyen;
