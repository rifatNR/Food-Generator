import { BaseContext } from "@/context/BaseContext";
import { useContext } from "react";

const RecepieDetails = () => {
    const ctx = useContext(BaseContext)

    return (
        <div>
            <div className='text-4xl font-Serif-pro font-semibold mt-[20px] mb-3 leading-[3rem]'>Steps</div>
            <div className="bg-white shadow rounded-l-xl rounded-r-md h-[200px] w-[450px] px-5 py-3 overflow-y-scroll">
                {ctx?.recepie_details ? (
                    <>
                        <div className="font-semibold text-lg">Summary:</div>
                        <p dangerouslySetInnerHTML={{ __html: ctx?.recepie_details?.summary }}></p>
                        <br />
                        <div className="font-semibold text-lg">Instructions:</div>
                        <p dangerouslySetInnerHTML={{ __html: ctx?.recepie_details?.instructions }}></p>
                    </>
                ) : ''}
            </div>
            <div className='text-4xl font-Serif-pro font-semibold mt-[20px] mb-3 leading-[3rem]'>Ingredients</div>
            <div className="bg-white shadow rounded-l-xl h-[200px] w-[450px] px-8 py-3 overflow-y-scroll">
                <ol className="list-disc">
                    {ctx?.recepie_details?.extendedIngredients?.map((item: any) => (
                        <li key={item.id}>
                            <span className="capitalize">{item.name}</span> - {item.amount} {item.unit}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
 
export default RecepieDetails;