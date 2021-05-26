import { ResultStateType } from "../../Routes/Result/Result.types";

export interface LeaderBoardDataType {
    username?: string | null;
    email?: string | null;
    attempted?: number | null;
    correct?: number | null;
    score?: number | null;
    quizId?: string | null;
}

export interface LeaderBoardPropType extends ResultStateType {
    totalScore?: number;
    totalCorrectQuestions?: number;
    totalAttempts?: number;
}
