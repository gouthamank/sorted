import type { FormData } from '@/types/app/page.types';

export type HeaderProps = {
    onRandomiseClicked: () => void;
    onSortClicked: () => void;
    onSortMethodChanged: (fieldName: string, newSortMethod: any) => void;
    onArraySizeChanged: (fieldName: string, newArraySize: string) => void;
    onAnimationSpeedChanged: (fieldName: string, newAnimationSpeed: any) => void;
    sortInProgress: boolean;
    headerFormState: FormData;
};
