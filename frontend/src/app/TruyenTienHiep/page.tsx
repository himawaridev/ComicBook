'use client';
import { EffectLoading, RenderListTruyen, RenderTypeTruyen, useLoading } from '@/app/components';

// Import scss and any:
import "@/Views/page.scss";

const TruyenTienHiep: React.FC = () => {
    const isLoading = useLoading();

    if (isLoading) {
        return (
            <EffectLoading size='large' />
        )
    }

    return (
        <main id="Truyen" className='TruyenTienHiep'>
            <RenderListTruyen
                title="TRUYỆN TIÊN HIỆP HOÀN"
                apiEndpoint="http://localhost:8000/getTruyenTienHiepController"
            />
            <RenderTypeTruyen />
        </main>
    )
}
export default TruyenTienHiep;