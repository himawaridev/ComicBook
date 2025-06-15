'use client';
import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

import Search from "@/Navigation/Components/Search";
import ListDanhMuc from "@/Navigation/Components/ListDanhMuc";
import ListTheLoai from "@/Navigation/Components/ListTheLoai";
import Setting from "@/Navigation/Components/Setting";

import "@/Views/Navigation.scss";
import ComicLogo from "@/Images/ComicLogo.png";

interface ListNavigation {
    id: number;
    name: string;
    title: ReactNode;
    component: ReactNode;
}

const Navigation: React.FC = () => {
    const [activeNavigationId, setActiveNavigationId] = useState<number | null>(null);
    const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<{ [key: string]: boolean }>({
        DanhSach: false,
        TheLoai: false,
        Setting: false,
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileNavigationOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleNavigation = (id: number | null) => {
        setActiveNavigationId(activeNavigationId === id ? null : id);
    };

    const closeNavigation = () => {
        setActiveNavigationId(null);
    };

    const toggleMobileNavigation = () => {
        setIsMobileNavigationOpen(!isMobileNavigationOpen);
    };

    const toggleMobileDropdown = (key: string) => {
        setMobileDropdownOpen(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const listNavigation: ListNavigation[] = [
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
                        alt="Logo Chihiro comic"
                    />
                </Link>
            ),
            component: null,
        },
        {
            id: 2,
            name: "DanhSach",
            title: (
                <div className="ContentNavigation">
                    <div className="TextContentNavigation">Danh sách</div>
                </div>
            ),
            component: <ListDanhMuc onClose={closeNavigation} />,
        },
        {
            id: 3,
            name: "TheLoai",
            title: (
                <div className="ContentNavigation">
                    <div className="TextContentNavigation">Thể loại</div>
                </div>
            ),
            component: <ListTheLoai onClose={closeNavigation} />,
        },
        {
            id: 4,
            name: "Support",
            title: (
                <div className="ContentNavigation">
                    <Link href="/HoTroNhanh" className="TextContentNavigation">Hỗ trợ</Link>
                </div>
            ),
            // component: <Setting onClose={closeNavigation} />,
            component: null,
        },
        {
            id: 5,
            name: "Docs",
            title: (
                <div className="ContentNavigation">
                    <Link href="/" className="TextContentNavigation">Docs</Link>
                </div>
            ),
            component: <>docs</>,
        },
        {
            id: 6,
            name: "API",
            title: (
                <div className="ContentNavigation">
                    <Link href="/" className="TextContentNavigation">API</Link>
                </div>
            ),
            component: <>API</>,
        },
    ];

    const RenderListNavigation = () => (
        <div className="NavigationList">
            {listNavigation.slice(1).map((item) => (
                <div key={item.id} className="NavigationItem">
                    <div className="NavigationTitle" onClick={() => toggleNavigation(item.id)}>
                        {item.title}
                    </div>
                    {activeNavigationId === item.id && item.component && (
                        <div className="NavigationContent" onClick={closeNavigation} style={{ position: 'absolute', zIndex: '100' }}>
                            {item.component}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const RenderListNavigationLogo = () => (
        <div className="NavigationList">
            {listNavigation.slice(0, 1).map((item) => (
                <div key={item.id} className="NavigationItem">
                    <div className="NavigationTitle" onClick={() => toggleNavigation(item.id)}>
                        {item.title}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <div id="Navigation">
                <div className="LogoResponsive"><RenderListNavigationLogo /></div>
                <div className="ComponentBlock">
                    <RenderListNavigationLogo />
                    <RenderListNavigation />
                </div>
                <div className="SearchComponent">
                    <Search />
                    <div className="MobileNavigationButton" onClick={toggleMobileNavigation}>☰</div>
                </div>
            </div>

            {isMobileNavigationOpen && (
                <div className="MobileNavigation">
                    <div className="MobileDropdown">
                        <div className="DropdownHeader" onClick={() => toggleMobileDropdown("DanhSach")}>
                            Danh sách
                        </div>
                        {mobileDropdownOpen.DanhSach && (
                            <div className="DropdownContent">
                                <ListDanhMuc onClose={() => { }} />
                            </div>
                        )}
                    </div>
                    <div className="MobileDropdown">
                        <div className="DropdownHeader" onClick={() => toggleMobileDropdown("TheLoai")}>
                            Thể loại
                        </div>
                        {mobileDropdownOpen.TheLoai && (
                            <div className="DropdownContent">
                                <ListTheLoai onClose={() => { }} />
                            </div>
                        )}
                    </div>
                    <div className="MobileDropdown">
                        <div className="DropdownHeader" onClick={() => toggleMobileDropdown("Support")}>
                            Support
                        </div>
                        {mobileDropdownOpen.Setting && (
                            <div className="DropdownContent">
                                <Setting onClose={() => { }} />
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="Text">Website truyện hoàn online hay nhất Việt Nam.</div>
        </>
    );
};

export default Navigation;
