export interface CardDataType {
    _id: string;
    title: string;
    content: string | undefined;
    image: string | undefined;
    addButton: boolean;
}

export interface ListOptionsType {
    name: string;
    onClick?: () => void;
}
