import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MagicCircle from '@/components/MagicCircle'
import RecepieCartContainer from '@/components/RecepieCartContainer'
import { useContext } from 'react'
import { MyContext } from '@/context/ExampleContext'
import Input from '@/components/Input'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    
    return (
        <div className='relative ml-[100px] pt-16 pb-5 grid-cols-12 gap-4 min-h-screen overflow-x-hidden'>
            <Head>
                <title>Food Generator</title>
            </Head>

            <div className=''>
                <div className='space-x-5'>
                    <span className='font-semibold'>Food</span>
                    <span className='bg-[#D14D4D] text-white px-4 rounded-full pb-1'>Generator</span>
                </div>

                <div className='text-4xl font-Serif-pro font-semibold mt-[100px] leading-[3rem]'>
                    Recepie Insights <br /> For Your Fridge
                </div>

                <div>
                    <Input/>
                </div>

                <div className='w-[300px] mt-5 font-Serif-pro text-xl'>
                    Your one stop place
                    to find healthy mean inspiration
                    regardless of what you have,
                    We make cooking hassle free!
                </div>
            </div>
            
            <div className='h-[400px] w-[400px] a-center'>
                <MagicCircle/>
            </div>

            <RecepieCartContainer/>

        
        </div>
    )
}
