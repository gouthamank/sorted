'use client';

import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/Header';
import NodeContainer from '@/components/NodeContainer';
import quickSort from '@/sorting/quicksort';
import mergeSort from '@/sorting/mergesort';
import heapSort from '@/sorting/heapsort';
import bubbleSort from '@/sorting/bubblesort';
import selectionSort from '@/sorting/selectionsort';
import { playAnimations } from '@/sorting/animations';
import { getRandomInt } from '@/utils';
import { ANIMATION_SPEED, ANIMATION_STATES, ANIMATION_STEP_TYPES, ARRAY_LENGTHS, SORT_TYPES } from '@/utils/enums';
import { MAX_NODE_VALUE } from '@/utils/constants';

import { AnimationStep, GraphListItem } from '@/types/app/page.types';

export default function Home() {
    const [list, setList] = useState<GraphListItem[]>([]);
    const [arrayLength, setArrayLength] = useState<number>(Number.parseInt(ARRAY_LENGTHS.SMALL));
    const [sortType, setSortType] = useState<SORT_TYPES>(SORT_TYPES.QUICKSORT);
    const [sortSpeed, setSortSpeed] = useState<ANIMATION_SPEED>(ANIMATION_SPEED.FAST);
    const [animationState, setAnimationState] = useState<ANIMATION_STATES>(ANIMATION_STATES.IDLE);

    const handleRandomise = useCallback(() => {
        setAnimationState(ANIMATION_STATES.IDLE);

        let newList: GraphListItem[] = [];
        // newList = [100, 110, 90, 130, 70, 120, 80, 150].map(x => ({
        //     isHighlighted: false,
        //     isSecondaryHighlighted: false,
        //     value: x,
        // }));
        for (let i = 0; i < arrayLength; i++) {
            newList.push({
                isHighlighted: false,
                isSecondaryHighlighted: false,
                value: getRandomInt(1, MAX_NODE_VALUE),
            });
        }
        setList(newList);
    }, [arrayLength]);

    const handleSort = useCallback(async () => {
        const steps: AnimationStep[] = [];
        steps.push({
            type: ANIMATION_STEP_TYPES.START_SORT,
        });
        const listToSort = list.map(x => x.value);
        switch (sortType) {
            case SORT_TYPES.QUICKSORT:
                quickSort(listToSort, { steps });
                break;
            case SORT_TYPES.MERGESORT:
                mergeSort(listToSort, { steps });
                break;
            case SORT_TYPES.HEAPSORT:
                heapSort(listToSort, { steps });
                break;
            case SORT_TYPES.BUBBLESORT:
                bubbleSort(listToSort, { steps });
                break;
            case SORT_TYPES.SELECTIONSORT:
                selectionSort(listToSort, { steps });
                break;
            default:
                break;
        }
        steps.push({
            type: ANIMATION_STEP_TYPES.END_SORT,
        });
        await playAnimations(sortSpeed, steps, setList, setAnimationState);
    }, [list, sortType, sortSpeed]);

    const handleSortMethodChanged = useCallback((newSortMethod: SORT_TYPES) => {
        setSortType(newSortMethod);
    }, []);

    const handleArraySizeChanged = useCallback(
        (newArraySizeStr: string) => {
            setArrayLength(Number.parseInt(newArraySizeStr));
            handleRandomise();
        },
        [handleRandomise],
    );

    const handleAnimationSpeedChanged = useCallback((newAnimationSpeed: ANIMATION_SPEED) => {
        setSortSpeed(newAnimationSpeed);
    }, []);

    useEffect(() => {
        handleRandomise();
    }, [handleRandomise]);

    return (
        <>
            <Header
                sortInProgress={animationState === ANIMATION_STATES.RUNNING}
                onRandomiseClicked={handleRandomise}
                onSortClicked={handleSort}
                onSortMethodChanged={handleSortMethodChanged}
                onArraySizeChanged={handleArraySizeChanged}
                onAnimationSpeedChanged={handleAnimationSpeedChanged}
            />
            <main
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 10rem)',
                }}
            >
                <NodeContainer list={list} currentState={animationState} />
                {/*{list.length}*/}
                {/*<pre>{JSON.stringify(list, null, 4)}</pre>*/}
            </main>
        </>
    );
}
