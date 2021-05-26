import { QuestionDataType } from "../../Components/Question/Question.types";
import { Dispatch, SetStateAction } from "react";
import { DataActionType } from "../../Reducer/DataReducer/DataReducer.types";
import { LeaderBoardDataType } from "../../Components/LeaderBoard/LeaderBoard.types";

export interface InitialStateType {
    quizData: QuestionDataType[];
    leaderBoardData: LeaderBoardDataType[];
}
export interface DataContextValue {
    dataState: InitialStateType;
    dataDispatch: Dispatch<DataActionType>;
    loader: boolean;
    setLoader: Dispatch<SetStateAction<boolean>>;
}
