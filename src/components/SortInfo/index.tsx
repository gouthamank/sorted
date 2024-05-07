import { SortInfoProps } from '@/types/components/SortInfo/index.types';
import Table from '@/ui/Table';
import { SORT_TYPES } from '@/utils/enums';

export default function SortInfo(props: SortInfoProps) {
    const allSortData = {
        [SORT_TYPES.QUICKSORT]: {
            time: {
                worst: (
                    <>
                        O(n<sup>2</sup>)
                    </>
                ),
                avg: <>O(n log(n))</>,
                best: <>O(n log(n))</>,
            },
            space: <>O(1)</>,
            title: 'Quicksort',
        },
        [SORT_TYPES.MERGESORT]: {
            time: {
                worst: <>O(n log(n))</>,
                avg: <>O(n log(n))</>,
                best: <>O(n log(n))</>,
            },
            space: <>O(n)</>,
            title: 'Merge Sort',
        },
        [SORT_TYPES.HEAPSORT]: {
            time: {
                worst: <>O(n log(n))</>,
                avg: <>O(n log(n))</>,
                best: <>O(n log(n))</>,
            },
            space: <>O(1)</>,
            title: 'Heap Sort',
        },
        [SORT_TYPES.BUBBLESORT]: {
            time: {
                worst: (
                    <>
                        O(n<sup>2</sup>)
                    </>
                ),
                avg: (
                    <>
                        O(n<sup>2</sup>)
                    </>
                ),
                best: <>O(n)</>,
            },
            space: <>O(1)</>,
            title: 'Bubble Sort',
        },
        [SORT_TYPES.SELECTIONSORT]: {
            time: {
                worst: (
                    <>
                        O(n<sup>2</sup>)
                    </>
                ),
                avg: (
                    <>
                        O(n<sup>2</sup>)
                    </>
                ),
                best: (
                    <>
                        O(n<sup>2</sup>)
                    </>
                ),
            },
            space: <>O(1)</>,
            title: 'Selection Sort',
        },
        [SORT_TYPES.GNOMESORT]: {
            time: {
                worst: (
                    <>
                        O(n<sup>2</sup>)
                    </>
                ),
                avg: (
                    <>
                        O(n<sup>2</sup>)
                    </>
                ),
                best: <>O(n)</>,
            },
            space: <>O(1)</>,
            title: 'Gnome Sort',
        },
    };

    const sortData = allSortData[props.sortType];

    return (
        <div className='text-md my-12 w-full max-w-[30rem]'>
            <Table
                columns={[sortData.title, '']}
                items={[
                    ['Average', sortData.time.avg],
                    ['Worst-case', sortData.time.worst],
                    [
                        // eslint-disable-next-line react/jsx-key
                        <b>Best-case</b>,
                        sortData.time.best,
                    ],
                    ['Space', sortData.space],
                ]}
            />
        </div>
    );
}
