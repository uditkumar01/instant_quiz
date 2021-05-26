import {
    OptionType,
    UserAttemptType,
} from "../../Components/Question/Question.types";
import { auth, firestore } from "../../Firebase/Firebase";
import { ResultStateType } from "./Result.types";

export async function setOrUpdateLeaderBoard(
    { state }: ResultStateType,
    totalCorrectAnswers?: number,
    totalScore?: number
) {
    try {
        // current user name
        const username = auth().currentUser?.displayName

        // current user email
        const email = auth().currentUser?.email;

        // current user uid
        const userUid = auth().currentUser?.uid;

        // get user doc using uid to check if user is present
        const userDocRef = await firestore()
            .collection("leaderboard")
            .doc(`user${userUid}||${state.quizId}`)
            .get();

        if (!userDocRef.exists) {
            // if user doesn't exists set new user
            firestore()
                .collection("leaderboard")
                .doc(`user${userUid}||${state.quizId}`)
                .set({
                    username: username,
                    email: email,
                    attempted: state.userAttempt.length,
                    correct: totalCorrectAnswers,
                    score: totalScore,
                    quizId: state.quizId,
                });
        } else {
            // if user exists update existing user details
            firestore()
                .collection("leaderboard")
                .doc(`user${userUid}||${state.quizId}`)
                .update({
                    attempted: state.userAttempt.length,
                    correct: totalCorrectAnswers,
                    score: totalScore,
                });
        }
    } catch (err) {
        console.log(err.message);
    }
}

export function checkAnswer(
    { state }: ResultStateType,
    currentQuestionIndex: number,
    userAnswer?: UserAttemptType,
    option?: OptionType
) {
    if (option) {
        const IsUserAnsIdSameAsOption = userAnswer?.optionId === option._id;
        const isUserAnsCorrect =
            userAnswer?.optionId ===
            state.topicQuiz[currentQuestionIndex].correct_answer;
        const isCurrentOptionCorrect =
            option._id === state.topicQuiz[currentQuestionIndex].correct_answer;

        let type = "";
        if (isCurrentOptionCorrect) {
            type = "right";
        } else if (userAnswer && IsUserAnsIdSameAsOption) {
            type = "wrong";
        } else {
            type = "none";
        }

        return type as string;

        // return userAnswer
        //     ? userAnswer.optionId === option._id
        //         ? userAnswer.optionId ===
        //           state.topicQuiz[currentQuestionIndex].correct_answer
        //             ? correctStyledIcon
        //             : inCorrectStyledIcon
        //         : option._id ===
        //           state.topicQuiz[currentQuestionIndex].correct_answer
        //         ? correctStyledIcon
        //         : noStyledIcon
        //     : option._id ===
        //       state.topicQuiz[currentQuestionIndex].correct_answer
        //     ? correctStyledIcon
        //     : noStyledIcon;
    }
    return "empty" as string;
}
