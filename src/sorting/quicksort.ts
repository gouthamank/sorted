import { AnimationProps } from '@/types/app/page.types';

export default function quickSort(list: number[], animationProps: AnimationProps): number[] {
    if (list.length <= 1) {
        return list;
    }
    const { steps, startWindow = 0 } = animationProps;

    let pivot = list[0];
    steps.push({
        type: 'HIGHLIGHT',
        index: startWindow,
    });
    let leftArr = [];
    let rightArr = [];

    for (let i = 1; i < list.length; i++) {
        if (list[i] < pivot) {
            leftArr.push(list[i]);
            steps.push({
                type: 'MOVE',
                fromIndex: startWindow + i,
                toIndex: startWindow + leftArr.length - 1,
            });
        } else {
            rightArr.push(list[i]);
            steps.push({
                type: 'MOVE',
                fromIndex: startWindow + i,
                toIndex: startWindow + leftArr.length + rightArr.length,
            });
        }
    }

    steps.push({
        type: 'END_CYCLE',
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
