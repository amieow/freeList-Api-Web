import Link from "next/link";
import type {FilterProps } from "./type";

export default function FilterMenu({showFilter, hideElement, setShowFilter, setTemporary, filter, JumlahShow, temporaryConfig, category, handleSubmit}: FilterProps) {
	return (
		<div className={`fixed overflow-y-scroll no-scrollbar ${showFilter ? 'flex' : ''} ${hideElement ? 'hidden' : 'flex'} z-30 bg-black bg-opacity-90 text-white w-screen h-screen`}>
			<div className={`m-auto overflow-y-scroll rounded-t-xl no-scrollbar ${showFilter ? ' animate-toUpper' : ' animate-toDown'}`}>
				<div className=' flex  gap-10 '>
					<p className='bg-gray-700 p-1 rounded-t-lg px-5'>Filter</p>
				</div>
				<div className='gap-2 bg-gray-700 py-2 rounded-r-xl rounded-b-xl'>
					<div className='flex flex-col  px-2 py-1 max-w-2xl rounded-tr-xl'>
						<div className='p-1 pr-5 flex justify-between border-b'>
							<p className=''>Jumlah show</p>
							<p
								onClick={() => {
									setShowFilter(!showFilter)
									setTemporary(() => ({
										...filter,
										JumlahShow: JumlahShow,
									}))
								}}
								className='bg-rose-700 cursor-pointer rounded-lg p-1 px-2 -translate-y-2 translate-x-4'>
								X
							</p>
						</div>
						<div className='flex flex-wrap gap-4'>
							{[20, 50, 100, 200].map((item, index) => {
								const onChangeFilter = (numbers: number) => {
									setTemporary(prev => ({
										...prev,
										JumlahShow: numbers,
									}))
								}
								return (
									<label
										onClick={() => onChangeFilter(item)}
										className='flex gap-2'
										key={index}>
										{item}{' '}
										<input
											className='cursor-pointer my-auto'
											type='radio'
											name='jumlahShow'
											id='jumlahshow'
											checked={temporaryConfig.JumlahShow === item}
											onChange={() => onChangeFilter(item)}
										/>
									</label>
								)
							})}
						</div>
					</div>
					<div className='flex flex-col px-2 py-1 max-w-3xl'>
						<div className='p-1 pr-5 border-b'>
							<p className=''>Https</p>
						</div>
						<div className='flex flex-wrap gap-4'>
							{['yes', 'no'].map((item, index) => {
								const onChangeFilter = () => {
									if (temporaryConfig.Https === "all") {
										setTemporary((prev) => ({
										...prev,
										Https: "yes",
										}));
									} else if (temporaryConfig.Https === "yes") {
										setTemporary((prev) => ({
										...prev,
										Https: "no",
										}));
									} else if (temporaryConfig.Https === "no") {
										setTemporary((prev) => ({
										...prev,
										Https: "all",
										}));
									} else {
										setTemporary((prev) => ({
										...prev,
										Https: "yes",
										}));
									}
								}
								return (
									<label
										htmlFor={`http-${item}`}
										key={index}
										className='gap-2 flex'>
										<p>{item}</p>
										<input
											className='cursor-pointer mt-auto mb-1 checked:text-sky-500'
											type='checkbox'
											name={`http-${item}`}
											id={`http-${item}`}
											checked={temporaryConfig.Https == 'all' ? true : temporaryConfig.Https == item}
											onChange={onChangeFilter}
										/>
									</label>
								)
							})}
						</div>
					</div>
					<div className='flex flex-col px-2 py-1 gap-2 max-w-2xl '>
						<div className='p-1 pr-5 border-b'>
							<p className=''>Category</p>
						</div>
						<div className='flex flex-wrap gap-4'>
							<div
								onClick={() => {
									setTemporary(prev => ({
										...prev,
										category: [],
									}))
								}}
								key={0}
								className={`p-1 px-3 w-fit rounded-lg cursor-pointer duration-200 ${temporaryConfig.category.length == 0 ? 'bg-emerald-600' : 'bg-fuchsia-800 ring-1 ring-slate-400'} transition-all delay-75`}>
								all
							</div>
							{category ?
								category.categories.map((item, index) => {
									const isSelected = temporaryConfig.category.includes(item)
									return (
										<div
											key={index + 1}
											className={`p-1 px-3 w-fit rounded-lg cursor-pointer  ring-slate-400 transition-all delay-75 duration-200 ${isSelected ? 'bg-emerald-600 ' : 'bg-fuchsia-800 ring-1'}`}
											onClick={() => {
												if (isSelected) {
													setTemporary(prev => ({
														...prev,
														category: prev.category.filter(category => category !== item),
													}))
												} else {
													setTemporary(prev => ({
														...prev,
														category: [...prev.category, item],
													}))
												}
											}}>
											{item}
										</div>
									)
								}) : Array.from({length : 40} , (_,index) => {
									return (
										<div className=" bg-fuchsia-800 p-1 min-h-[32px] px-2 w-fit" key={index}>
											<div className="w-12 animate-pulse duration-300 bg-gray-300 h-full"></div>
										</div>
									)
								})}
						</div>
					</div>
					<div>
						<Link
							onClick={handleSubmit}
							className='bg-emerald-500 flex px-2 py-1 justify-center font-semibold tracking-wider text-lg mx-3 rounded-xl mt-4'
							href={{
								pathname: '/',
								query: {
								...temporaryConfig.JumlahShow !== 20 && { show: temporaryConfig.JumlahShow,page : 1 },
								category: temporaryConfig.category,
								...(temporaryConfig.Https != 'all' && {Https: temporaryConfig.Https})
								},
							}}
							>
							<p>Confirm</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

