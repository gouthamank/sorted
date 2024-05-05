import { ButtonProps } from '@/types/ui/Button/index.types';

export default function Button(props: ButtonProps) {
    return (
        <button
            className='h-10 rounded border-solid bg-indigo-400 px-2 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-600 disabled:dark:bg-indigo-950'
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.label}
        </button>
    );
}
