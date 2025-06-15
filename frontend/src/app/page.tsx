'use client'
import TruyenHoanHotBanner from '@/components/TruyenHoanHotBanner';
import SearchBar from '@/components/SearchBar/SearchBar';
import { EffectLoading, useLoading } from '@/app/components';

// Import scss and any:
import "@/app/page.scss";

const HomePage = () => {
    const isLoading = useLoading();

    if (isLoading) {
        return (
            <EffectLoading size='large' />
        )
    }

    return (
        <main id="HomePage">
            <TruyenHoanHotBanner />
            <SearchBar />
        </main>
    );
};

export default HomePage;