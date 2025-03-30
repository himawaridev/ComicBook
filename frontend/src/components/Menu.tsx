'use client';
import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Import components:
import Search from "@/ListContentMenu/Search";
import ListDanhMuc from "@/ListContentMenu/ListDanhMuc";
import ListTheLoai from "@/ListContentMenu/ListTheLoai";
import Setting from "@/ListContentMenu/Setting";

// Import scss:
import "@/components/Menu.scss";
import ComicLogo from "@/Images/ComicLogo.png";

interface ListMenu {
    id: number;
    name: string;
    title: ReactNode; // Tiêu đề của menu
    component: ReactNode; // Component tương ứng với menu
}

const Menu: React.FC = () => {
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null); // Menu đang mở

    const toggleMenu = (id: number | null) => {
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    const closeMenu = () => {
        setActiveMenuId(null);
    };

    const listMenu: ListMenu[] = [
        {
            id: 1,
            name: "Logo",
            title: (
                <Link href="/">
                    <Image
                        src={ComicLogo}
                        className="Logo"
                        width={500}
                        height={147}
                        alt="Logo of the author"
                    />
                </Link>
            ),
            component: null,
        },
        {
            id: 2,
            name: "DanhSach",
            title: (
                <div className="ContentMenu">
                    <div className="TextContentMenu">Danh sách</div>
                </div>
            ),
            component: <ListDanhMuc onClose={closeMenu} />, // Truyền hàm đóng modal vào component con
        },
        {
            id: 3,
            name: "TheLoai",
            title: (
                <div className="ContentMenu">
                    <div className="TextContentMenu">Thể loại</div>
                </div>
            ),
            component: <ListTheLoai onClose={closeMenu} />,
        },
        {
            id: 4,
            name: "Setting",
            title: (
                <div className="ContentMenu">
                    <div className="TextContentMenu">Setting</div>
                </div>
            ),
            component: <Setting onClose={closeMenu} />,
        },
        {
            id: 5,
            name: "Docs",
            title: (
                <div className="ContentMenu">
                    <Link href="/" className="TextContentMenu">Docs</Link>
                </div>
            ),
            component: <></>,
        },
        {
            id: 6,
            name: "API",
            title: (
                <div className="ContentMenu">
                    <Link href="/" className="TextContentMenu">API</Link>
                </div>
            ),
            component: <></>,
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
                        {/* Nội dung dropdown */}
                        {activeMenuId === item.id && item.component && (
                            <div
                                className="MenuContent"
                                onClick={closeMenu} // Khi click vào nội dung, đóng menu
                                style={{ position: 'absolute' }}
                            >
                                {item.component}
                            </div>
                        )}
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
