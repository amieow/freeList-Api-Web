import { boxSingledata } from './type';
import { HttpsStatus } from './ComponentKecil';
import Link from 'next/link';

export default function BoxSingledata({ data1, index, isFilter,showBanner }: boxSingledata) {
   if (!data1) {
      return null; // Tambahkan penanganan jika data1 adalah undefined
   }
   return (
      <>
         <div className="flex justify-between px-2 border-b-2 border-gray-300">
            <div className="flex gap-3">
               <p>{index + 1}.</p>
               <p className="font-bold ">{data1.API}</p>
            </div>
            <div className="flex justify-around ">
               <div
                  className={`p-1 ${ data1.HTTPS && " text-slate-300 bg-opacity-80 "} mr-1 flex gap-1 flex-shrink-0 h-fit rounded-lg`}>
                  {data1.HTTPS ? ( <HttpsStatus showBanner={showBanner} isTrue={true} />) : (<HttpsStatus showBanner={showBanner} isTrue={false} />)}
               </div>
            </div>
         </div>
         <div className="flex flex-col gap-2 mt-3 text-gray-200 h-full">
            <p className='px-2'>{data1.Description}</p>
            <div className='mt-auto px-2 transition-all flex gap-2 bg-slate-600 group-hover:bg-gray-800 group-hover:bg-opacity-50 dark:bg-gray-800 dark:group-hover:bg-gray-700 dark:bg-opacity-40 dark:group-hover:bg-opacity-90 bg-opacity-70'>
               <p>Category :</p>
               <p className={` ${isFilter ? " bg-white bg-opacity-10 font-semibold text-cyan-400 w-fit px-2 " : ""} `}>
               {data1.Category}
            </p>
            </div>
         </div>
         <div className="">
            <Link className='p-2 border-t-2 flex text-lg justify-center transition-all bg-teal-500 bg-opacity-70 hover:bg-opacity-40 dark:bg-teal-800 dark:hover:bg-teal-600 dark:group-hover:bg-opacity-80 dark:group-hover:text-yellow-500' target='_blank' href={data1.Link}>Direct me</Link>
         </div>
      </>
   )
}
