import { BaseContext } from "@/context/BaseContext";
import { useContext, useEffect, useState } from "react";
import RecepieCard from "./RecepieCard";

const RecepieCardContainer = () => {

    const ctx = useContext(BaseContext)

    useEffect(() => {
        setTimeout(() => ctx?.cardIntro(), 1700);
    }, [])
    
    
    return (
        <div className="absolute right-0 top-0 w-[500px] h-screen">
            <div className="relative flex flex-col space-y-10 h-full justify-center items-end">
                <RecepieCard index={1} isShow={ctx?.card_anim_index ? ctx.card_anim_index >= 1 : false}/>
                <RecepieCard index={2} isShow={ctx?.card_anim_index ? ctx.card_anim_index >= 2 : false}/>
                <RecepieCard index={3} isShow={ctx?.card_anim_index ? ctx.card_anim_index >= 3 : false}/>
            </div>
        </div>
    );
}

export default RecepieCardContainer;