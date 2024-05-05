import type { HeaderProps } from '@/types/components/Header/index.types';
import Button from '@/ui/Button';
import Select from '@/ui/Select';
import { SORT_TYPES } from '@/app/page';

export default function Header(props: HeaderProps) {
    return (
        <header className='flex h-20 items-center justify-between gap-4 px-10 py-0'>
            <Button onClick={props.onRandomiseClicked} label='Randomise' disabled={props.disableButtons} />
            <Select
                onChange={props.onSortMethodChanged}
                items={[
                    {
                        label: 'Quicksort',
                        value: SORT_TYPES.QUICKSORT,
                    },
                    // {
                    //     label: 'Merge Sort',
                    //     value: SORT_TYPES.MERGESORT,
                    // },
                ]}
                name='Sort'
                disabled={props.disableButtons}
            />
            <Button onClick={props.onSortClicked} label='Sort' disabled={props.disableButtons} />
        </header>
    );
}
