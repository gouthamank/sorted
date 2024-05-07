import classNames from 'classnames';

import type { NodeProps } from '@/types/components/Node/index.types';
import { ANIMATION_STATES } from '@/utils/enums';

export default function Node(props: NodeProps) {
    const windowHeight = props.windowHeight;
    const hasNoHighlight = !props.state.isHighlighted && !props.state.isSecondaryHighlighted;
    let transitionCSS = '';

    switch (props.animationState) {
        case ANIMATION_STATES.IDLE:
            transitionCSS = `height 300ms ${props.nodeIndex * 10}ms`;
            break;
        case ANIMATION_STATES.RUNNING:
            transitionCSS = ``;
            break;
        case ANIMATION_STATES.COMPLETED:
            transitionCSS = `opacity 300ms ${props.nodeIndex * 20}ms, background-color 300ms ${props.nodeIndex * 20}ms`;
            break;
    }

    return (
        <div
            className={classNames([
                'w-2',
                {
                    'bg-steel-blue-400 opacity-70 dark:bg-steel-blue-800':
                        props.animationState !== ANIMATION_STATES.COMPLETED && hasNoHighlight,
                },
                {
                    'bg-steel-blue-600 opacity-100 dark:bg-steel-blue-600':
                        !hasNoHighlight && props.state.isHighlighted,
                },
                {
                    'bg-amber-400 opacity-100 dark:bg-amber-600': !hasNoHighlight && props.state.isSecondaryHighlighted,
                },
                {
                    'bg-green-700 opacity-100 dark:bg-green-600': props.animationState === ANIMATION_STATES.COMPLETED,
                },
            ])}
            style={{
                height: `${props.state.value * windowHeight * 0.00008}rem`,
                transition: transitionCSS,
            }}
        />
    );
}
