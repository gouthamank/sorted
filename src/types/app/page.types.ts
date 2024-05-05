export type GraphListItem = {
    value: number;
    isHighlighted: boolean;
}

export type AnimationStep = {
    type: 'HIGHLIGHT';
    index: number;
} | {
    type: 'MOVE';
    fromIndex: number;
    toIndex: number;
} | {
    type: 'END_CYCLE'
} | {
    type: 'START_SORT'
} | {
    type: 'END_SORT'
}

export type AnimationProps = {
    steps: AnimationStep[];
    startWindow?: number;
}