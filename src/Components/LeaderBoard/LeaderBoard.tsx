import { useEffect, useState } from "react";
import { fetchLeaderBoardData } from "../../App/FetchFireBaseData";
import useDataContext from "../../Context/DataContext/DataContext";
import { auth } from "../../Firebase/Firebase";
import "./LeaderBoard.css";
import { LeaderBoardPropType } from "./LeaderBoard.types";
export function LeaderBoard({
    state,
    totalScore,
    totalAttempts,
    totalCorrectQuestions,
}: LeaderBoardPropType) {
    const { dataDispatch, dataState, setLoader } = useDataContext();

    useEffect(() => {
        fetchLeaderBoardData(dataDispatch, setLoader);
    }, []);
    let isUserAlreadyinLeaderBoard = false;
    let updatedLeaderBoardData = dataState.leaderBoardData.map((rankedUser) => {
        if (
            rankedUser.email === auth().currentUser?.email &&
            rankedUser.quizId === state.quizId
        ) {
            isUserAlreadyinLeaderBoard = true;
            return {
                ...rankedUser,
                score: totalScore,
                correct: totalCorrectQuestions,
                attempted: totalAttempts,
            };
        }
        return { ...rankedUser };
    });
    if (!isUserAlreadyinLeaderBoard) {
        // current user name
        const username = auth().currentUser
            ? auth().currentUser?.displayName
            : "You";

        // current user email
        const email = auth().currentUser
            ? auth().currentUser?.email
            : "email@gmail.com";

        updatedLeaderBoardData.push({
            username: username,
            email: email,
            score: totalScore,
            correct: totalCorrectQuestions,
            attempted: totalAttempts,
        });
        console.log({
            username: username,
            email: email,
            score: totalScore,
            correct: totalCorrectQuestions,
            attempted: totalAttempts,
        });
    }
    updatedLeaderBoardData.sort((a, b) => {
        if (a && b && a.score && b.score) {
            return b.score - a.score;
        }
        return 0;
    });

    let currentUserRank = 10;
    const currentUserRankData = updatedLeaderBoardData.find(
        (rankedUser, index) => {
            if (
                rankedUser.email === auth().currentUser?.email &&
                rankedUser.quizId === state.quizId
            ) {
                currentUserRank = index + 1;
                return true;
            }
        }
    );

    return (
        <>
            {dataState.leaderBoardData && (
                <div className="l-wrapper">
                    <div className="c-headline">
                        <h4 className="c-headline__title">LeaderBoard</h4>
                        <br />
                    </div>
                    <table
                        className="c-table"
                        cellPadding={0}
                        cellSpacing={0}
                        style={
                            dataState.leaderBoardData.length <= 7
                                ? { paddingBottom: "2rem" }
                                : {}
                        }
                    >
                        <thead className="c-table__head">
                            <tr className="c-table__head-row">
                                <th className="c-table__head-cell rank"></th>
                                <th className="c-table__head-cell">Username</th>
                                <th className="c-table__head-cell">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {updatedLeaderBoardData
                                .slice(0, 7)
                                .map(({ username, score }, index) => {
                                    const rankObj = [
                                        "c-place--first",
                                        "c-place--second",
                                        "c-place--third",
                                    ];
                                    return (
                                        <tr className="c-table__row">
                                            <td className="c-table__cell rank">
                                                <p
                                                    className={`c-rank ${
                                                        index < 3
                                                            ? rankObj[index]
                                                            : ""
                                                    }`}
                                                >
                                                    <span className={`c-place`}>
                                                        {index + 1}
                                                    </span>
                                                </p>
                                            </td>
                                            <td className="c-table__cell c-table__cell--name">
                                                {username}
                                            </td>
                                            <td className="c-table__cell c-table__cell--points">
                                                <strong>{score}</strong>
                                                <small>pts</small>
                                            </td>
                                        </tr>
                                    );
                                })}

                            {/* fixed row */}
                            {dataState.leaderBoardData.length > 7 &&
                                currentUserRankData && (
                                    <tr className="c-table__row user-rank">
                                        <td className="c-table__cell rank">
                                            <p className="c-rank">
                                                <span className={`c-place`}>
                                                    {currentUserRank}
                                                </span>
                                            </p>
                                        </td>
                                        <td className="c-table__cell c-table__cell--name">
                                            {currentUserRankData.username}
                                        </td>
                                        <td className="c-table__cell c-table__cell--points">
                                            <strong>
                                                {currentUserRankData.score}
                                            </strong>
                                            <small>pts</small>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
