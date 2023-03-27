import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";


type AppStateType = "INTRO" |
                    "DEFAULT" |
                    "TAKE_INGREDIENTS" |
                    "SEARCHING" |
                    "SHOWING_RESULTS" |
                    "SHOWING_DETAILS" ;

interface RecepieDataType {
    id: number,
    title: string,
    image:string,
    imageType: string,
}
                    
interface BaseContextType {
    app_state: AppStateType;
    setAppState: Dispatch<SetStateAction<AppStateType>>;
    changeAppState: (state: AppStateType) => void;
    ingredients: string[];
    addIngredientInput: () => void;
    removeIngredientInput: (index: number) => void;
    generateRecepie: () => void;
    changeIngredient: (index: number, ingredient: string) => void;
    card_anim_index: number;
    setCardAnimIndex: Dispatch<SetStateAction<number>>;
    selected_card_index: number;
    setSelectedCardIndex: Dispatch<SetStateAction<number>>;
    cardIntro: () => void;
    cardOutro: () => void;
    NEXT: () => void;
    PREV: () => void;
    result: RecepieDataType[] | null,
    setResult: Dispatch<SetStateAction<RecepieDataType[] | null>>;
    recepie_card_data: RecepieDataType[] | null,
    setRecepieCardData: Dispatch<SetStateAction<RecepieDataType[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    recepie_details: any;
    setRecepieDetails: Dispatch<SetStateAction<any>>;
    getRecepieDetails: (id: number) => void;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    clearAll: () => void;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
}


export const BaseContext = createContext<BaseContextType | undefined>(undefined);

const BaseProvider = ({ children }: React.PropsWithChildren<{}>) => {

    // const API_KEY = "5409a07405b548f4942f69e706296e27"
    // const API_KEY = "b8f8c3cf183c42238dae5543e1caadbe"
    const API_KEY = "b9c53ab6edaa48a389be2ce6268d8ef7"
    // ! I really shouldn't put it here.
    
    const [app_state, setAppState] = useState<AppStateType>("DEFAULT");
  
    const [ingredients, setIngredients] = useState<string[]>(["onion", "bread", "butter"]);

    const [card_anim_index, setCardAnimIndex] = useState(0)

    const [selected_card_index, setSelectedCardIndex] = useState(1)

    const [result, setResult] = useState<RecepieDataType[] | null>(null)

    const [recepie_card_data, setRecepieCardData] = useState<RecepieDataType[]>([])

    const [recepie_details, setRecepieDetails] = useState<any>(null)

    const [page, setPage] = useState(1)

    const [error, setError] = useState<string | null>(null)


    const [loading, setLoading] = useState(false)

    const cardIntro = () => {
        setTimeout(() => setCardAnimIndex(1), 0);
        setTimeout(() => setCardAnimIndex(2), 200);
        setTimeout(() => setCardAnimIndex(3), 400);
    }
    const cardOutro = () => {
        setTimeout(() => setCardAnimIndex(2), 0);
        setTimeout(() => setCardAnimIndex(1), 200);
        setTimeout(() => setCardAnimIndex(0), 400);
    }

    const cardIntroWeird = () => {
        setTimeout(() => {
            if(result) {
                getRecepieDetails(result[0]?.id)
                console.log("recepie_card_data 0", result[0])
                setRecepieCardData(recepie_card_data => [...recepie_card_data, result[0]])
            }
            setCardAnimIndex(1)
        }, 0);
        setTimeout(() => {
            if(result) {
                console.log("recepie_card_data 1", result[1])
                setRecepieCardData(recepie_card_data => [...recepie_card_data, result[1]])
            }
            setCardAnimIndex(2)
        }, 200);
        setTimeout(() => {
            if(result) {
                console.log("recepie_card_data 2", result[2])
                setRecepieCardData(recepie_card_data => [...recepie_card_data, result[2]])
            }
            setCardAnimIndex(3)
        }, 400);
    }

    const NEXT = () => {
        setPage(page+1);
        cardOutro()
        setTimeout(() => cardIntro(), 1000);
    }
    const PREV = () => {
        if(page > 1) {
            setPage(page => page-1);
        }
        cardOutro()
        setTimeout(() => cardIntro(), 1000);
    }

    
    const changeAppState = (state: AppStateType) => {
        setAppState(state)

        if(state == "DEFAULT") cardIntro();
        if(state == "TAKE_INGREDIENTS") cardOutro();
    }

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
        if(ingredients.length <= 2) {
            // TODO: SHOW ERROR
            setError("Enter atleast 3 ingredients!")
            return
        }
        setLoading(true)
        setRecepieCardData([])
        cardOutro()
        
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeIngredients=${ingredients.toString()}&number=${3}&offset=${3*(page-1)}`)
            .then(response => response.json())
            .then(data => {
                if(data.code == 402) {
                    setError("API EXPIRED!")
                    return
                }
                setResult(data.results)
                console.log("data", data)
                setTimeout(() => cardIntroWeird(), 1000);
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setError(error.message)
            });
    }

    const getRecepieDetails = (id = 0) => {
        setLoading(true)

        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                if(data.code == 402) {
                    setError("API EXPIRED!")
                    return
                }
                setRecepieDetails(data)
                console.log("Recepie Details", data)
                setLoading(false)
                setAppState("SHOWING_DETAILS")
            })
            .catch(error => {
                console.error(error)
                setError(error.message)
            });
    }

    const clearAll = () => {
        cardOutro()
        setIngredients([])
        setResult(null)
        setRecepieCardData([])
        setRecepieDetails(null)
        setAppState("DEFAULT")
        setPage(1)
        setSelectedCardIndex(1)
    }


    useEffect(() => {
        if(app_state == "TAKE_INGREDIENTS" && ingredients.length == 0) {
            addIngredientInput()
        }
    }, [app_state])

    useEffect(() => {
        console.log(ingredients)
        if(app_state == "TAKE_INGREDIENTS" && ingredients.length == 0) {
            changeAppState("DEFAULT")
        }
    }, [ingredients])

    useEffect(() => {
        generateRecepie()
    }, [page])

    useEffect(() => {
        console.log("recepie_card_data", recepie_card_data)
    }, [recepie_card_data])

    useEffect(() => {
        if(recepie_card_data.length > 0) {
            getRecepieDetails(recepie_card_data[selected_card_index-1]?.id)
        }
    }, [selected_card_index])


    useEffect(() => {
        console.log(error);

        const delayDebounceFn = setTimeout(() => {
            setError(null)
        }, 3000);

        return () => clearTimeout(delayDebounceFn);
    }, [error]);
    

    return (
      <BaseContext.Provider value={{
            app_state,
            setAppState,
            changeAppState,
            ingredients,
            addIngredientInput,
            removeIngredientInput,
            generateRecepie,
            changeIngredient,
            card_anim_index,
            setCardAnimIndex,
            selected_card_index,
            setSelectedCardIndex,
            cardIntro,
            cardOutro,
            NEXT,
            PREV,
            result,
            setResult,
            recepie_card_data,
            setRecepieCardData,
            recepie_details,
            setRecepieDetails,
            loading,
            setLoading,
            getRecepieDetails,
            page,
            setPage,
            clearAll,
            error,
            setError,
        }}>
        {children}
      </BaseContext.Provider>
    );
};

export default BaseProvider




// https://api.spoonacular.com/recipes/complexSearch?apiKey=b8f8c3cf183c42238dae5543e1caadbe&includeIngredients=bread,cheez,eggs
// https://api.spoonacular.com/recipes/782619/information?apiKey=b8f8c3cf183c42238dae5543e1caadbe