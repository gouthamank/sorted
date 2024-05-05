'use client'

import {useCallback, useState} from "react";
import Header from "@/components/Header";
import NodeContainer from "@/components/NodeContainer";
import Node from "@/components/Node";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function quickSort(list: number[], animationProps: any): any {
    if (list.length <= 1) {
        return list;
    }
    const {steps, startWindow = 0} = animationProps;

    let pivot = list[0];
    steps.push({
        type: 'HIGHLIGHT',
        index: startWindow,
    })
    let leftArr = [];
    let rightArr = [];

    for (let i = 1; i < list.length; i++) {
        if (list[i] < pivot) {
            leftArr.push(list[i]);
            steps.push({
                type: 'MOVE',
                fromIndex: startWindow + i,
                toIndex: startWindow + leftArr.length - 1,
            })
        } else {
            rightArr.push(list[i]);
            steps.push({
                type: 'MOVE',
                fromIndex: startWindow + i,
                toIndex: startWindow + leftArr.length + rightArr.length,
            })
        }
    }

    steps.push({
        type: 'END_CYCLE',
    })

    return [
        ...quickSort(leftArr, {steps, startWindow}),
        pivot,
        ...quickSort(rightArr, {steps, startWindow: startWindow + leftArr.length + 1})
    ];
}


export default function Home() {
    const [list, setList] = useState<any[]>([])
    const handleRandomise = useCallback(() => {
        let newList: any[] = [];
        for (let i = 0; i < 50; i++) {
            newList.push({
                isHighlighted: false,
                value: getRandomInt(1, 500)
            })
        }
        setList(newList)
    }, [])

    const handleSort = useCallback(async () => {
        const steps: any[] = []
        steps.push({
            type: 'START_SORT',
        })
        quickSort(list.map(x => x.value), { steps })
        steps.push({
            type: 'END_SORT',
        })
        const delay = () => new Promise((resolve) => setTimeout(resolve, 10));
        for (let i = 0; i < steps.length; i++) {
            if (steps[i].type === 'END_SORT') {
                setList((oldList: any[]) => {
                    return oldList.map((x) => {
                        return {
                            ...x,
                            isHighlighted: false,
                        }
                    })
                })
                await delay();
            }
            if (steps[i].type === 'HIGHLIGHT') {
                setList((oldList: any[]) => {
                    return oldList.map((x, index) => {
                        if (index === steps[i].index) {
                            return {
                                ...x,
                                isHighlighted: true,
                            }
                        } else {
                            return {
                                ...x,
                                isHighlighted: false,
                            }
                        }
                    })
                })
                await delay();
            }
            if (steps[i].type === 'MOVE') {
                const startIndex = steps[i].fromIndex
                const endIndex = steps[i].toIndex
                setList((oldList: any[]) => {
                    let newList = oldList.map(x => x);
                    const elementToMove = newList.slice(startIndex, startIndex + 1)[0]
                    newList.splice(startIndex, 1)
                    newList.splice(endIndex, 0, elementToMove)
                    return newList
                })
                await delay();
            }
        }
    }, [list])

    return (
        <>
            <Header onRandomiseClicked={handleRandomise} onSortClicked={handleSort}/>
            <main style={{height: '100%'}}>
                <div style={{height: '100px'}}/>
                <NodeContainer>
                    {list.map((node, idx) => <Node key={idx} state={node}/>)}
                </NodeContainer>
                {/*{list.length}*/}
                {/*<pre>*/}
                {/*    {JSON.stringify(list, null, 2)}*/}
                {/*</pre>*/}
            </main>
        </>
    );
}
