import { useEffect, useState } from "react";

function DarkMode() {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('isDark')));
    const toggleMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('isDark', JSON.stringify(!darkMode));
    }
    useEffect(() => {
        const body = document.getElementById('root').parentElement;
        body.classList.toggle('dark', darkMode);
    }, [darkMode]);


    return (
        <>
            <header className='shadow-xl dark:bg-gray-700 py-6'>
                <div className="container max-w-4/5 mx-auto flex justify-between">
                    <h2 className='text-2xl font-extrabold'>Where in the world?</h2>
                    <button className="cursor-pointer flex items-center" on onClick={toggleMode}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={26}
                            height={26}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="sm:me-3.5"
                        >
                            <path
                                d="M2.03 12.42c.36 5.15 4.73 9.34 9.96 9.57 3.69.16 6.99-1.56 8.97-4.27.82-1.11.38-1.85-.99-1.6-.67.12-1.36.17-2.08.14C13 16.06 9 11.97 8.98 7.14c-.01-1.3.26-2.53.75-3.65.54-1.24-.11-1.83-1.36-1.3C4.41 3.86 1.7 7.85 2.03 12.42Z"
                                stroke="none"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="max-sm:hidden">Dark Mode</span>
                    </button>
                </div>
            </header>
        </>
    )
}

export default DarkMode
