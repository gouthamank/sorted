'use client'

import {useCallback, useEffect, useState} from "react";
import Header from "@/components/Header";
import NodeContainer from "@/components/NodeContainer";
import quickSort from "@/sorting/quicksort";
import { playAnimations } from "@/sorting/animations"
import { AnimationStep, GraphListItem } from "@/types/app/page.types";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
    const [list, setList] = useState<GraphListItem[]>([])

    const handleRandomise = useCallback(() => {
        let newList: GraphListItem[] = [];
        for (let i = 0; i < 50; i++) {
            newList.push({
                isHighlighted: false,
                value: getRandomInt(1, 500)
            })
        }
        setList(newList)
    }, [])

    const handleSort = useCallback(async () => {
        const steps: AnimationStep[] = []
        steps.push({
            type: 'START_SORT',
        })
        quickSort(list.map(x => x.value), { steps })
        steps.push({
            type: 'END_SORT',
        })

        await playAnimations(steps, setList)
    }, [list])

    useEffect(() => {
        handleRandomise()
    }, [handleRandomise])

    return (
        <>
            <Header onRandomiseClicked={handleRandomise} onSortClicked={handleSort}/>
            <main style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 10rem)'
            }}>
                <NodeContainer list={list} />
                {/*{list.length}*/}
                {/*<pre>*/}
                {/*    {JSON.stringify(list, null, 4)}*/}
                {/*</pre>*/}
            </main>
        </>
    );
}
