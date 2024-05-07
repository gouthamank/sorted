import { GraphListItem } from '@/types/app/page.types';
import { ANIMATION_STATES } from '@/utils/enums';

export type NodeContainerProps = {
    list: GraphListItem[];
    currentState: ANIMATION_STATES;
};
