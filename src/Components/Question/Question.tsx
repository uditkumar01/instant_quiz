import { Avatar, Button, Chip, LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./Question.css";
import { SingleQuestionType, UserAttemptType } from "./Question.types";
import parse from "html-react-parser";
import useDataContext from "../../Context/DataContext/DataContext";
import { useNavigate } from "react-router";
import { fetchLeaderBoardData } from "../../App/FetchFireBaseData";

function SingleQuestion({
    questionObj,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setUserAttempt,
}: SingleQuestionType) {
    const pointsPerQuestion = 10;
    const [animation, setAnimation] =
        useState<"fade-out-down" | "fade-in-down" | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const optionClickHandler = (optionId: string) => {
        setUserAttempt((userAttempt) => {
            const alreadyAttempted = userAttempt.some(
                (item) => item.questionId === questionObj._id
            );
            if (!alreadyAttempted) {
                return [
                    ...userAttempt,
                    {
                        optionId,
                        questionId: questionObj._id,
                        score: ((100 - progress) * pointsPerQuestion) / 100,
                        timeTaken: progress,
                    },
                ];
            }
            clearInterval(intervalId as NodeJS.Timeout);
            return userAttempt;
        });
        setAnimation("fade-out-down");
    };
    const handleStartprogress = () => {
        const idOfInterval = setInterval(() => {
            setProgress((progress) => {
                if (progress < 100) {
                    console.log("progess", progress);
                    return progress + 1;
                }
                clearInterval(intervalId as NodeJS.Timeout);
                setAnimation("fade-out-down");
                return progress;
            });
        }, Math.ceil(questionObj.time / 100));
        setIntervalId(idOfInterval);
    };

    console.log(intervalId);

    useEffect(() => {
        setProgress(0);
        handleStartprogress();
    }, []);

    useEffect(() => {
        if (animation === "fade-out-down") {
            const timeoutId = setTimeout(() => {
                setAnimation("fade-in-down");
                setCurrentQuestionIndex(
                    (currentQuestionIndex) => currentQuestionIndex + 1
                );
                setProgress(0);
                handleStartprogress();
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [animation]);
    return (
        <div className={`question ${animation}`}>
            <div className={`upper-question`}>
                <LinearProgress variant="determinate" value={progress} />
                <div className={`upper-question-bar`}>
                    <h2>
                        <Chip
                            label={`Question`}
                            variant="outlined"
                            avatar={
                                <Avatar color="secondary">
                                    {(currentQuestionIndex + 1).toString()}
                                </Avatar>
                            }
                        />
                    </h2>
                    <h2>
                        <Chip label={`${10} points`} variant="outlined" />
                    </h2>
                </div>
                <h1>{parse(questionObj.question)}</h1>
            </div>
            <ul className={`options`}>
                {questionObj.answers.map(({ _id, value }) => {
                    return (
                        <li className={`option`} key={_id}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    optionClickHandler(_id);
                                }}
                            >
                                {parse(value)}
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export function Question({ quizId }: { quizId: string }) {
    const { dataState, dataDispatch, setLoader } = useDataContext();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [userAttempt, setUserAttempt] = useState<UserAttemptType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (dataState && !dataState.quizData[0]) {
            fetchLeaderBoardData(dataDispatch, setLoader);
        }
    }, []);

    const topicQuiz = dataState?.quizData.find(
        (item) => item?._id === quizId
    )?.quiz;

    useEffect(() => {
        // after last question eding the quiz
        if (topicQuiz && topicQuiz.length === currentQuestionIndex) {
            navigate(`/result`, { state: { userAttempt, topicQuiz, quizId } });
        }
    }, [currentQuestionIndex]);

    return (
        <div className={`question-container`}>
            {dataState &&
            topicQuiz &&
            topicQuiz[currentQuestionIndex] &&
            dataState.quizData[0] ? (
                <SingleQuestion
                    questionObj={topicQuiz[currentQuestionIndex]}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    setUserAttempt={setUserAttempt}
                />
            ) : (
                ""
            )}
        </div>
    );
}
