import { QuestionDataType } from "../Question/Question.types";

export interface CardDataType {
    title: string;
    content: string;
    image: string;
    addButton?: boolean;
}

export interface CardCollectionType {
    heading: string;
    subHeading: string;
    list: CardDataType[] | QuestionDataType[];
    addButton?: boolean;
}
