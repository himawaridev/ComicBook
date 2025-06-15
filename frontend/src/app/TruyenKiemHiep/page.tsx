'use client';
import { EffectLoading, RenderListTruyen, RenderTypeTruyen, useLoading } from '@/app/components';

// Import scss and any:
import "@/Views/page.scss";

const TruyenKiemHiep: React.FC = () => {
    const isLoading = useLoading();

    if (isLoading) {
        return (
            <EffectLoading size='large' />
        )
    }

    return (
        <main id="Truyen" className='TruyenKiemHiep'>
            <RenderListTruyen
                title="TRUYỆN KIẾM HIỆP HOÀN"
                apiEndpoint="http://localhost:8000/getTruyenKiemHiepController"
            />
            <RenderTypeTruyen />
        </main>
    )
}
export default TruyenKiemHiep;