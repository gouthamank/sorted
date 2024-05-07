import { QuickSortAnimationProps } from '@/types/app/page.types';

import { ANIMATION_STEP_TYPES } from '@/utils/enums';

export default function quickSort(list: number[], animationProps: QuickSortAnimationProps): number[] {
    if (list.length <= 1) {
        return list;
    }
    const { steps, startWindow = 0 } = animationProps;

    let pivot = list[0];
    steps.push({
        type: ANIMATION_STEP_TYPES.HIGHLIGHT,
        index: startWindow,
    });
    let leftArr = [];
    let rightArr = [];

    for (let i = 1; i < list.length; i++) {
        if (list[i] < pivot) {
            leftArr.push(list[i]);
            steps.push({
                type: ANIMATION_STEP_TYPES.HIGHLIGHT_SECONDARY,
                index: startWindow + i,
            });
            steps.push({
                type: ANIMATION_STEP_TYPES.MOVE,
                fromIndex: startWindow + i,
                toIndex: startWindow + leftArr.length - 1,
            });
        } else {
            rightArr.push(list[i]);
            steps.push({
                type: ANIMATION_STEP_TYPES.HIGHLIGHT_SECONDARY,
                index: startWindow + i,
            });
            steps.push({
                type: ANIMATION_STEP_TYPES.MOVE,
                fromIndex: startWindow + i,
                toIndex: startWindow + leftArr.length + rightArr.length,
            });
        }
    }

    steps.push({
        type: ANIMATION_STEP_TYPES.END_CYCLE,
    });

    return [
        ...quickSort(leftArr, { steps, startWindow }),
        pivot,
        ...quickSort(rightArr, {
            steps,
            startWindow: startWindow + leftArr.length + 1,
        }),
    ];
}
