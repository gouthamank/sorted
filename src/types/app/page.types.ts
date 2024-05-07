import { ANIMATION_STEP_TYPES } from '@/utils/enums';

export type GraphListItem = {
    value: number;
    isHighlighted: boolean;
    isSecondaryHighlighted: boolean;
};

export type AnimationStep =
    | {
          type: ANIMATION_STEP_TYPES.HIGHLIGHT | ANIMATION_STEP_TYPES.HIGHLIGHT_SECONDARY;
          index: number;
      }
    | {
          type: ANIMATION_STEP_TYPES.MOVE;
          fromIndex: number;
          toIndex: number;
      }
    | {
          type: ANIMATION_STEP_TYPES.END_CYCLE;
      }
    | {
          type: ANIMATION_STEP_TYPES.START_SORT;
      }
    | {
          type: ANIMATION_STEP_TYPES.END_SORT;
      };

export type AnimationProps = {
    steps: AnimationStep[];
};

export type QuickSortAnimationProps = AnimationProps & {
    startWindow?: number;
};

export type MergeSortAnimationProps = AnimationProps & {
    startWindow?: number;
};

export type HeapSortAnimationProps = AnimationProps;

export type BubbleSortAnimationProps = AnimationProps;

export type SelectionSortAnimationProps = AnimationProps;
