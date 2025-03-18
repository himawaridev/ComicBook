import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Daddy Juice",
    description: "Daddy Juice",
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
