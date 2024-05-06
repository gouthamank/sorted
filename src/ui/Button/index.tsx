import { ButtonProps } from '@/types/ui/Button/index.types';
import classNames from 'classnames';

export default function Button(props: ButtonProps) {
    const { variant = 'primary', ...restProps } = props;
    return (
        <button
            className={classNames([
                'h-10 rounded-lg px-4 transition-all disabled:cursor-not-allowed',
                {
                    'bg-steel-blue-500 text-white shadow-md shadow-steel-blue/50 hover:bg-steel-blue active:bg-steel-blue-700 disabled:bg-steel-blue-100 disabled:text-steel-blue-400':
                        variant === 'primary',
                },
                {
                    'dark:disabled:bg-steel-blue-950 dark:disabled:text-steel-blue-700 dark:disabled:shadow-steel-blue-900/50':
                        variant === 'primary',
                },
                {
                    'border-2 border-steel-blue text-steel-blue shadow-sm shadow-steel-blue/70 hover:border-steel-blue-500 hover:text-steel-blue-500 active:border-steel-blue-700 active:text-steel-blue-700 disabled:border-steel-blue-200 disabled:text-steel-blue-200 disabled:shadow-none':
                        variant === 'secondary',
                },
                {
                    'dark:disabled:border-steel-blue-800 dark:disabled:text-steel-blue-800': variant === 'secondary',
                },
            ])}
            onClick={restProps.onClick}
            disabled={restProps.disabled}
        >
            {restProps.label}
        </button>
    );
}
