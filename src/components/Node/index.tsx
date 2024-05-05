import classNames from 'classnames';

import type { NodeProps } from '@/types/components/Node/index.types';

export default function Node(props: NodeProps) {
    const windowHeight = props.windowHeight;
    const hasNoHighlight = !props.state.isHighlighted && !props.state.isSecondaryHighlighted;
    return (
        <div
            className={classNames([
                'w-2',
                {
                    'bg-blue-300': hasNoHighlight,
                    'opacity-80': hasNoHighlight,
                },
                {
                    'bg-blue-600': !hasNoHighlight && props.state.isHighlighted,
                },
                {
                    'bg-green-600': !hasNoHighlight && props.state.isSecondaryHighlighted,
                },
            ])}
            style={{
                height: `${props.state.value * windowHeight * 0.00008}rem`,
            }}
        />
    );
}
