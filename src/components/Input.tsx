import { useState } from "react";

const Input = () => {

    const [isFocussed, setIsFocussed] = useState(false)
    const [text, setText] = useState("")
    
    return (
        <div className="py-5">
            <div className="relative w-[350px] h-[40px]">
                {/* <div className="absolute  bg-white text-gray-400 text-[10px] px-1">
                    Ingredient
                </div> */}
                <div className={`
                        absolute
                        ${isFocussed || text != "" ? '-top-2 left-2 text-[10px]' : 'top-1/2 left-2 -translate-y-1/2 text-[13px]'}
                        transition-all ease-out duration-200
                        bg-white text-gray-400 px-1 rounded-full
                `}>
                    Ingredient
                </div>
                <input
                    onFocus={() => setIsFocussed(true)}
                    onBlur={() => setIsFocussed(false)}
                    onChange={(e) => {setText(e.target.value)}}
                    className="border border-gray-600 h-full w-full rounded-lg px-3 outline-none"
                    // placeholder="..."
                />
            </div>
        </div>
    );
}
 
export default Input;