import { SelectionSortAnimationProps } from '@/types/app/page.types';
import { ANIMATION_STEP_TYPES } from '@/utils/enums';

export default function selectionSort(list: number[], animationProps: SelectionSortAnimationProps) {
    const { steps } = animationProps;

    let n = list.length;

    for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            steps.push({
                type: ANIMATION_STEP_TYPES.HIGHLIGHT_SECONDARY,
                index: j,
            });
            if (list[j] < list[min]) {
                min = j;
            }
        }
        if (min != i) {
            steps.push({
                type: ANIMATION_STEP_TYPES.HIGHLIGHT,
                index: i,
            });
            steps.push({
                type: ANIMATION_STEP_TYPES.MOVE,
                fromIndex: min,
                toIndex: i,
            });
            steps.push({
                type: ANIMATION_STEP_TYPES.MOVE,
                fromIndex: i + 1,
                toIndex: min,
            });
            let tmp = list[i];
            list[i] = list[min];
            list[min] = tmp;
        }
    }
    return list;
}
