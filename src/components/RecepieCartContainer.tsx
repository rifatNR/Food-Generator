import RecepieCart from "./RecepieCart";

const RecepieCartContainer = () => {
    return (
        <div className="absolute right-0 top-0 w-[500px] h-screen">
            <div className="relative flex flex-col space-y-10 h-full justify-center items-end">
                <RecepieCart/>
                <RecepieCart/>
                <RecepieCart/>
            </div>
        </div>
    );
}

export default RecepieCartContainer;