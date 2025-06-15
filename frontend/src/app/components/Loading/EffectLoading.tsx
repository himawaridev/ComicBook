import { FC } from '@/lib/Export_lib';
import { Flex, Spin } from '@/lib/Export_lib';

interface EffectLoadingProps {
    height?: string;
    size?: 'small' | 'default' | 'large';
}

const EffectLoading: FC<EffectLoadingProps> = ({
    height = '100vh',
    size = 'default'
}) => {
    return (
        <Flex justify="center" align="center" style={{ height, cursor: 'pointer' }}>
            <Spin size={size} />
        </Flex>
    );
};

export default EffectLoading; 
