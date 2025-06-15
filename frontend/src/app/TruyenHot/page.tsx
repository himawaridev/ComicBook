'use client';
import { EffectLoading, RenderListTruyen, RenderTypeTruyen, useLoading } from '@/app/components';

// Import scss and any:
import "@/Views/page.scss";

const TruyenHot: React.FC = () => {
    const isLoading = useLoading();

    if (isLoading) {
        return (
            <EffectLoading size='large' />
        )
    }

    return (
        <main id="Truyen" className='TruyenHot'>
            <RenderListTruyen
                title="TRUYỆN HOT"
                apiEndpoint="http://localhost:8000/getTruyenHotController"
            />
            <RenderTypeTruyen />
        </main>
    )
}
export default TruyenHot;