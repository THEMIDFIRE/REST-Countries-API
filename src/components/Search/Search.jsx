import Filter from '../Filter/Filter'

function Search({ onSearch, onRegionSelect }) {
    return (
        <>
            <div id="filter" className='my-7'>
                <div className="container flex flex-wrap flex-col md:justify-around lg:justify-between md:items-center sm:flex-row px-10 py-4 mx-auto">
                    <form className="max-md:w-full w-1/2 max-md:mb-14" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="searchCountry" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" onChange={onSearch} id="searchCountry" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus-visible:outline-0" placeholder="Search for a country..." />
                        </div>
                    </form >
                    <Filter onSelect={onRegionSelect}/>
                </div>
            </div >
        </>
    )
}

export default Search

