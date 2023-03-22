import { BaseContext } from "@/context/BaseContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface PropType {
    index: number,
    ingredient: string,
}

const Input = ({ingredient, index} : PropType) => {

    const [isFocussed, setIsFocussed] = useState(false)
    const [text, setText] = useState("")

    const ctx = useContext(BaseContext)

    useEffect(() => {
        setText(ingredient)
    }, [ingredient])

    const changeText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        ctx?.changeIngredient(index, e.target.value)
    }
    
    
    return (
        <div className="pb-5">
            <div className="relative h-[40px]">
                <div className={`
                        pointer-events-none
                        absolute
                        ${isFocussed || text != "" ? '-top-2 left-2 text-[10px]' : 'top-1/2 left-2 -translate-y-1/2 text-[13px]'}
                        transition-all ease-out duration-200
                        bg-white text-gray-400 px-1 rounded-full pb-1
                `}>
                    Ingredient
                </div>
                <input
                    onFocus={() => setIsFocussed(true)}
                    onBlur={() => setIsFocussed(false)}
                    onChange={(e) => {changeText(e)}}
                    value={text}
                    className="border border-gray-600 h-full w-full rounded-lg px-3 outline-none"
                />
                <RxCross2
                    onClick={() => ctx?.removeIngredientInput(index)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 font-bold text-xl cursor-pointer"
                />
            </div>
        </div>
    );
}

export default Input;