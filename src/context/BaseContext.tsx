import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";


type AppStateType = "INTRO" | "DEFAULT" | "TAKE_INGREDIENTS" | "SHOW_RESULTS"
interface BaseContextType {
    app_state: AppStateType;
    setAppState: Dispatch<SetStateAction<AppStateType>>;
    ingredients: string[];
    addIngredientInput: () => void;
    removeIngredientInput: (index: number) => void;
    generateRecepie: () => void;
    changeIngredient: (index: number, ingredient: string) => void;
}


export const BaseContext = createContext<BaseContextType | undefined>(undefined);

const BaseProvider = ({ children }: React.PropsWithChildren<{}>) => {

    const API_KEY = "b8f8c3cf183c42238dae5543e1caadbe"
    // ! I really shouldn't put it here.
    
    const [app_state, setAppState] = useState<AppStateType>("DEFAULT");
  
    const [ingredients, setIngredients] = useState<string[]>([]);

    const addIngredientInput = () => {
        setIngredients([...ingredients, ""])
    }
    const removeIngredientInput = (p_index: number) => {
        setIngredients(ingredients.filter((ingredient, index) => p_index == index ? false : true))
    }
    const changeIngredient = (p_index: number, value: string) => {
        setIngredients(ingredients.map((ingredient, index) => p_index == index ? value : ingredient))
    }

    const generateRecepie = () => {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeIngredients=bread,cheez,eggs`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
      
    }


    useEffect(() => {
        if(app_state == "TAKE_INGREDIENTS" && ingredients.length == 0) {
            addIngredientInput()
        }
    }, [app_state])

    useEffect(() => {
        console.log(ingredients)
        if(app_state == "TAKE_INGREDIENTS" && ingredients.length == 0) {
            setAppState("DEFAULT")
        }
    }, [ingredients])
    

    return (
      <BaseContext.Provider value={{
            app_state,
            setAppState,
            ingredients,
            addIngredientInput,
            removeIngredientInput,
            generateRecepie,
            changeIngredient,
        }}>
        {children}
      </BaseContext.Provider>
    );
};

export default BaseProvider