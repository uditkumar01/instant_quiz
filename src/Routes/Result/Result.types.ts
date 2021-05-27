import {
    QuizType,
    UserAttemptType,
} from "../../Components/Question/Question.types";

export interface ResultStateType {
    state: {
        userAttempt: UserAttemptType[];
        topicQuiz: QuizType[];
        quizId: string;
    };
}
