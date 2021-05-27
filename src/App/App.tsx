import "./App.css";
import { AllRoutes } from "../Components";
import { useEffect } from "react";
import useDataContext from "../Context/DataContext/DataContext";
import { Loading } from "../Components/Loading/Loading";
import { fetchQuizData } from "./FetchFireBaseData";

function App() {
    const { dataState, dataDispatch, loader, setLoader } = useDataContext();
    useEffect(() => {
        if (dataState && !dataState.quizData[0]) {
            fetchQuizData(dataDispatch, setLoader);
        }
    }, []);
    return (
        <div className="App">
            {loader && <Loading />}
            <div className={`container`}>
                <AllRoutes />
            </div>
        </div>
    );
}

export default App;
