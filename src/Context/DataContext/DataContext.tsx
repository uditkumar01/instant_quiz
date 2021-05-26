import {
    createContext,
    ReactNode,
    useContext,
    useReducer,
    useState,
} from "react";
import { dataReducer } from "../../Reducer/DataReducer/DataReducer";
import { DataContextValue, InitialStateType } from "./DataContext.types";

const DataContext = createContext<DataContextValue>({} as DataContextValue);

export function DataProvider({ children }: { children: ReactNode }) {
    const initialState: InitialStateType = {
        quizData: [],
        leaderBoardData: [],
    };
    const [loader, setLoader] = useState<boolean>(true);
    const [dataState, dataDispatch] = useReducer(dataReducer, initialState);
    return (
        <DataContext.Provider
            value={{
                dataState,
                dataDispatch,
                loader,
                setLoader,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export default function useDataContext() {
    return useContext(DataContext) as DataContextValue;
}
