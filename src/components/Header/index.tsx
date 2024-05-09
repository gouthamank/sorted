import type { HeaderProps } from '@/types/components/Header/index.types';
import Button from '@/ui/Button';
import Select from '@/ui/Select';
import { ANIMATION_SPEED, ARRAY_LENGTHS, SORT_TYPES } from '@/utils/enums';
import { useCallback, useEffect, useMemo, useState } from 'react';
import HamburgerButton from '@/ui/HamburgerButton';
import classNames from 'classnames';

export default function Header(props: HeaderProps) {
    const {
        onAnimationSpeedChanged,
        onArraySizeChanged,
        onSortMethodChanged,
        onRandomiseClicked,
        onSortClicked,
        headerFormState,
        sortInProgress,
    } = props;
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isStaleSort, setIsStaleSort] = useState(false);
    const handleHamburgerClick = useCallback(() => {
        setMenuOpen(value => {
            const newValue = !value;
            if (newValue) {
                document.body.classList.add('disable-scroll');
            } else {
                document.body.classList.remove('disable-scroll');
            }
            return newValue;
        });
    }, []);

    const handleResize = useCallback(() => {
        if (window.innerWidth >= 870) {
            setMenuOpen(false);
            document.body.classList.remove('disable-scroll');
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const overflowItems = useMemo(() => {
        return (
            <>
                <Select
                    fullWidth
                    onChange={(fieldName, newArraySize) => {
                        setIsStaleSort(false);
                        onArraySizeChanged(fieldName, newArraySize);
                    }}
                    items={[
                        {
                            label: `Small (${ARRAY_LENGTHS.SMALL})`,
                            value: ARRAY_LENGTHS.SMALL,
                        },
                        {
                            label: `Medium (${ARRAY_LENGTHS.MEDIUM})`,
                            value: ARRAY_LENGTHS.MEDIUM,
                        },
                        {
                            label: `Large (${ARRAY_LENGTHS.LARGE})`,
                            value: ARRAY_LENGTHS.LARGE,
                        },
                    ]}
                    fieldName='size'
                    value={headerFormState['size']}
                    disabled={sortInProgress}
                />
                <Select
                    fullWidth
                    onChange={onAnimationSpeedChanged}
                    items={[
                        {
                            label: 'Fast',
                            value: ANIMATION_SPEED.FAST,
                        },
                        {
                            label: 'Moderate',
                            value: ANIMATION_SPEED.MODERATE,
                        },
                        {
                            label: 'Slow',
                            value: ANIMATION_SPEED.SLOW,
                        },
                    ]}
                    fieldName='speed'
                    value={headerFormState['speed']}
                    disabled={sortInProgress}
                />
                <Select
                    fullWidth
                    onChange={onSortMethodChanged}
                    items={[
                        {
                            label: 'Quicksort',
                            value: SORT_TYPES.QUICKSORT,
                        },
                        {
                            label: 'Merge Sort',
                            value: SORT_TYPES.MERGESORT,
                        },
                        {
                            label: 'Heap Sort',
                            value: SORT_TYPES.HEAPSORT,
                        },
                        {
                            label: 'Bubble Sort',
                            value: SORT_TYPES.BUBBLESORT,
                        },
                        {
                            label: 'Selection Sort',
                            value: SORT_TYPES.SELECTIONSORT,
                        },
                        {
                            label: 'Gnome Sort',
                            value: SORT_TYPES.GNOMESORT,
                        },
                    ]}
                    fieldName='sort'
                    value={headerFormState['sort']}
                    disabled={sortInProgress}
                />
            </>
        );
    }, [onAnimationSpeedChanged, onArraySizeChanged, onSortMethodChanged, sortInProgress, headerFormState]);

    return (
        <header>
            <div className='relative z-[9999]'>
                <div
                    className={classNames([
                        'header-top-row flex h-20 items-center justify-between px-5 py-0 transition-colors duration-300',
                        {
                            'bg-steel-blue-100 dark:bg-gray-900': isMenuOpen,
                        },
                    ])}
                >
                    <div className='hidden lg:flex lg:flex-row lg:gap-4'>{overflowItems}</div>
                    <div className='lg:hidden'>
                        <HamburgerButton isActive={isMenuOpen} onClick={handleHamburgerClick} />
                    </div>
                    <div className='main-buttons flex flex-row gap-4'>
                        <Button
                            onClick={() => {
                                setIsStaleSort(false);
                                onRandomiseClicked();
                            }}
                            label='Randomise'
                            variant={'secondary'}
                            disabled={sortInProgress}
                        />
                        <Button
                            onClick={() => {
                                setIsStaleSort(true);
                                setMenuOpen(false);
                                onSortClicked();
                            }}
                            label={'Sort'}
                            disabled={sortInProgress || isStaleSort}
                        />
                    </div>
                </div>
                <div
                    className={classNames([
                        'header-bottom-row absolute z-[9999] flex w-full flex-col gap-4 px-5 pb-4 pt-0 transition-all duration-300 sm:flex-row sm:justify-between lg:hidden',
                        {
                            'pointer-events-all border-b-2 border-steel-blue-200 bg-steel-blue-100 opacity-100 dark:border-steel-blue-800 dark:bg-gray-900':
                                isMenuOpen,
                        },
                        {
                            'pointer-events-none opacity-0': !isMenuOpen,
                        },
                    ])}
                >
                    {overflowItems}
                </div>
            </div>
            <div
                className={classNames([
                    'height-full width-full absolute bottom-0 left-0 right-0 top-0 z-[5000] h-screen bg-black/80 transition-opacity duration-300',
                    { 'pointer-events-none opacity-0': !isMenuOpen },
                    { 'pointer-events-all opacity-100': isMenuOpen },
                ])}
                onClick={() => handleHamburgerClick()}
            />
        </header>
    );
}
