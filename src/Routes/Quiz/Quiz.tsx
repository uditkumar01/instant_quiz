import { useParams } from "react-router";
import { Navbar, Question } from "../../Components";

export function Quiz() {
    const { quizId } = useParams();
    return (
        <>
            <Navbar />
            <Question quizId={quizId}/>
        </>
    );
}
