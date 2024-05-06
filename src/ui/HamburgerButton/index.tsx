import classNames from 'classnames';
import type { HamburgerButtonProps } from '@/types/ui/HamburgerButton/index.types';

export default function HamburgerButton(props: HamburgerButtonProps) {
    const { isActive } = props;
    return (
        <button onClick={props.onClick} className='flex flex-col items-center justify-center py-2 pe-1'>
            <span
                className={classNames([
                    'block h-0.5 w-6 rounded-sm bg-steel-blue-500 transition-all duration-300 ease-out',
                    {
                        'translate-y-1 rotate-45': isActive,
                    },
                    {
                        '-translate-y-0.5': !isActive,
                    },
                ])}
            ></span>
            <span
                className={classNames([
                    'my-0.5 block h-0.5 w-6 rounded-sm bg-steel-blue-500 transition-all duration-300 ease-out',
                    {
                        'opacity-0': isActive,
                    },
                    {
                        'opacity-100': !isActive,
                    },
                ])}
            ></span>
            <span
                className={classNames([
                    'block h-0.5 w-6 rounded-sm bg-steel-blue-500 transition-all duration-300 ease-out',
                    {
                        '-translate-y-1 -rotate-45': isActive,
                    },
                    {
                        'translate-y-0.5': !isActive,
                    },
                ])}
            ></span>
        </button>
    );
}
