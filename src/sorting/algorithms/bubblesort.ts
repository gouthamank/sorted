import { BubbleSortAnimationProps } from '@/types/app/page.types';
import { ANIMATION_STEP_TYPES } from '@/utils/enums';

export default function bubbleSort(list: number[], animationProps: BubbleSortAnimationProps) {
    const { steps } = animationProps;

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - i - 1; j++) {
            steps.push({
                type: ANIMATION_STEP_TYPES.HIGHLIGHT,
                index: j,
            });
            steps.push({
                type: ANIMATION_STEP_TYPES.HIGHLIGHT_SECONDARY,
                index: j + 1,
            });
            if (list[j] > list[j + 1]) {
                steps.push({
                    type: ANIMATION_STEP_TYPES.MOVE,
                    fromIndex: j,
                    toIndex: j + 1,
                });
                let temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
            }
        }
    }

    return list;
}
