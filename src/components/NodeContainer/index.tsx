'use client';

import { useEffect, useState } from 'react';
import Node from '@/components/Node';
import { MAX_NODE_VALUE } from '@/utils/constants';

import type { NodeContainerProps } from '@/types/components/NodeContainer/index.types';

export default function NodeContainer(props: NodeContainerProps) {
    const [windowHeight, setWindowHeight] = useState(0);

    const onResize = () => {
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div
            className='flex w-full flex-row items-end justify-center gap-1 px-2 py-0'
            style={{
                height: `${MAX_NODE_VALUE * windowHeight * 0.00008}rem`,
            }}
        >
            {props.list.map((node, idx: number) => {
                return (
                    <Node
                        key={idx}
                        nodeIndex={idx}
                        state={node}
                        windowHeight={windowHeight}
                        animationState={props.currentState}
                    />
                );
            })}
        </div>
    );
}
