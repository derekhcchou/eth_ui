import {mergeWith} from "lodash";
import {customizer} from "./AppContext";

export const setSessionObject = (key: string, value: any, original?: any) =>{
    sessionStorage.setItem(
        key,
        JSON.stringify(
            original?{...mergeWith({}, original, value, customizer)}:value
        )
    );
};

export const getSessionObject = (key: string) => {
    return JSON.parse(sessionStorage.getItem(key) || "{}");
}

export const initializeContextFromSessionStorage = () =>{
    return {
        userData: getSessionObject("userData"),
        gameInfo: getSessionObject("gameInfo"),
    }
}

export const resetSessionStorage = () =>{
       setSessionObject("userData", {});
       setSessionObject("gameInfo", []);
}