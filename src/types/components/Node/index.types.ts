import { GraphListItem } from '@/types/app/page.types';
import { ANIMATION_STATES } from '@/utils/enums';

export type NodeProps = {
    nodeIndex: number;
    windowHeight: number;
    state: GraphListItem;
    animationState: ANIMATION_STATES;
};
