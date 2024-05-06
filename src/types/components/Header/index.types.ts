export type HeaderProps = {
    onRandomiseClicked: () => void;
    onSortClicked: () => void;
    onSortMethodChanged: (newSortMethod: any) => void;
    onArraySizeChanged: (newArraySize: string) => void;
    onAnimationSpeedChanged: (newAnimationSpeed: any) => void;
    sortInProgress: boolean;
};
