import { Dispatch, SetStateAction } from "react";

export interface OptionType {
    _id: string;
    value: string;
}
export interface QuizType {
    _id: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    time: number;
    answers: OptionType[];
}
export interface QuestionDataType {
    _id: string;
    title: string;
    quiz: QuizType[];
}

export interface UserAttemptType {
    questionId: string;
    optionId: string;
    score: number;
    timeTaken: number;
}

export interface SingleQuestionType {
    questionObj: QuizType;
    currentQuestionIndex: number;
    setUserAttempt: Dispatch<SetStateAction<UserAttemptType[]>>;
    setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
}
