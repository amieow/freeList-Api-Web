
import { useRef } from 'react';
import type { UrutanProps } from './type';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Urutan({ ModifyDatas, JumlahShow, pagination, setPagi,windowWidth }: UrutanProps) {
   const ButtonUrutan = ({ index, item,pagination,params }: { index: number; item: number; pagination : number;params : string }) => {
      if (pagination === item) {
         return (
            <div className="p-2 px-4 cursor-default text-white bg-red-400">
               {item}
            </div>
         )
      }
      return(
         <Link scroll onClick={() => setPagi(item)} href={`?${params}`} key={index} className={`p-2 px-4 disabled:cursor-not-allowed text-white bg-black bg-opacity-30`}>
            {item}
         </Link>
      )
   };
   const inputRef1 = useRef<HTMLInputElement>(null)
   const inputRef2 = useRef<HTMLInputElement>(null)
   const router = useRouter()

   const searchParams = useSearchParams()
   const QueryParams = new URLSearchParams(searchParams.toString())
   const PaginationNumber = ModifyDatas ? Array.from({length: Math.ceil(ModifyDatas.entries.length / JumlahShow)},(_, index) => index + 1) : []

   const setPage = (page : number) => {
      QueryParams.set('page', String(page));
      return String(QueryParams)
   }
   
   const item =
   PaginationNumber.length > 5
      ? pagination >= 3 && pagination <= PaginationNumber.length - 2
         ? PaginationNumber.slice(pagination - 3, pagination + 2).map((item, index) => {
            QueryParams.set('page',item.toString())
            const params = QueryParams.toString()
            return(
            <ButtonUrutan params={params} pagination={pagination} key={index} index={index} item={item} />
         )})
         : pagination < 3
         ? [1, 2, 3, 4, 5].map((item, index) => {
            QueryParams.set('page',item.toString())
            const params = QueryParams.toString()
            return(
            <ButtonUrutan params={params} pagination={pagination} key={index} index={index} item={item} />
         )})
         : pagination < PaginationNumber.length + 1
         ? PaginationNumber.slice(PaginationNumber.length - 5, PaginationNumber.length).map(
            (item, index) => {
               QueryParams.set('page',item.toString())
               const params = QueryParams.toString()
               return(
               <ButtonUrutan params={params} pagination={pagination} key={index} index={index} item={item} />
            )}
         )
         : null
      : PaginationNumber.map((item, index) => {
         QueryParams.set('page',item.toString())
         const params = QueryParams.toString()
         return(
         <ButtonUrutan params={params} pagination={pagination} key={index} index={index} item={item} />
         )
      }
   );
   const CustomPage = (value : string | undefined):void => {

      if (Number(value) != 0){
         QueryParams.set('page',String(Number(value) || 1))
         setPagi(Number(value))
         router.push(`?${String(QueryParams)}`)
      }
   }
   if(PaginationNumber.length > 1){
      return (
         <div className="flex flex-wrap bg-black bg-opacity-25 text-white p-2 gap-5 w-fit mx-auto justify-between ">
            { windowWidth > 500 &&  ((pagination > 1) ?<Link scroll href={`?${pagination == 1 ? String(searchParams) : setPage(pagination - 1)}`} onClick={() => setPagi(pagination - 1)}  className={`p-2 px-4 bg-green-500 `}>
               {'<'}
            </Link> : <div className='p-2 px-4 bg-green-500 bg-opacity-50 cursor-not-allowed'>{`<`}</div>)}
            <div className='gap-3 flex'>
               {(pagination >= 4 && PaginationNumber.length > 5 && windowWidth > 620) && <>
                  <Link scroll onClick={() => setPagi(1)} href={`?${setPage(1)}`} className=' p-2 px-4'>1</Link>
                  <form onSubmit={(e) => {
                     e.preventDefault()
                     CustomPage(inputRef1.current?.value);
                     if (inputRef1.current) {
                           inputRef1.current.value = '';
                        }}}>
                     <input min={1} maxLength={2} type='text' inputMode='numeric' ref={inputRef1} onFocus={() => inputRef1.current?.setAttribute('placeholder', '')} onBlur={() => {
                        if(inputRef1.current){
                           inputRef1.current.value = ''
                        }
                        inputRef1.current?.setAttribute('placeholder', '...')}} placeholder='...' className='p-2 bg-transparent px-1 w-10 text-center placeholder:text-white hover:appearance-none appearance-none'/>
                  </form>
               </>
               }
               <div className='flex '>
                  {item}
               </div>
               {(pagination <= PaginationNumber.length - 3 && PaginationNumber.length > 5 && windowWidth > 330) && 
               <> 
                  <form onSubmit={(e) => {
                     e.preventDefault()
                     CustomPage(inputRef2.current?.value)
                     if (inputRef2.current) {
                           inputRef2.current.value = '';
                        }
                     }}>
                     <input min={1} maxLength={2} type='text' ref={inputRef2} onFocus={() => inputRef2.current?.setAttribute('placeholder', '')} onBlur={() => {
                        if(inputRef2.current){
                           inputRef2.current.value = ''
                        }
                        inputRef2.current?.setAttribute('placeholder', '...')
                        
                        }} placeholder='...' className='p-2 bg-transparent px-1 w-10 text-center placeholder:text-white ' inputMode='numeric'/>
                  </form>
                  
                  <Link scroll href={`?${setPage(PaginationNumber.length)}`} onClick={() => setPagi(PaginationNumber.length)} className='p-2 px-4'>{PaginationNumber.length}</Link>
               </>}
            </div>
            {windowWidth > 500 && ((pagination < PaginationNumber.length) ? <Link href={`?${pagination == PaginationNumber.length ? String(searchParams) : setPage(pagination + 1)}`} onClick={() => {setPagi(pagination == PaginationNumber.length ? pagination : pagination + 1) ; QueryParams.set('page',(pagination + 1).toString())}} className={`p-2 px-4 bg-green-500 ${pagination == PaginationNumber.length && 'cursor-not-allowed bg-opacity-50'}`}>
               {`>`}
            </Link> : <div className='p-2 px-4 bg-green-500 bg-opacity-50 cursor-not-allowed'>{`>`}</div>)}
         </div>
      );
   }
   return null
   
}

