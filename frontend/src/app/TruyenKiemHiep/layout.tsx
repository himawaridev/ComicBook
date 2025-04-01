import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TruyenKiemHiep",
    description: "TruyenKiemHiep",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    );
}
