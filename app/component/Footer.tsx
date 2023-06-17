import Link from 'next/link'
import React from 'react'

export default function Footer() {
   return (
      <footer className=" bg-gray-800 min-h-[100px] max-md:min-h-[200px] text-white flex gap-3 max-md:flex-col-reverse justify-center">
         <div className="flex flex-col gap-3 mx-auto">
            <div className="flex justify-center mt-4"><h2 className=" text-xl Fira-code">Get Me In</h2></div>
            <div className="flex justify-center h-fit gap-3">
               <Link className="relative p-1" href={`https://github.com/amieow`}><i className="fa-brands fa-github fa-xl transition-all duration-300 cursor-pointer hover:scale-125 text-sky-500 hover:text-red-400"></i></Link>
               <div className="bg-white bg-opacity-20 cursor-default transition-all hover:bg-slate-700 hover:bg-opacity-50 p-1">
                  <i className="fa-brands fa-discord fa-lg text-indigo-400"></i> amieow#0934
               </div>
            </div>
         </div>
      </footer>
   )
}
