import { AnimationStep, GraphListItem } from '@/types/app/page.types';
import { Dispatch, SetStateAction } from 'react';
import { ANIMATION_TYPES } from '@/app/page';

export async function playAnimations(
    steps: AnimationStep[],
    setList: Dispatch<SetStateAction<GraphListItem[]>>,
    setSortInProgress: Dispatch<SetStateAction<boolean>>,
) {
    setSortInProgress(true);
    const delay = () => new Promise(resolve => setTimeout(resolve, 10));
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        switch (step.type) {
            case ANIMATION_TYPES.END_SORT:
                setList(oldList => {
                    return oldList.map(x => {
                        return {
                            ...x,
                            isHighlighted: false,
                            isSecondaryHighlighted: false,
                        };
                    });
                });
                await delay();
                break;
            case ANIMATION_TYPES.HIGHLIGHT:
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
            case ANIMATION_TYPES.HIGHLIGHT_SECONDARY:
                setList(oldList => {
                    return oldList.map((x, index) => {
                        if (index === step.index) {
                            return {
                                ...x,
                                isSecondaryHighlighted: true,
                            };
                        } else {
                            return {
                                ...x,
                                isSecondaryHighlighted: false,
                            };
                        }
                    });
                });
                await delay();
                break;
            case ANIMATION_TYPES.MOVE:
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
    setSortInProgress(false);
}
