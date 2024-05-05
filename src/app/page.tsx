'use client';

import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/Header';
import NodeContainer from '@/components/NodeContainer';
import quickSort from '@/sorting/quicksort';
import { playAnimations } from '@/sorting/animations';
import { getRandomInt } from '@/utils';

import { AnimationStep, GraphListItem } from '@/types/app/page.types';
import mergeSort from '@/sorting/mergesort';

export enum SORT_TYPES {
    'QUICKSORT' = 'quicksort',
    'MERGESORT' = 'mergesort',
}

export enum ARRAY_LENGTHS {
    'SMALL' = '25',
    'MEDIUM' = '50',
    'LARGE' = '75',
}

export enum ANIMATION_TYPES {
    HIGHLIGHT,
    HIGHLIGHT_SECONDARY,
    MOVE,
    END_CYCLE,
    START_SORT,
    END_SORT,
}

export default function Home() {
    const [list, setList] = useState<GraphListItem[]>([]);
    const [arrayLength, setArrayLength] = useState<number>(Number.parseInt(ARRAY_LENGTHS.SMALL));
    const [sortType, setSortType] = useState<SORT_TYPES>(SORT_TYPES.QUICKSORT);
    const [sortInProgress, setSortInProgress] = useState<boolean>(false);

    const handleRandomise = useCallback(() => {
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
                value: getRandomInt(1, 500),
            });
        }
        setList(newList);
    }, [arrayLength]);

    const handleSort = useCallback(async () => {
        const steps: AnimationStep[] = [];
        steps.push({
            type: ANIMATION_TYPES.START_SORT,
        });
        const listToSort = list.map(x => x.value);
        switch (sortType) {
            case SORT_TYPES.QUICKSORT:
                quickSort(listToSort, { steps });
                break;
            case SORT_TYPES.MERGESORT:
                mergeSort(listToSort, { steps });
                break;
            default:
                console.log('>>', 'in break', sortType);
                break;
        }
        steps.push({
            type: ANIMATION_TYPES.END_SORT,
        });
        await playAnimations(steps, setList, setSortInProgress);
    }, [list, sortType]);

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

    useEffect(() => {
        handleRandomise();
    }, [handleRandomise]);

    return (
        <>
            <Header
                sortInProgress={sortInProgress}
                onRandomiseClicked={handleRandomise}
                onSortClicked={handleSort}
                onSortMethodChanged={handleSortMethodChanged}
                onArraySizeChanged={handleArraySizeChanged}
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
                <NodeContainer list={list} />
                {/*{list.length}*/}
                {/*<pre>{JSON.stringify(list, null, 4)}</pre>*/}
            </main>
        </>
    );
}
