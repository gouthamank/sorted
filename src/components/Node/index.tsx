import type { NodeProps } from '@/types/components/Node/index.types';

export default function Node(props: NodeProps) {
    const windowHeight = props.windowHeight;

    return (
        <div
            style={{
                background: props.state.isHighlighted ? 'blue' : 'grey',
                height: `${props.state.value * windowHeight * 0.0001}rem`,
                width: '1rem',
            }}
        />
    );
}
