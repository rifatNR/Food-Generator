import React, { createContext, ReactNode, useState } from "react";


interface MyContextType {
    text: string;
    setText: (value: string) => void;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

const MyProvider = ({ children }: React.PropsWithChildren<{}>) => {

    const [text, setText] = useState('Hello, world!');

    return (
      <MyContext.Provider value={{
            text,
            setText,
        }}>
        {children}
      </MyContext.Provider>
    );
};

export default MyProvider