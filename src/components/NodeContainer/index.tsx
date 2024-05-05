import { useEffect, useState } from 'react';
import Node from '@/components/Node';
import type { NodeContainerProps } from '@/types/components/NodeContainer/index.types';

export default function NodeContainer(props: NodeContainerProps) {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const onResize = () => {
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
                width: '100%',
                padding: '0 2rem',
                gap: '.5rem',
            }}
        >
            {props.list.map((node, idx: number) => {
                return <Node key={idx} state={node} windowHeight={windowHeight} />;
            })}
        </div>
    );
}
