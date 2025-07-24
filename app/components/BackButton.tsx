'use client'
import Image from "next/image"
import BackArrow from "../assets/icons/left-arrow.svg"
import Link from "next/link"

export default function BackButton(){

    return (
        <Link href={'/'}>   
            <div className="p-2 w-fit bg-[#fff8b9] border-[1px] border-gray-900">
                <Image src={BackArrow} alt="뒤로가기" width={32} height={32}/>
            </div>
        </Link>
     
    )
}