'use client';

import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/Header';
import NodeContainer from '@/components/NodeContainer';
import SortInfo from '@/components/SortInfo';
import * as sortingAlgorithms from '@/sorting/algorithms';
import { playAnimations } from '@/sorting/animations';
import { getRandomInt } from '@/utils';
import { ANIMATION_SPEED, ANIMATION_STATES, ANIMATION_STEP_TYPES, ARRAY_LENGTHS, SORT_TYPES } from '@/utils/enums';
import { MAX_NODE_VALUE } from '@/utils/constants';

import type { FormData, AnimationStep, GraphListItem } from '@/types/app/page.types';
import { getSavedFormData, updateFormData } from '@/utils/sessionStorage';

export default function Home() {
    const [formState, setFormState] = useState<FormData>(getSavedFormData());
    const [list, setList] = useState<GraphListItem[]>([]);
    const [arrayLength, setArrayLength] = useState<number>(Number.parseInt(formState.size || ARRAY_LENGTHS.SMALL));
    const [sortType, setSortType] = useState<SORT_TYPES>((formState.sort as SORT_TYPES) || SORT_TYPES.QUICKSORT);
    const [sortSpeed, setSortSpeed] = useState<ANIMATION_SPEED>(
        (formState.speed as ANIMATION_SPEED) || ANIMATION_SPEED.FAST,
    );
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
                sortingAlgorithms.quickSort(listToSort, { steps });
                break;
            case SORT_TYPES.MERGESORT:
                sortingAlgorithms.mergeSort(listToSort, { steps });
                break;
            case SORT_TYPES.HEAPSORT:
                sortingAlgorithms.heapSort(listToSort, { steps });
                break;
            case SORT_TYPES.BUBBLESORT:
                sortingAlgorithms.bubbleSort(listToSort, { steps });
                break;
            case SORT_TYPES.SELECTIONSORT:
                sortingAlgorithms.selectionSort(listToSort, { steps });
                break;
            case SORT_TYPES.GNOMESORT:
                sortingAlgorithms.gnomeSort(listToSort, { steps });
                break;
            default:
                break;
        }
        steps.push({
            type: ANIMATION_STEP_TYPES.END_SORT,
        });
        await playAnimations(sortSpeed, steps, setList, setAnimationState);
    }, [list, sortType, sortSpeed]);

    const handleSortMethodChanged = useCallback((fieldName: string, newSortMethod: SORT_TYPES) => {
        setFormState(form => ({
            ...form,
            [fieldName]: newSortMethod,
        }));
        setSortType(newSortMethod);
    }, []);

    const handleArraySizeChanged = useCallback(
        (fieldName: string, newArraySizeStr: string) => {
            setFormState(form => ({
                ...form,
                [fieldName]: newArraySizeStr,
            }));
            setArrayLength(Number.parseInt(newArraySizeStr));
            handleRandomise();
        },
        [handleRandomise],
    );

    const handleAnimationSpeedChanged = useCallback((fieldName: string, newAnimationSpeed: ANIMATION_SPEED) => {
        setFormState(form => ({
            ...form,
            [fieldName]: newAnimationSpeed,
        }));
        setSortSpeed(newAnimationSpeed);
    }, []);

    useEffect(() => {
        handleRandomise();
    }, [handleRandomise]);

    useEffect(() => {
        updateFormData(formState);
    }, [formState]);

    return (
        <>
            <Header
                sortInProgress={animationState === ANIMATION_STATES.RUNNING}
                onRandomiseClicked={handleRandomise}
                onSortClicked={handleSort}
                onSortMethodChanged={handleSortMethodChanged}
                onArraySizeChanged={handleArraySizeChanged}
                onAnimationSpeedChanged={handleAnimationSpeedChanged}
                headerFormState={formState}
            />
            <main
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 5rem)',
                    padding: '0 1.25rem',
                }}
            >
                <NodeContainer list={list} currentState={animationState} />
                <SortInfo sortType={sortType} />
                {/*{list.length}*/}
                {/*<pre>{JSON.stringify(list, null, 4)}</pre>*/}
            </main>
        </>
    );
}
