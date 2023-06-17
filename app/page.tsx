'use client'
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Filter, HttpsConfig, JsonDataType,TemporaryConfig,categoriess} from './component/type'
import SingleData from "./component/SingleData";
import Urutan from "./component/Urutan";
import Menu from "./component/Menu";
import { useSearchParams,useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NightMode, RandomingButton } from "./component/ComponentKecil";
import Footer from "./component/Footer";
const FilterMenu = dynamic(() => import('./component/FilterMenu'), {suspense : true})
export default function Home() {
   const router = useRouter()
   const searchParams = useSearchParams()
   const [isNightMode,setIsNightMode] = useState(false)
   const [hideElement, setHideElement] = useState(true);
   const [data, setData] = useState<JsonDataType | null>(null);
   const [ModifyData,setModify] = useState<JsonDataType | null>(null)
   const [category,setCategory] = useState<categoriess | null>(null)
   const [isFilter,setIsFilter] = useState<boolean>(searchParams.has('category') || false)
   const [showDesc , setShowDesc] = useState<boolean>(false)
   const [showFilter,setShowFilter] = useState<boolean>(false)
   const [search,setSearch] = useState(searchParams.get('search') || "")
   const [ShowBanner , setShowBanner] = useState(true)
   const [pagination,setPagi] = useState(Number(searchParams.get('page')) || 1);
   const [windowWidth, setWindowWidth] = useState(0);
   const [loading,setLoading] = useState(false)
   const [JumlahShow,setJumlah] = useState(() => {
      if (Number(searchParams.get('show')) >= 200) {
         return 200
      }else if (Number(searchParams.get('show')) >= 100) {
         return 100
      }else if (Number(searchParams.get('show')) >= 50) {
         return 50
      }else {
         return 20
      }
   })
   const [filter, setFilter] = useState<Filter>({
      Https: ['all', 'no', 'yes'].includes(searchParams.get('Https') ?? '') ? (searchParams.get('Https') as HttpsConfig) ?? 'all' : 'all',
      category: searchParams.getAll('category') || [],
      });

   const [temporaryConfig, setTemporary] = useState<TemporaryConfig>({
      Https: filter.Https, 
      JumlahShow: JumlahShow,
      category: filter.category
   });
   useEffect(() => {
      setWindowWidth(window.innerWidth)
      if (isNightMode) {
         document.documentElement.classList.add('dark')
         } else {
         document.documentElement.classList.remove('dark')
      }
   },[isNightMode])
   
   const handleResize = () => {
      setWindowWidth(window.innerWidth);
   };
   const FilterSearch = useCallback((datas: JsonDataType | null) => {
      if (datas) {
         const Searched = datas.entries.filter((item) => {
            const lower = item.API.toLowerCase();
            return (
               (filter.category.length === 0 ||
               filter.category.includes(item.Category)) &&
               lower.includes(search.toLowerCase())
            );
         })
         setModify((prevModify) => ({
            ...prevModify,
            count: Searched.length,
            entries: Searched,
         }));
      };
   },[filter.category, search])


   const stickyElementRef = useRef<HTMLUListElement>(null);
   const [isSticky, setIsSticky] = useState<boolean>(false);

   useEffect(() => {
      const handleScroll = () => {
         const stickyElement = stickyElementRef.current;
         if (stickyElement) {
            const { top } = stickyElement.getBoundingClientRect();
            setIsSticky(top <= 2);
         }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const randomizeData = () => {
      if (ModifyData && ModifyData.entries) {
         try {
            const randomizedEntries = [...ModifyData.entries].sort(() => Math.random() - 0.5);
            setModify({ ...ModifyData, entries: randomizedEntries });
         } catch (e) {
            console.log(e);
         } 
      }
   };

   const FilterModifydata = useCallback((inFilter: boolean, datas: JsonDataType | null) => {
      const changedModifyData = inFilter
         ? data?.entries.filter((item) => {
            const categoryMatch = temporaryConfig.category.length > 0 ? temporaryConfig.category.includes(item.Category) : true;
            const httpsMatch = temporaryConfig.Https === 'all' || ((temporaryConfig.Https === 'no' && item.HTTPS === false) || (temporaryConfig.Https === 'yes' && item.HTTPS === true));
            return categoryMatch && httpsMatch;
         })
         : datas?.entries.filter((item) => {
            const categoryMatch = filter.category.length > 0 ? filter.category.includes(item.Category): true
            const httpsMatch = filter.Https === 'all' || ((filter.Https === 'no' && item.HTTPS === false) || (filter.Https === 'yes' && item.HTTPS === true));
            return categoryMatch && httpsMatch;
         });
      const toChanged : JsonDataType = {
         count : changedModifyData?.length || 0,
         entries : changedModifyData || []
      }
      if (search.length > 0) {
         FilterSearch(toChanged);
      } else {
         setModify({
            count: changedModifyData?.length || 0,
            entries: changedModifyData || [],
         });
      }
   },[data?.entries, search.length, temporaryConfig.category, temporaryConfig.Https, filter.category, filter.Https, FilterSearch])
   const autoCustomText = (str: string) => {
      let linkText;
      switch (true) {
         case windowWidth >= 600:
            linkText = str;
            break;
         case windowWidth >= 500:
            linkText = truncateString(str, 50);
            break;
         case windowWidth >= 350:
            linkText = truncateString(str, 34);
            break;
         case windowWidth >= 270:
            linkText = truncateString(str, 25);
            break;
         default:
            linkText = truncateString(str, 15);
      }
      return linkText;
   };
   const truncateString = (str : string,maxNumber : number) => {
      if ( str.length - 4 <= maxNumber) {
         return str;
      }
      return str.slice(0, maxNumber) + "...";
   };
   
   const handleSubmit = async () => {
      setShowFilter(!showFilter);
      setSearch('')
      setJumlah(temporaryConfig.JumlahShow);
      setFilter((prev) => ({
         ...prev,
         category: temporaryConfig.category,
         Https: temporaryConfig.Https,
      }));
      setPagi(1);
      
      setIsFilter(temporaryConfig.category.length > 0);
      await new Promise((resolve) => setTimeout(resolve, 0)); 

      if (temporaryConfig.category.length > 0 ) {
         FilterModifydata(true, data);
         setIsFilter(true);
      } else if (temporaryConfig.Https != 'all'){
         FilterModifydata(true, data);
         setIsFilter(true);
      } else {
         setModify(data);
      }
   };

   useEffect(() => {
      if (showFilter) {
         setHideElement(false);
      } else {
         const timer = setTimeout(() => {
            setHideElement(true);
         }, 800);
         return () => clearTimeout(timer);
      }
      if (filter.category.length > 0 || filter.Https !== 'all' || search.length > 0) {
         FilterModifydata(false, data);
      } else {
         setModify(data);
      }
   }, [showFilter, temporaryConfig, filter, data, setHideElement, FilterModifydata,search.length]);

   const handleDelete = (item: string) => {
      setPagi(1)
      const filtered = filter.category.filter((items) => items !== item);
      if (filtered.length == 0){
         setIsFilter(false)
      }
      setFilter((prevFilter) => ({
         ...prevFilter,
         category: filtered,
      }));
      setTemporary((prev) => ({
         ...prev,
         category: filtered,
      }));
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await fetch('https://api.publicapis.org/entries');
            if (!res.ok) {
               throw new Error('Failed to fetch data');
            }
            const jsonData: JsonDataType = await res.json();
            setData(jsonData);
            setLoading(true);
         } catch (error) {
            console.log(error);
         }
      };

      if (!data) {
         fetchData();
      }
      if (filter.category.length > 0 || filter.Https !== 'all' || search.length > 0) {
         FilterModifydata(false, data);
      } else {
         setModify(data);
      }
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, [data, filter, FilterModifydata,search.length]);
   const onSearch = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();

      if (data) {
         FilterSearch(data)
         const params = new URLSearchParams(searchParams.toString())
         if (search.length > 0){
            params.set('search',search)
            setPagi(1)
            params.set('page','1')
            router.push(`?${params.toString()}`)
            return;
         }

         router.push(`?${params.toString()}`)
      }
   };

   const newData = Array.from({ length: JumlahShow }, (_, index) => {
      const newIndex = index + (pagination - 1) * JumlahShow;
      const vdata = ModifyData?.entries[newIndex];
      const displayedText = vdata ? autoCustomText(vdata.Link) : "";

      return loading && (newIndex >= (ModifyData?.entries.length || 0) || !ModifyData?.entries) ? null : (
         <SingleData isFilter={isFilter} data1={vdata} key={index} index={newIndex} displayedText={displayedText} Loading={loading} showBanner={ShowBanner} />
      );
   });
   
   const filteredData = (ModifyData && Math.ceil(ModifyData.entries.length / JumlahShow) >= pagination) ? (loading ? newData : newData.filter((item) => item !== null)) : (loading ? (<div className="bg-black bg-opacity-50 flex text-center p-4">
      <p className="mx-auto text-yellow-300 text-xl">Not Found</p>
   </div>) : newData)
   
   return (
      <div className="relative">
         {(showFilter || !hideElement) && 
         <Suspense fallback={<div className="bg-white w-10 h-10 rounded-full border-b border-black animate-spin"></div>}>
            <FilterMenu temporaryConfig={temporaryConfig} showFilter={showFilter} setShowFilter={setShowFilter} hideElement={hideElement} setTemporary={setTemporary} filter={filter} JumlahShow={JumlahShow} category={category} handleSubmit={handleSubmit}/>
         </Suspense>
         }
         <main className={`m-auto relative pb-5  ${showFilter ? ' overflow-hidden overflow-y-hidden' : 'overflow-clip'}`}>
            <div className=" w-96 h-96 -right-40   rounded-full absolute -top-40 min-[1200px]:-left-40 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 opacity-20 z-0"></div>
            <div className=" mx-auto max-w-3xl">
               <Menu truncateString={truncateString} showDesc={showDesc} setShowDesc={setShowDesc} data={data}/>
            </div>
            <div className="text-white relative mt-10 h-full">
                  <div
                     className={`flex z-10 py-2 border-b  border-slate-200  ${
                        (isSticky) ? `bg-opacity-50 transition-all backdrop-blur-sm pt-5 bg-zinc-500 fixed top-0` : "bg-opacity-10 bg-black max-w-3xl mx-auto"
                     } border-opacity-25 w-full`}
                     >
                        {isSticky && windowWidth >= 450 && <RandomingButton randomizeData={randomizeData} />}
                     <div className={`bg-gray-700 bg-opacity-90 p-1 transition-all flex absolute right-0 z-20 ${ShowBanner ? '-bottom-7' : '-bottom-11 max-md:-bottom-9'} ${!isSticky && 'hidden'}`}>
                        <div onClick={() => setShowBanner(!ShowBanner)} className={`p-1 ${ShowBanner ? 'flex flex-col' : 'grid grid-cols-2'} cursor-pointer px-2 bg-transparent hover:bg-white  hover:bg-opacity-10 transition-all gap-1`}>
                           <div className={`bg-green-500  ${ShowBanner ? 'h-1 px-3' : 'bg-transparent border-2 border-sky-300 h-3 px-1 max-md:h-2'} `}></div>
                           <div className={`bg-green-500 ${ShowBanner ? 'h-1 px-3' : ' bg-transparent border-2 border-sky-300 h-3 px-1 max-md:h-2'} `}></div>
                           {!ShowBanner && 
                           <>
                           <div className={`${!ShowBanner && 'bg-transparent border-2 border-sky-300 h-3 px-1 max-md:h-2'} `}></div>
                           <div className={`${!ShowBanner && ' bg-transparent border-2 border-sky-300 h-3 px-1 max-md:h-2'} `}></div>
                           </>
                           }
                        </div>
                     </div>
                     <NightMode isNightMode={isNightMode} setIsNightMode={setIsNightMode} />
                     <div className="z-10 mx-auto">
                        <form
                           onSubmit={onSearch}
                           
                           className="flex rounded-lg focus:outline-1 focus:ring-1">
                           <input
                              onChange={(e) => setSearch(e.target.value)}
                              value={search}
                              placeholder="Search here"
                              className={`px-2 focus:outline-none rounded-lg bg-black bg-opacity-10 placeholder:text-white placeholder:text-opacity-50 ${
                                 search.length > 0 && "rounded-r-none"
                              }`}
                           />
                           <button
                              aria-disabled={search.length > 0}
                              className={`-translate-x-7 rounded-r-lg bg-white px-1 bg-opacity-100 transition-all duration-300 text-black ${
                                 search.length > 0
                                    ? "cursor-pointer translate-x-0"
                                    : "cursor-default opacity-0"
                              }`}
                              type="submit">
                              <i className="fa-solid fa-magnifying-glass"></i>
                           </button>
                        </form>
                     </div>
                     <div
                        onClick={async () => {
                           setShowFilter(!showFilter);
                           if (category == null) {
                              try {
                                 const res = await fetch("https://api.publicapis.org/categories");
                                 if (!res.ok) {
                                    throw new Error("Failed to fetch data");
                                 }
                                 const jsonData: categoriess = await res.json();
                                 setCategory(jsonData);
                              } catch (error) {
                                 console.log(error);
                              }
                           }
                        }}
                        className={`mr-5 transition-all duration-300 rounded-md flex-shrink-0 cursor-pointer px-2 ${
                           showFilter
                              ? "bg-green-300 text-gray-700 hover:bg-red-400"
                              : "hover:bg-green-300 hover:text-gray-700"
                        }`}>
                        <p>
                           Filter <i className="fa-solid fa-filter"></i>
                        </p>
                     </div>
                  </div>
               <div className="relative max-w-3xl mx-auto">
                     <div className="flex relative justify-between mb-5 p-2 px-0 flex-wrap bg-black bg-opacity-10 gap-2">
                     <div className=" flex w-full px-2 border-b border-slate-200 border-opacity-25 py-1">
                        <div className="h-full w-fit flex-shrink-0 mr-2">
                           <p>Result : {ModifyData ? ModifyData.entries.length : '0'}</p>
                        </div>
                        <div className="text-left hidden min-[230px]:flex ml-auto">
                           <p className=" flex flex-shrink-0">category : &nbsp;</p>
                           <div className="flex flex-wrap gap-1">
                              {filter.category.length === 0 ? ((
                                 <div  className="group bg-green-500 flex flex-shrink-0 p-1 px-2 rounded-lg transition-all cursor-pointer hover:transition-all duration-300">
                                       <p className="group-hover:opacity-50">ALL</p>
                                    </div>
                              )
                                 ) : (
                                 filter.category.map((item, index) => {
                                    
                                    return (
                                       <Link
                                          href={{
                                             pathname: '/',
                                             query: {
                                                ...((JumlahShow > 20 || pagination > 1) && {show : JumlahShow,page:1}),
                                                category : filter.category.filter((_,idx) => idx !== index) || [],
                                                ...(filter.Https != 'all' && {Https : filter.Https})
                                             }
                                          }}
                                          onClick={() => handleDelete(item)}
                                          key={index}
                                          className="group bg-green-500 flex flex-shrink-0 p-1 px-2 rounded-lg transition-all cursor-pointer hover:transition-all hover:duration-500 hover:bg-red-500 hover:text-black duration-300"
                                          >
                                          <p className="group-hover:opacity-50">{item}</p>
                                       </Link>
                                    );
                                 })
                              )}
                           </div>
                        </div>
                     </div>
                     <div className="w-full px-2 flex justify-between">
                        <div className="">
                           <p>Show : {JumlahShow}</p>
                        </div>
                        <RandomingButton randomizeData={randomizeData} />
                     </div>
                  </div>
               </div>
               
               <ul ref={stickyElementRef} className={`flex  mb-5 gap-6 mx-auto ${ShowBanner ? 'max-w-3xl flex-col' : ' max-w-full px-[2vw] flex-wrap justify-center'}`}>
                  <Suspense>
                     {filteredData}
                  </Suspense>
                  
               </ul>
            </div>
            <Urutan windowWidth={windowWidth} category={temporaryConfig.category} ModifyDatas={ModifyData} JumlahShow={JumlahShow} pagination={pagination} setPagi={setPagi}/>
         </main>
         <Footer/>
      </div>
   
   );
}
