
type Entry = {
	API: string
	Description: string
	Auth: string
	HTTPS: boolean
	Cors: string
	Link: string
	Category: string
}

type JsonDataType = {
	count: number
	entries: Entry[]
}
type categoriess = {
	count: number
	categories: string[]
}
type HttpsConfig = 'all' | 'yes' | 'no'

interface TemporaryConfig {
	Https: HttpsConfig
	JumlahShow: number
	category: string[]
}
interface Filter {
	Https: HttpsConfig
	category: string[]
}

type FilterProps = {
   showFilter: boolean
   hideElement : boolean
   setShowFilter : (val : boolean) => void
   setTemporary: React.Dispatch<React.SetStateAction<TemporaryConfig>>
   JumlahShow : number
   filter : Filter
   temporaryConfig : TemporaryConfig
   category : categoriess | null
   handleSubmit : () => void
}
type UrutanProps = {
   ModifyDatas: JsonDataType | null;
   JumlahShow: number;
   pagination: number;
   setPagi: (value: number) => void
   category: string[]
   windowWidth : number
};
type SingleDataProps = {
   data1: Entry | undefined;
   index: number;
   displayedText: string;
   key: number
   Loading:boolean
   isFilter:boolean
   showBanner : boolean
};

type boxSingledata = {
   data1 : Entry | undefined
   index : number
   isFilter : boolean
   showBanner : boolean
}
type MenuProps = {
   showDesc: boolean
   setShowDesc: (value : boolean) => void
   truncateString: (value : string , value2 : number) => string
   data : JsonDataType | null
}

type QueryParams = {
   show : number
   pagination : number
   category : categoriess | null
   Https : HttpsConfig
   search : string
}

export type {JsonDataType,categoriess,Entry,TemporaryConfig,Filter,FilterProps,UrutanProps,SingleDataProps,MenuProps,HttpsConfig,QueryParams,boxSingledata}