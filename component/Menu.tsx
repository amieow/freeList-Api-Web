import Link from 'next/link'
import type { MenuProps } from './type';

export default function Menu({showDesc,setShowDesc,truncateString , data} : MenuProps) {
   return (
 <div className='z-10'>
        <h1 className="text-white text-center text-4xl mb-10 pt-5 Fira-code">Free API List</h1>
            <div className="flex flex-col mx-3 bg-white bg-opacity-20 divide-y-2 divide-gray-600">
                <div className="text-white flex flex-col p-2 pt-0  md:flex-row">
                <div className="h-full w-full max-w-[100px] md:mr-3">
                    <p className={``}>Desc : <span onClick={() => setShowDesc(!showDesc)} className={` z-20 underline cursor-pointer ${showDesc ? ' text-yellow-500' : 'text-green-200'}`}>{showDesc ? 'Hidden' : 'Show'}</span></p>
                </div>
                <div className={`text-gray-200 ${!showDesc ? 'hidden' : ''}`}>
                    <p>Free APIs, or Application Programming Interfaces, are publicly available services that provide developers with a way to access and utilize certain functionalities or data in their applications without any cost. These APIs are offered by various providers and cover a wide range of categories, such as weather, geolocation, finance, social media, and more.</p>        
                </div>
                </div>
                <div className="text-white border-b-[1px] border-gray-600">
                <div className="p-2">
                    <p>Api : <Link target="_blank" className=" text-blue-300 underline" href={'https://api.publicapis.org/entries'}><span className=" max-[310px]:hidden">https://api.publicapis.org/entries</span><span className=" min-[310px]:hidden">{truncateString('https://api.publicapis.org/entries',20)}</span></Link></p>
                </div>
                </div>
                <div className="text-white">
                <div className="p-2">
                    <p>Api Docs : <Link target="_blank" className=" text-blue-300 underline" href={`https://api.publicapis.org`}>https://api.publicapis.org</Link></p>
                </div>
                </div>
                <div className="text-white">
                <div className="p-2">
                    <p>amount of data : {data ? data.count : (<span onClick={() => location.reload()} className="text-yellow-300 cursor-pointer">Loading.. <i className="fa-solid fa-arrows-rotate"></i></span>)}</p>
                </div>
                </div>
            </div>
        </div> 
   )
}
