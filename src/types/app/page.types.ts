import { ANIMATION_TYPES } from '@/app/page';

export type GraphListItem = {
    value: number;
    isHighlighted: boolean;
    isSecondaryHighlighted: boolean;
};

export type AnimationStep =
    | {
          type: ANIMATION_TYPES.HIGHLIGHT | ANIMATION_TYPES.HIGHLIGHT_SECONDARY;
          index: number;
      }
    | {
          type: ANIMATION_TYPES.MOVE;
          fromIndex: number;
          toIndex: number;
      }
    | {
          type: ANIMATION_TYPES.END_CYCLE;
      }
    | {
          type: ANIMATION_TYPES.START_SORT;
      }
    | {
          type: ANIMATION_TYPES.END_SORT;
      };

export type AnimationProps = {
    steps: AnimationStep[];
    startWindow?: number;
};
