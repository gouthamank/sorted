import { AnimationStep, GraphListItem } from '@/types/app/page.types';
import { Dispatch, SetStateAction } from 'react';

export async function playAnimations(steps: AnimationStep[], setList: Dispatch<SetStateAction<GraphListItem[]>>) {
    const delay = () => new Promise(resolve => setTimeout(resolve, 10));
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        switch (step.type) {
            case 'END_SORT':
                setList(oldList => {
                    return oldList.map(x => {
                        return {
                            ...x,
                            isHighlighted: false,
                        };
                    });
                });
                await delay();
                break;
            case 'HIGHLIGHT':
                setList(oldList => {
                    return oldList.map((x, index) => {
                        if (index === step.index) {
                            return {
                                ...x,
                                isHighlighted: true,
                            };
                        } else {
                            return {
                                ...x,
                                isHighlighted: false,
                            };
                        }
                    });
                });
                await delay();
                break;
            case 'MOVE':
                const startIndex = step.fromIndex;
                const endIndex = step.toIndex;
                setList(oldList => {
                    let newList = oldList.map(x => x);
                    const elementToMove = newList.slice(startIndex, startIndex + 1)[0];
                    newList.splice(startIndex, 1);
                    newList.splice(endIndex, 0, elementToMove);
                    return newList;
                });
                await delay();
        }
    }
}
