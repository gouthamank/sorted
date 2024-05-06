export type SelectProps = {
    name?: string;
    items: SelectItem[];
    onChange?: (value: string) => void;
    disabled?: boolean;
    fullWidth?: boolean;
};

export type SelectItem = {
    value: string;
    label: string;
};
