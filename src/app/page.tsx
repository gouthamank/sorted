'use client';

import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/Header';
import NodeContainer from '@/components/NodeContainer';
import quickSort from '@/sorting/quicksort';
import { playAnimations } from '@/sorting/animations';
import { getRandomInt } from '@/utils';

import { AnimationStep, GraphListItem } from '@/types/app/page.types';

export enum SORT_TYPES {
    'QUICKSORT',
    'MERGESORT',
}

export enum ARRAY_LENGTHS {
    'SMALL' = 50,
    'MEDIUM' = 100,
    'LARGE' = 250,
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
    const [arrayLength, setArrayLength] = useState<number>(ARRAY_LENGTHS.MEDIUM);
    const [sortType, setSortType] = useState<SORT_TYPES>(SORT_TYPES.QUICKSORT);
    const [sortInProgress, setSortInProgress] = useState<boolean>(false);

    const handleRandomise = useCallback(() => {
        let newList: GraphListItem[] = [];
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
        switch (sortType) {
            case SORT_TYPES.QUICKSORT:
                quickSort(
                    list.map(x => x.value),
                    { steps },
                );
                break;
            default:
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

    useEffect(() => {
        handleRandomise();
    }, [handleRandomise]);

    return (
        <>
            <Header
                disableButtons={sortInProgress}
                onRandomiseClicked={handleRandomise}
                onSortClicked={handleSort}
                onSortMethodChanged={handleSortMethodChanged}
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
                {/*<pre>*/}
                {/*    {JSON.stringify(list, null, 4)}*/}
                {/*</pre>*/}
            </main>
        </>
    );
}
