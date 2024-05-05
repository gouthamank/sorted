export type SelectProps = {
    name?: string;
    items: SelectItem[];
    onChange?: (value: string | number) => void;
    disabled?: boolean;
};

export type SelectItem = {
    value: number | string;
    label: string;
};
