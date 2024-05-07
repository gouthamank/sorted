import type { TableProps } from '@/types/ui/Table/index.types';

export default function Table(props: TableProps) {
    return (
        <table className='w-full border-collapse border border-steel-blue-400 bg-white shadow-sm dark:border-steel-blue-500 dark:bg-steel-blue-900'>
            <thead className='bg-steel-blue-50 shadow-lg dark:bg-steel-blue-700'>
                <tr>
                    {props.columns.map((column, index) => {
                        return (
                            <th
                                key={index}
                                className='w-1/2 border border-steel-blue-50 p-4 text-left font-semibold text-steel-blue-900 dark:border-steel-blue-700 dark:text-steel-blue-200'
                            >
                                <span>{column}</span>
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {props.items.map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => {
                                return (
                                    <td
                                        key={cellIndex}
                                        className='border border-steel-blue-300 p-4 text-steel-blue-500 dark:border-steel-blue-800 dark:text-steel-blue-400'
                                    >
                                        <span>{cell}</span>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
