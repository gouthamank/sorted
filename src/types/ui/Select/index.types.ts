export type SelectProps = {
    fieldName: string;
    items: SelectItem[];
    onChange?: (name: string, value: string) => void;
    disabled?: boolean;
    fullWidth?: boolean;
    value: string;
};

export type SelectItem = {
    value: string;
    label: string;
};
