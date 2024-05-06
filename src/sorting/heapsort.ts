import { HeapSortAnimationProps } from '@/types/app/page.types';

import { ANIMATION_TYPES } from '@/utils/enums';

function heapify(heap: number[], i: number, heapSize: number, animationProps: HeapSortAnimationProps) {
    const { steps } = animationProps;

    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largest = i;

    steps.push({
        type: ANIMATION_TYPES.HIGHLIGHT_SECONDARY,
        index: left,
    });

    steps.push({
        type: ANIMATION_TYPES.HIGHLIGHT_SECONDARY,
        index: right,
    });

    if (left < heapSize && heap[left] > heap[largest]) {
        largest = left;
    }
    if (right < heapSize && heap[right] > heap[largest]) {
        largest = right;
    }
    if (largest !== i) {
        steps.push({
            type: ANIMATION_TYPES.MOVE,
            fromIndex: largest,
            toIndex: i,
        });
        steps.push({
            type: ANIMATION_TYPES.MOVE,
            fromIndex: i + 1,
            toIndex: largest,
        });
        [heap[i], heap[largest]] = [heap[largest], heap[i]];
        heapify(heap, largest, heapSize, animationProps);
    }
}

function createHeap(list: number[], animationProps: HeapSortAnimationProps): number[] {
    const { steps } = animationProps;

    let heap = [...list];
    for (let i = Math.floor(heap.length / 2); i >= 0; i--) {
        steps.push({
            type: ANIMATION_TYPES.HIGHLIGHT,
            index: i,
        });
        heapify(heap, i, heap.length, animationProps);
    }
    return heap;
}

export default function heapSort(list: number[], animationProps: HeapSortAnimationProps) {
    const { steps } = animationProps;

    let heap = createHeap(list, animationProps);
    let sortedArray: number[] = [];
    while (heap.length > 0) {
        steps.push({
            type: ANIMATION_TYPES.MOVE,
            fromIndex: 0,
            toIndex: list.length - sortedArray.length - 1,
        });
        steps.push({
            type: ANIMATION_TYPES.HIGHLIGHT,
            index: list.length - sortedArray.length - 1,
        });
        sortedArray.unshift(<number>heap.shift());
        heap = createHeap(heap, { steps });
    }
    return sortedArray;
}
