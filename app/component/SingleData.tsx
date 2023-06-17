
import type {SingleDataProps} from './type'
import Link from 'next/link';
import LoadingSingle from './LoadingSingle';
import { HttpsStatus } from './ComponentKecil';
import BoxSingledata from './boxSingledata';

export default function SingleData({data1 , index, displayedText , Loading,isFilter,showBanner} : SingleDataProps) {
    const tampilanSingle = data1 ? (
        <>
            <div className="flex justify-between px-2 border-b-2 border-gray-300">
                <div className="flex gap-3">
                    <p>{index + 1}.</p>
                    <p className="font-bold max-w-[150px]">{data1.API}</p>
                </div>
                <div className="flex justify-around w-[65%] max-[390px]:w-fit max-[520px]:w-[200px]">
                    <div className="hidden min-[520px]:block min-[520px]:p-1">
                        <p>Cors: {data1.Cors}</p>
                    </div>
                    <div className="flex-shrink-0 hidden min-[390px]:block min-[390px]:p-1">
                        <p>Auth: {data1.Auth === '' ? 'Unknow' : data1.Auth}</p>
                    </div>
                    <div className={`p-1 ${data1.HTTPS ? 'bg-emerald-600' : 'bg-red-600 text-slate-300 bg-opacity-80 '} mr-1 flex gap-1 flex-shrink-0 h-fit rounded-lg`}>
                        <p className="">Https: </p>
                        {data1.HTTPS ? <HttpsStatus showBanner={showBanner} isTrue={true}/> : <HttpsStatus showBanner={showBanner} isTrue={false}/>}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 my-3 text-gray-200 px-2">
                <p>Desc: {data1.Description}</p>
                <p>Api: <Link target="_blank" className=" text-white underline font-semibold" href={data1.Link}>{displayedText}</Link></p>
            </div>
            <div className="border-t-2 flex gap-2 bg-teal-600 bg-opacity-70 px-2 rounded-br-2xl">
                <p className="py-1 my-1 flex flex-shrink-0">Category: </p>
                <div className={`p-1 my-1 relative px-3 text-indigo-300 bg-opacity-90 w-fit h-fit rounded-xl ${isFilter && 'text-white'}`}>
                    <p className={`${isFilter ? 'text-black bg-[#ff8946] ' : ''}`} >{data1.Category}</p>
                </div>
            </div>
        </>
    ) : null;
    if (Loading) {
        return (
            <li key={index} className={`p-2 pb-0 px-0 transition-all flex flex-col relative bg-slate-400 bg-opacity-50 rounded-2xl rounded-bl-none group hover:bg-opacity-50 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-slate-400 dark:hover:bg-opacity-50 ${!showBanner && ' w-[350px] min-h-[180px] bg-gray-300 bg-opacity-50 hover:bg-opacity-50 hover:bg-gray-600 rounded-b-none'}`}>
                {showBanner ? tampilanSingle : <BoxSingledata showBanner={showBanner} data1={data1} index={index} isFilter={isFilter}/>}
            </li>
        );
    }
    return (
        <li key={index} className="p-2 pb-0 px-0  flex flex-col relative bg-slate-400 bg-opacity-50 jusitfy-between rounded-2xl rounded-b-none">
            {!data1 &&  <LoadingSingle index={index}/>}
        </li>
    );
}
