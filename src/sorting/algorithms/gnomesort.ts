import { GnomeSortAnimationProps } from '@/types/app/page.types';
import { ANIMATION_STEP_TYPES } from '@/utils/enums';

export default function gnomeSort(list: number[], animationProps: GnomeSortAnimationProps) {
    const { steps } = animationProps;

    let i = 0;
    while (i < list.length) {
        if (i === 0) {
            i += 1;
            continue;
        }

        steps.push({
            type: ANIMATION_STEP_TYPES.HIGHLIGHT,
            index: i,
        });

        if (list[i - 1] > list[i]) {
            steps.push({
                type: ANIMATION_STEP_TYPES.MOVE,
                fromIndex: i - 1,
                toIndex: i,
            });
            let tmp = list[i];
            list[i] = list[i - 1];
            list[i - 1] = tmp;
            i -= 1;
        } else {
            i += 1;
        }
    }

    return list;
}
