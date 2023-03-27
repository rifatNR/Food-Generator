import { BaseContext } from "@/context/BaseContext";
import Image from "next/image";
import { useContext } from "react";

interface PropType {
    isShow: boolean;
    index: number;
}

const RecepieCard = ({isShow, index} : PropType) => {

    const ctx = useContext(BaseContext)

    if(!ctx?.result != null) {
        // if(!ctx?.result[index]) return
        console.log("RecepieCard_" + index, ctx?.result && ctx?.result[index])
    }
    
    return (
        <button onClick={() => ctx?.setSelectedCardIndex(index)} className="relative h-[90px] w-[250px]">
             <div className={`
                    absolute top-0
                    ${isShow ?
                        `${ctx?.selected_card_index == index ? '-right-2' : '-right-6'}` 
                        : '-right-[300px]'
                    }
                    transition-all ease-out delay-500
                    h-full w-full rounded-l-3xl
                    ${ctx?.selected_card_index == index ? 
                        'bg-[#D14D4D] text-white'
                        : 'bg-white text-black'
                    }
                    shadow
                    grid grid-cols-12 gap-2 items-center px-5
                `}
             >
                <div className="static col-span-4 h-[55px] w-[55px] aspect-square overflow-hidden bg-gray-300 rounded-full border-2 border-white">
                    <Image
                        className="!static"
                        fill
                        src="https://spoonacular.com/recipeImages/782619-556x370.png"
                        alt="Food"
                        style={{objectFit:"cover"}}
                    />
                </div>
                <div className="col-span-8 font-semibold text-left">
                    AKSJHKAJL
                </div>
            </div>
        </button>
    );
}
 
export default RecepieCard;