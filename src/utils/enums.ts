export enum SORT_TYPES {
    'QUICKSORT' = 'quicksort',
    'MERGESORT' = 'mergesort',
    'HEAPSORT' = 'heapsort',
}

export enum ARRAY_LENGTHS {
    'SMALL' = '25',
    'MEDIUM' = '50',
    'LARGE' = '75',
}

export enum ANIMATION_SPEED {
    'SLOW' = '80',
    'MODERATE' = '15',
    'FAST' = '5',
}

export enum ANIMATION_STEP_TYPES {
    HIGHLIGHT,
    HIGHLIGHT_SECONDARY,
    MOVE,
    END_CYCLE,
    START_SORT,
    END_SORT,
}

export enum ANIMATION_STATES {
    IDLE = 'idle',
    RUNNING = 'running',
    COMPLETED = 'completed',
}
