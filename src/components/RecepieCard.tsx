import { BaseContext } from "@/context/BaseContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

interface PropType {
    isShow: boolean;
    index: number;
}

const RecepieCard = ({isShow, index} : PropType) => {

    const [show, setShow] = useState(false)
    const [image, setImage] = useState("https://spoonacular.com/recipeImages/666225-312x231.jpg")
    const [title, setTitle] = useState("---")
    
    const ctx = useContext(BaseContext)

    // if(!ctx?.recepie_card_data) return <></>
    // if(!ctx?.recepie_card_data[index-1]) return <></>

    // console.log(ctx?.recepie_card_data[index-1])

    useEffect(() => {
        if(ctx?.recepie_card_data) {
            if(ctx?.recepie_card_data[index-1]) {
                setImage(ctx?.recepie_card_data[index-1].image ?? "https://spoonacular.com/recipeImages/666225-312x231.jpg")
                setTitle(ctx?.recepie_card_data[index-1].title ?? "---")
            } else {
                setShow(false)
            }
        } else {
            setShow(false)
        }
    }, [ctx?.recepie_card_data])

    useEffect(() => {
        setShow(isShow)
    }, [isShow])
    
    
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
                        src={image ?? "https://spoonacular.com/recipeImages/666225-312x231.jpg"}
                        alt="Food"
                        style={{objectFit:"cover"}}
                    />
                </div>
                <div className="col-span-8 font-semibold text-left truncate">
                    {title}
                </div>
            </div>
        </button>
    );
}
 
export default RecepieCard;