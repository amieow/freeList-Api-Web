
function HttpsStatus({isTrue,showBanner} : {isTrue : boolean;showBanner : boolean}) {
   if (isTrue){
      return (
         <span className="relative my-auto flex h-3 w-3">
            <span className="bg-green-400 w-3 h-3 rounded-full absolute animate-ping"></span>
            <span className="relative inline-flex bg-green-500 w-3 h-3 rounded-full "></span>
         </span>
      )
   }
   return (
         <span className="relative my-auto flex h-3 w-3">
            <span className={`${showBanner ? 'bg-white' : 'bg-yellow-300'} w-3 h-3 rounded-full absolute animate-ping`}></span>
            <span className={`relative inline-flex ${showBanner ? 'bg-yellow-500' : 'bg-red-500'} w-3 h-3 rounded-full`}></span>
         </span>
      )
}

function RandomingButton({randomizeData , } : {randomizeData : () => void}) {
   return (
      <div onClick={() => randomizeData()} className=" active:bg-green-300 active:text-white cursor-pointer rounded-md transition-all duration-300 px-2">
         <p>Random <i className="fa-solid fa-shuffle"></i></p>
      </div>
   )
}
function NightMode({isNightMode , setIsNightMode} : {isNightMode : boolean ;setIsNightMode : (bool : boolean) => void}) {
   return(
      <div onClick={() => setIsNightMode(!isNightMode)} className={`ml-2 px-3 transition-all cursor-pointer hover:bg-white hover:bg-opacity-5 rounded-lg  ${isNightMode ? 'text-yellow-400' : 'text-sky-300'}`}>
         {isNightMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
      </div>
   )
}

export  {HttpsStatus,RandomingButton,NightMode}
