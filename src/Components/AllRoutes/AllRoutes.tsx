import { Route, Routes } from "react-router";
import { Home, Quiz, Result } from "../../Routes";

export function AllRoutes() {
    return (
        <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/quiz/:quizId`} element={<Quiz />} />
            <Route path={`/result`} element={<Result />} />
        </Routes>
    );
}
