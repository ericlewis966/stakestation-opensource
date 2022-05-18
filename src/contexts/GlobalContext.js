import { createContext, useReducer, useContext } from "react";

const GlobalContext = createContext('');

const reducer = (state, pair) => ({ ...state, ...pair });

const initialState = {
    selectedChain: 56,
    publicViewMode: 1,
    internalViewMode: 2
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export const GlobalContextProvider = (props) => {
    const [state, update] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, update }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContext;