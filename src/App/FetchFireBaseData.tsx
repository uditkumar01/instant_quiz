import { firestore } from "../Firebase/Firebase";
import { Dispatch, SetStateAction } from "react";
import { QuestionDataType } from "../Components/Question/Question.types";
import { quizData } from "../Data/Data";
import { DataActionType } from "../Reducer/DataReducer/DataReducer.types";
import { LeaderBoardDataType } from "../Components/LeaderBoard/LeaderBoard.types";

// firestore().collection("quizzes").add({
//     data: quizData,
// });

export async function fetchQuizData(
    dataDispatch: Dispatch<DataActionType>,
    setLoader: Dispatch<SetStateAction<boolean>>
) {
    setLoader(true);
    try {
        const docRef = firestore().collection("quizzes");
        const snapshot = await docRef.get();
        let resData: QuestionDataType[] = [];
        snapshot.forEach((doc) => {
            resData = [...doc.data().data];
        });
        dataDispatch({
            type: "QUIZ_DATA",
            payload: resData ? resData : [],
        });
    } catch (err) {
        dataDispatch({
            type: "QUIZ_DATA",
            payload: quizData,
        });
    }
    setLoader(false);
}

export async function fetchLeaderBoardData(
    dataDispatch: Dispatch<DataActionType>,
    setLoader: Dispatch<SetStateAction<boolean>>
) {
    setLoader(true);
    try {
        const docRef = firestore().collection("leaderboard");
        const snapshot = await docRef.get();
        let resData: LeaderBoardDataType[] = [];
        snapshot.forEach((doc) => {
            resData.push(doc.data());
        });
        if (resData && resData.length > 0) {
            resData.sort((a, b) => {
                if (a && b && a.score && b.score) {
                    return b.score - a.score;
                }
                return 0;
            });
            dataDispatch({
                type: "LEADERBOARD_DATA",
                payload: resData ? resData : [],
            });
        }
    } catch (err) {
        console.log(err.message, "leaderboard err");
    }
    setLoader(false);
}
