import { SelectProps } from '@/types/ui/Select/index.types';

export default function Select(props: SelectProps) {
    return (
        <select
            className='h-10 w-56 rounded border-solid bg-indigo-400 px-2 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-600 disabled:dark:bg-indigo-950'
            name={props.name}
            disabled={props.disabled}
            onChange={evt => {
                if (!props.onChange) {
                    return;
                }

                props.onChange(evt.target.value);
            }}
            multiple={false}
        >
            {props.items.map(item => {
                return (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                );
            })}
        </select>
    );
}
