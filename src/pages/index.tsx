import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MagicCircle from '@/components/MagicCircle'
import RecepieCardContainer from '@/components/RecepieCardContainer'
import { useContext } from 'react'
import { MyContext } from '@/context/ExampleContext'
import Input from '@/components/Input'
import { BaseContext } from '@/context/BaseContext'
import RecepieDetails from '@/components/RecepieDetails'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    
    const ctx = useContext(BaseContext)
    
    return (
        <div className='relative ml-[100px] pt-16 pb-5 grid-cols-12 gap-4 min-h-screen overflow-x-hidden'>
            <Head>
                <title>Food Generator</title>
            </Head>

            <div className=''>

                <div
                    className={`
                        flex items-center justify-center space-x-3
                        absolute left-[50%] transform-center
                        ${ctx?.error != null ? 'top-[50px]' : 'top-[-50px]'}
                        transition-all ease-out
                    `}
                >
                    <div className="font-semibold text-lg text-red-500">{ctx?.error}</div>
                </div>
                
                <div className='space-x-5'>
                    <span className='font-semibold'>Food</span>
                    <span className='bg-[#D14D4D] text-white px-4 rounded-full pb-1'>Generator</span>
                </div>

                {ctx?.app_state != "SHOWING_DETAILS" && (
                    <div className='text-4xl font-Serif-pro font-semibold mt-[100px] leading-[3rem]'>
                        Recepie Insights <br /> For Your Fridge
                    </div>
                )}

                {ctx?.app_state == "TAKE_INGREDIENTS" && (
                    <div className='w-[350px] pt-5'>
                        <div className='mb-2'>Input your available ingredients here:</div>
                        
                        {ctx.ingredients.map((ingredient, index) => (
                            <Input key={index} index={index} ingredient={ingredient}/>
                        ))}

                        <button onClick={() => ctx.addIngredientInput()} className='font-semibold text-white bg-[#D14D4D] w-full py-2 rounded-lg'>
                            Add More
                        </button>
                    </div>
                )}

                {ctx?.app_state == "SHOWING_DETAILS" && (
                    <RecepieDetails/>
                )}

                {ctx?.app_state == "DEFAULT" && (
                    <div className='w-[300px] mt-5 font-Serif-pro text-xl'>
                        Your one stop place
                        to find healthy mean inspiration
                        regardless of what you have,
                        We make cooking hassle free!
                    </div>
                )}
            </div>
            
            <div className='h-[400px] w-[400px] a-center'>
                <MagicCircle/>
            </div>

            <RecepieCardContainer/>

        
        </div>
    )
}
