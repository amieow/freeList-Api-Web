import React from 'react'
type LoadingSingles = {
    index : number
}
export default function LoadingSingle({index} : LoadingSingles) {
  return (
    <>
    <div className="flex justify-between px-2  border-b-2 border-gray-300">
        <div className="flex  justify-center gap-3 p-1">
            <p>{index + 1}</p>
            <div className='max-h-[24px] animate-pulse flex justify-center w-44 bg-gray-300'></div>
        </div>
        <div className="flex animate-pulse justify-around w-[65%] max-[390px]:w-fit max-[520px]:w-[200px]">
            <div className="hidden min-[520px]:block min-[520px]:p-1">
                <p className='min-h-[24px] w-20 bg-gray-200'></p>
            </div>
            <div className="flex-shrink-0 hidden min-[390px]:block min-[390px]:p-1">
                <p className='min-h-[24px] w-14 bg-gray-200'></p>
            </div>
            <div className={`p-1  flex flex-shrink-0 h-fit rounded-lg`}>
                <p className='min-h-[24px] w-16 bg-gray-200'></p>
            </div>
        </div>
        </div>
        <div className="flex flex-col gap-2 my-3 text-gray-200 px-2">
            <div className='min-h-[1rem] animate-pulse flex justify-center w-44 bg-gray-300'></div>
            <div className='min-h-[1rem] animate-pulse flex justify-center w-44 bg-gray-300'></div>
        </div>
        <div className=" border-t-2 flex gap-2 bg-teal-600 bg-opacity-70 px-2 rounded-br-2xl">
            <p className="py-1 my-1 flex flex-shrink-0">Category : </p>
            <div className="p-1 my-1 px-3 text-indigo-300 bg-opacity-90 w-fit h-fit rounded-xl">
                <div className='min-h-[24px] animate-pulse flex justify-center w-20 bg-gray-300'></div>
            </div>
        </div>
    </>
  )
}
