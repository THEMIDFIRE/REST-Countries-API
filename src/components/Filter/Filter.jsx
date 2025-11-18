import { useState, useRef, useEffect } from "react";

export default function Filter({ onSelect }) {
    const [isOpened, setIsOpened] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('Filter by Region');
    const dropdownMenu = useRef(null);

    const toggleDropdown = () => setIsOpened(!isOpened);

    const handleSelect = (region) => {
        setSelectedRegion(region || 'Filter by Region');
        onSelect(region);
        // setIsOpened(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownMenu.current && !dropdownMenu.current.contains(e.target)) {
                setIsOpened(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownMenu}>
            <button
                onClick={toggleDropdown}
                className="w-52 bg-slate-100 font-medium border border-gray-300 rounded-lg text-sm px-5 py-4 flex justify-between items-center dark:bg-gray-700 dark:border-gray-600" type="button" id="filterCountryDropdown" aria-haspopup="true" aria-expanded={isOpened} >
                <span>{selectedRegion}</span>
                <svg className="w-2.5 h-2.5 ms-14" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6" >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {isOpened && (
                <div
                    className="absolute mt-2 z-10 w-full bg-white rounded-lg shadow divide-y divide-gray-100 dark:bg-gray-700"
                    role="menu"
                    aria-labelledby="filterCountryDropdown"
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                            <a onClick={() => handleSelect()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All</a>
                        </li>
                        <li>
                            <a onClick={() => handleSelect('Africa')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Africa</a>
                        </li>
                        <li>
                            <a onClick={() => handleSelect('Americas')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Americas</a>
                        </li>
                        <li>
                            <a onClick={() => handleSelect('Asia')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Asia</a>
                        </li>
                        <li>
                            <a onClick={() => handleSelect('Europe')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Europe</a>
                        </li>
                        <li>
                            <a onClick={() => handleSelect('Oceania')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Oceania</a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
