import React, { useReducer } from 'react'

let reducer = (state, action) => {
    switch (action.type) {
        case "updatejson":
            return { ...state, json: action.json };
        default:
            return;
    }
};
const initialState = { json: undefined }
const CounterContext = React.createContext(initialState);
function CounterProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CounterContext.Provider>
    );
}
export { CounterContext, CounterProvider };