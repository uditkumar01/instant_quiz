import {
    Avatar,
    createStyles,
    IconButton,
    makeStyles,
    Theme,
} from "@material-ui/core";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import {
    FaTimes,
    FaCheck,
    VscChevronLeft,
    VscChevronRight,
} from "react-icons/all";
import { useLocation, useNavigate } from "react-router";
import { Navbar } from "../../Components";
import { LeaderBoard } from "../../Components/LeaderBoard/LeaderBoard";
import { UserAttemptType } from "../../Components/Question/Question.types";
import { round } from "../../Components/Utils/Utils";
import "./Result.css";
import { ResultStateType } from "./Result.types";
import { checkAnswer, setOrUpdateLeaderBoard } from "./ResultFunction";

export function Result() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: "flex",
                "& > *": {
                    margin: theme.spacing(1),
                },
            },
            small: {
                width: theme.spacing(3),
                height: theme.spacing(3),
            },
            large: {
                width: theme.spacing(7),
                height: theme.spacing(7),
            },
        })
    );
    const classes = useStyles();
    const { state } = useLocation() as ResultStateType;
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const optionStyledIcons = {
        right: (
            <i>
                <FaCheck style={{ color: "yellowgreen" }} />
            </i>
        ),
        wrong: (
            <i>
                <FaTimes style={{ color: "tomato" }} />
            </i>
        ),
        none: (
            <i>
                <FaTimes style={{ color: "transparent" }} />
            </i>
        ),
        empty: "",
    };
    useEffect(() => {
        if (!state || !state.userAttempt) {
            navigate(`/`);
        }
    }, []);

    console.log(state.userAttempt);

    let userAnswer: UserAttemptType | undefined,
        totalCorrectAnswers: number | undefined,
        totalIncorrectAnswers: number | undefined,
        totalScore: number | undefined;
    if (state) {
        userAnswer = state.userAttempt.find(
            (item) =>
                item.questionId === state.topicQuiz[currentQuestionIndex]._id
        );

        totalCorrectAnswers = state.topicQuiz.reduce((total, val) => {
            const isAttempted = state.userAttempt.find(
                (item) => item.questionId === val._id
            );
            if (isAttempted && isAttempted.optionId === val.correct_answer) {
                return total + 1;
            }
            return total;
        }, 0);

        totalScore = round(
            state.userAttempt.reduce((total, val) => {
                const quesObj = state.topicQuiz.find(
                    (ques) => ques._id === val.questionId
                );
                if (val.optionId === quesObj?.correct_answer) {
                    return total + val.score;
                }
                return total;
            }, 0),
            2
        );

        totalIncorrectAnswers = state.userAttempt.length - totalCorrectAnswers;
    }

    useEffect(() => {
        // saving data on firebase in leaderboard collection
        if (state) {
            setOrUpdateLeaderBoard({ state }, totalCorrectAnswers, totalScore);
        }
    }, []);
    return (
        <>
            <Navbar />
            <div className={`result-container`}>
                <section className={`attempt-history`}>
                    <div className={`attempt-count`}>
                        <p>{state && state.userAttempt.length}</p>
                        <small>attempted</small>
                    </div>
                    <div className={`attempt-count`}>
                        <p>{totalCorrectAnswers}</p>
                        <small>Correct</small>
                    </div>
                    <div className={`attempt-count`}>
                        <p>{totalIncorrectAnswers}</p>
                        <small>Incorrect</small>
                    </div>
                </section>
                <section className={`leaderboard-container`}>
                    <div className={`leaderboard`}>
                        <LeaderBoard
                            state={state}
                            totalScore={totalScore}
                            totalCorrectQuestions={totalCorrectAnswers}
                            totalAttempts={
                                state ? state.userAttempt.length : undefined
                            }
                        />
                    </div>
                </section>

                <section className={`leaderboard-container`}>
                    <div className={`question-card`}>
                        <ul className={`result-questions`}>
                            <li className={`result-question`}>
                                <div className={`result-heading-inline`}>
                                    <Avatar
                                        className={`badge-sm ${classes.small}`}
                                    >
                                        {currentQuestionIndex + 1}
                                    </Avatar>
                                    <h1>
                                        {state &&
                                            parse(
                                                state.topicQuiz[
                                                    currentQuestionIndex
                                                ].question
                                            )}
                                    </h1>
                                </div>
                                <ul className={`result-options`}>
                                    {state?.topicQuiz[
                                        currentQuestionIndex
                                    ].answers.map((option) => {
                                        const optionStyledIconsKey =
                                            checkAnswer(
                                                { state },
                                                currentQuestionIndex,
                                                userAnswer,
                                                option
                                            );
                                        return (
                                            <li className={`result-option`}>
                                                {
                                                    optionStyledIcons[
                                                        optionStyledIconsKey as keyof typeof optionStyledIcons
                                                    ]
                                                }
                                                <p>{option.value}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <div className={`result-question-footer`}>
                            <IconButton
                                color="primary"
                                aria-label="add to shopping cart"
                                onClick={() => {
                                    if (currentQuestionIndex > 0) {
                                        return setCurrentQuestionIndex(
                                            (prev) => prev - 1
                                        );
                                    }
                                }}
                            >
                                <VscChevronLeft />
                            </IconButton>
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    setCurrentQuestionIndex((prev) => {
                                        return (
                                            (prev + 1) % state.topicQuiz.length
                                        );
                                    });
                                }}
                                aria-label="add to shopping cart"
                            >
                                <VscChevronRight />
                            </IconButton>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
