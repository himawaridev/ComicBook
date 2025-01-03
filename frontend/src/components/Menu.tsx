'use client';
import { ReactNode, useState } from "react";
import { UnorderedListOutlined, CaretDownOutlined, SettingOutlined } from "@ant-design/icons";

// Import components:
import Search from "@/ListContentMenu/Search";
import ListDanhMuc from "@/ListContentMenu/ListDanhMuc";
import ListTheLoai from "@/ListContentMenu/ListTheLoai";
import Setting from "@/ListContentMenu/Setting"

// Import scss:
import "@/components/Menu.scss";

interface ListMenu {
    id: number;
    name: string;
    title: ReactNode; // Component tương ứng cho từng mục
    component: ReactNode; // Component tương ứng cho từng mục
}

const Menu: React.FC = () => {
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null); // Quản lý trạng thái menu được chọn

    const toggleMenu = (id: number) => {
        setActiveMenuId(activeMenuId === id ? null : id); // Đóng nếu đã mở, mở nếu đang đóng
    };

    const listMenu: ListMenu[] = [
        {
            id: 1,
            name: "Logo",
            title: (
                <div className="Logo">
                    <div className="LogoColor Logo1">C</div>
                    <div className="LogoColor Logo2">O</div>
                    <div className="LogoColor Logo3">M</div>
                    <div className="LogoColor Logo4">I</div>
                    <div className="LogoColor Logo5">C</div>
                    <div className="LogoColor Logo6">.VN</div>
                </div>
            ),
            component: null, // Không có nội dung hiển thị
        },
        {
            id: 2,
            name: "DanhSach",
            title: (
                <div className="ContentMenu">
                    <UnorderedListOutlined />
                    <div className="TextContentMenu">Danh sách</div>
                    <CaretDownOutlined />
                </div>
            ),
            component: <ListDanhMuc />,
        },
        {
            id: 3,
            name: "TheLoai",
            title: (
                <div className="ContentMenu">
                    <UnorderedListOutlined />
                    <div className="TextContentMenu">Thể loại</div>
                    <CaretDownOutlined />
                </div>
            ),
            component: <ListTheLoai />,
        },
        {
            id: 4,
            name: "TuyChinh",
            title: (
                <div className="ContentMenu">
                    <SettingOutlined />
                    <div className="TextContentMenu">Tuỳ chỉnh</div>
                    <CaretDownOutlined />
                </div>
            ),
            component: <Setting />,
        },
    ];

    const RenderListMenu: React.FC = () => {
        return (
            <div className="MenuList">
                {listMenu.map((item) => (
                    <div key={item.id} className="MenuItem">
                        <div
                            className="MenuTitle"
                            onClick={() => toggleMenu(item.id)}
                        >
                            {item.title}
                        </div>
                        <div style={{ position: 'absolute' }}>
                            {/* Hiện nội dung nếu menu được chọn */}
                            {activeMenuId === item.id && item.component && (
                                <div className="MenuContent">{item.component}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div id="Menu">
            <RenderListMenu />
            <Search />
        </div>
    );
};

export default Menu;
