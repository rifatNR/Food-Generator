import { BaseContext } from "@/context/BaseContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';


const MagicCircle = () => {

    const [startAnimation1, setStartAnimation1] = useState(false)
    const [startAnimation2, setStartAnimation2] = useState(false)
    const [startAnimation3, setStartAnimation3] = useState(false)
    const [startAnimation4, setStartAnimation4] = useState(false)

    useEffect(() => {
        setTimeout(() => setStartAnimation1(true), 1000);
        setTimeout(() => setStartAnimation2(true), 1200);
        setTimeout(() => setStartAnimation3(true), 1400);
        setTimeout(() => setStartAnimation4(true), 1700);
    }, [])

    const ctx = useContext(BaseContext)
    
    
    return (
        <div className="relative rounded-full aspect-square bg-gray-400 mx-10 mt-10">
            {/* <Image
                // width={500}
                // height={500}
                className="rounded-full"
                fill
                src="https://spoonacular.com/recipeImages/782619-556x370.png"
                alt="Food"
                style={{objectFit:"cover"}}
            /> */}

            <div className="a-center">
                <div className="custom-loader"></div>
            </div>


            <div className={`a-center ${startAnimation1 ? "rotate-[225deg]" : "rotate-0"} transition-all ease-out duration-500`}>
                <div className={`
                        absolute top-[156px] transform-center transition-all ease-out duration-500
                        rotate-[-225deg]
                        ${startAnimation1 ? "scale-100" : "scale-0"}
                        bg-[#D9772B] h-[90px] w-[90px] text-white border-2 border-white
                        rounded-full font-semibold grid-center
                    `}>
                    <span>Halal</span>
                </div>
            </div>

            <div className={`a-center ${startAnimation2 ? "rotate-[180deg]" : "rotate-0"} transition-all ease-out duration-500`}>
                <div className={`
                        absolute top-[156px] transform-center transition-all ease-out duration-500
                        rotate-[180deg]
                        ${startAnimation2 ? "scale-100" : "scale-0"}
                        bg-[#415E42] h-[90px] w-[90px] text-white border-2 border-white
                        rounded-full font-semibold grid-center
                    `}>
                    <span>Vegan</span>
                </div>
            </div>

            <div className={`a-center ${startAnimation3 ? "rotate-[135deg]" : "rotate-0"} transition-all ease-out duration-500`}>
                <div className={`
                        absolute top-[156px] transform-center transition-all ease-out duration-500
                        rotate-[225deg]
                        ${startAnimation3 ? "scale-100" : "scale-0"}
                        bg-[#EBAB16] h-[90px] w-[90px] text-white border-2 border-white
                        rounded-full font-semibold grid-center
                    `}>
                    <span>Supper</span>
                </div>
            </div>

            {ctx?.app_state == "DEFAULT" && (
                <button
                    onClick={() => ctx?.changeAppState("TAKE_INGREDIENTS")}
                    className={`
                        absolute bottom-[-30px] left-[50%] transform-center
                        bg-[#D14D4D] text-white
                        ${startAnimation4 ? "w-[250px]" : "w-[0px]"}
                        ${startAnimation4 ? "hover:scale-105" : ""}
                        ${startAnimation4 ? "active:scale-100" : ""}
                        py-4 rounded-2xl
                        whitespace-nowrap
                        text-lg text-center
                        transition-all ease-out duration-500
                    `}>
                    <span>
                        {startAnimation4 ? "Try Now" : ""}
                    </span>
                </button>
            )}

            {ctx?.app_state == "TAKE_INGREDIENTS" && (
                <button
                    onClick={() => ctx?.generateRecepie()}
                    className={`
                        absolute bottom-[-30px] left-[50%] transform-center
                        bg-[#D14D4D] text-white
                        w-[250px] hover:scale-105 active:scale-100
                        py-4 rounded-2xl
                        whitespace-nowrap
                        text-lg text-center
                        transition-all ease-out duration-500
                    `}>
                    <span>
                        Generate
                    </span>
                </button>
            )}


            <div className={`
                    flex items-center justify-center space-x-3
                    absolute bottom-[-60px] left-[50%] transform-center
                `}>  
                <div 
                    onClick={() => ctx?.NEXT()}
                    className={`
                        cursor-pointer flex items-center justify-center space-x-1
                        text-gray-400
                    `}
                >
                    <HiOutlineChevronLeft/>
                    <span className="text-sm">PREV</span>
                </div>
                <div className="w-[200px] h-0.5 bg-black rounded-full"/>
                <div 
                    onClick={() => ctx?.PREV()}
                    className={`
                        cursor-pointer flex items-center justify-center space-x-1
                        text-black
                    `}
                >
                    <span className="text-sm">NEXT</span>
                    <HiOutlineChevronRight/>
                </div>
            </div>

        </div>
    );
}
 
export default MagicCircle;