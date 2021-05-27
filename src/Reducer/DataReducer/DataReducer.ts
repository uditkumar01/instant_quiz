import { InitialStateType } from "../../Context/DataContext/DataContext.types";
import { DataActionType } from "./DataReducer.types";

export function dataReducer(state: InitialStateType, action: DataActionType) {
    switch (action.type) {
        case "QUIZ_DATA":
            return {
                ...state,
                quizData: [...action.payload],
            } as InitialStateType;
        case "LEADERBOARD_DATA":
            return {
                ...state,
                leaderBoardData: [...action.payload],
            };
        default:
            return state;
    }
}
