import React, { createContext, ReactNode, useState } from "react";


interface BaseContextType {

}

export const BaseContext = createContext<BaseContextType | undefined>(undefined);

const BaseProvider = ({ children }: React.PropsWithChildren<{}>) => {

    const [text, setText] = useState('Hello, world!');

    return (
      <BaseContext.Provider value={{
            
        }}>
        {children}
      </BaseContext.Provider>
    );
};

export default BaseProvider