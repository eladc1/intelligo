export interface SchemaOption {
    key: string;
    value: string | boolean;
    type: string;
    enumValues?: string[];
    require?: boolean;

    ui?: {
        isInput?: boolean;
        indent?: number;
        title?: string;
    };
}
