import type { HeaderProps } from '@/types/components/Header/index.types';
import Button from '@/ui/Button';
import Select from '@/ui/Select';
import { ARRAY_LENGTHS, SORT_TYPES } from '@/app/page';

export default function Header(props: HeaderProps) {
    return (
        <header className='flex h-20 items-center justify-between gap-4 px-10 py-0'>
            <Button onClick={props.onRandomiseClicked} label='Randomise' disabled={props.sortInProgress} />
            <Select
                onChange={props.onArraySizeChanged}
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
                name='Size'
                disabled={props.sortInProgress}
            />
            <Select
                onChange={props.onSortMethodChanged}
                items={[
                    {
                        label: 'Quicksort',
                        value: SORT_TYPES.QUICKSORT,
                    },
                    {
                        label: 'Merge Sort',
                        value: SORT_TYPES.MERGESORT,
                    },
                ]}
                name='Sort'
                disabled={props.sortInProgress}
            />
            <Button
                onClick={props.onSortClicked}
                label={props.sortInProgress ? 'Sorting' : 'Sort'}
                disabled={props.sortInProgress}
            />
        </header>
    );
}
