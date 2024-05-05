export type HeaderProps = {
    onRandomiseClicked: () => void;
    onSortClicked: () => void;
    onSortMethodChanged: (newSortMethod: any) => void;
    onArraySizeChanged: (newArraySize: string) => void;
    sortInProgress: boolean;
};
