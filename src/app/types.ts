export interface KeyValue {
    [key: string]: string;
}

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

export interface SchemaOptionsReq {
    succeeded: boolean;
    result: {
        type: string;
        scheme: {
            SchemaOption
        };
    };
}

export interface TypeOfSchema {
    type: string;
    display: string;
}

