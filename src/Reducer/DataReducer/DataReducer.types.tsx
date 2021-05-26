import { QuestionDataType } from "../../Components/Question/Question.types";
import { LeaderBoardDataType } from "../../Components/LeaderBoard/LeaderBoard.types";

export interface QuizDataActionType {
    type: "QUIZ_DATA";
    payload: QuestionDataType[];
}

export interface LeaderBoardDataActionType {
    type: "LEADERBOARD_DATA";
    payload: LeaderBoardDataType[];
}

export type DataActionType = QuizDataActionType | LeaderBoardDataActionType;
