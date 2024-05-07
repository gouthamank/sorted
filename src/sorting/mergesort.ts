import { MergeSortAnimationProps } from '@/types/app/page.types';

import { ANIMATION_STEP_TYPES } from '@/utils/enums';

function merge(left: number[], right: number[], animationProps: MergeSortAnimationProps) {
    const { steps, startWindow = 0 } = animationProps;
    let arr: number[] = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(<number>left.shift());
            steps.push({
                type: ANIMATION_STEP_TYPES.HIGHLIGHT_SECONDARY,
                index: startWindow + arr.length - 1,
            });
            steps.push({
                type: ANIMATION_STEP_TYPES.HIGHLIGHT_SECONDARY,
                index: startWindow + arr.length - 1,
            });
            steps.push({
                type: ANIMATION_STEP_TYPES.MOVE,
                fromIndex: startWindow + arr.length - 1,
                toIndex: startWindow + arr.length - 1,
            });
        } else {
            arr.push(<number>right.shift());
            steps.push({
                type: ANIMATION_STEP_TYPES.HIGHLIGHT_SECONDARY,
                index: startWindow + arr.length + left.length - 1,
            });
            steps.push({
                type: ANIMATION_STEP_TYPES.HIGHLIGHT_SECONDARY,
                index: startWindow + arr.length - 1,
            });
            steps.push({
                type: ANIMATION_STEP_TYPES.MOVE,
                fromIndex: startWindow + arr.length + left.length - 1,
                toIndex: startWindow + arr.length - 1,
            });
        }
    }

    return [...arr, ...left, ...right];
}

export default function mergeSort(list: number[], animationProps: MergeSortAnimationProps): number[] {
    const { steps, startWindow = 0 } = animationProps;

    const half = Math.floor(list.length / 2);
    if (list.length < 2) {
        steps.push({
            type: ANIMATION_STEP_TYPES.HIGHLIGHT_SECONDARY,
            index: startWindow,
        });
        return list;
    }

    steps.push({
        type: ANIMATION_STEP_TYPES.HIGHLIGHT,
        index: startWindow + half,
    });

    const left = list.splice(0, half);
    return merge(
        mergeSort(left, {
            steps,
            startWindow,
        }),
        mergeSort(list, {
            steps,
            startWindow: startWindow + half,
        }),
        {
            steps,
            startWindow,
        },
    );
}
