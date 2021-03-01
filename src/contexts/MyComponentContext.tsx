import { createContext, ReactNode } from "react";

interface MyComponentContextData {
    myVar: string,
    myFunc: () => void,
}

interface MyComponentProviderProps {
    children: ReactNode;
}

export const MyComponentContext = createContext({} as MyComponentContextData);

export function MyComponentProvider({ children }: MyComponentProviderProps) { 
    const myVar: string = "";
    function myFunc() {}

    return (
        <MyComponentContext.Provider value={
            {
                myVar,
                myFunc,
            }}>
            {children}
        </MyComponentContext.Provider>
    );
}