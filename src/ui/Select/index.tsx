import { SelectProps } from '@/types/ui/Select/index.types';
import classNames from 'classnames';
import styles from './Select.module.scss';

export default function Select(props: SelectProps) {
    return (
        <div
            className={classNames([
                `relative ${styles['ui-select']}`,
                {
                    [styles['ui-select_disabled']]: props.disabled,
                },
                {
                    'flex-grow': props.fullWidth,
                },
            ])}
        >
            <select
                className={classNames([
                    'h-10 appearance-none rounded-lg bg-transparent pe-8 ps-4 transition-all',
                    'border-2 border-steel-blue text-steel-blue shadow-sm shadow-steel-blue/70 hover:border-steel-blue-500 hover:text-steel-blue-500 active:border-steel-blue-700 active:text-steel-blue-700 disabled:border-steel-blue-200 disabled:text-steel-blue-200 disabled:shadow-none',
                    'dark:disabled:border-steel-blue-800 dark:disabled:text-steel-blue-800',
                    {
                        'w-full': props.fullWidth,
                    },
                ])}
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
            <div className={classNames(['absolute h-0 w-0 transition-colors', styles['chevron']])} />
        </div>
    );
}
