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
                    'bg-blue-200': hasNoHighlight && !props.state.isHighlighted,
                },
                {
                    'bg-blue-500': !hasNoHighlight && props.state.isHighlighted,
                },
                {
                    'bg-green-400': !hasNoHighlight && props.state.isSecondaryHighlighted,
                },
            ])}
            style={{
                height: `${props.state.value * windowHeight * 0.00008}rem`,
            }}
        />
    );
}
