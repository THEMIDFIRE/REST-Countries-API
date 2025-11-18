import Search from '../Search/Search';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import data from '../../data.json';

function Countries() {
    const [allCountries, setAllCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [regionFilter, setRegionFilter] = useState('');
    const [filterCountries, setFilterCountries] = useState([]);

    function getCountries() {
        try {
            if (Array.isArray(data)) {
                console.log('Loaded countries from data.json:', data);
                setAllCountries(data);
                setFilterCountries(data);
            } else {
                console.error('Expected array in data.json but got:', data);
                setAllCountries([]);
                setFilterCountries([]);
            }
        } catch (error) {
            console.error('Error loading countries from data.json:', error);
            setAllCountries([]);
            setFilterCountries([]);
        }
    }

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        const filtered = Array.isArray(allCountries) ? allCountries.filter(country => 
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
            (regionFilter ? country.region.toLowerCase() === regionFilter.toLowerCase() : true)
        ) : [];
        setFilterCountries(filtered);
    }, [searchTerm, regionFilter, allCountries]);

    function handleSearch(e) {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
    }

    function handleRegionFilter(region) {
        setRegionFilter(region);
    }

    return (
        <main>
            <Search onSearch={handleSearch} onRegionSelect={handleRegionFilter} />

            <section id='countries'>
                <div className="container mx-auto">
                    <div id='countryCards' className='flex flex-wrap justify-center items-center sm:flex-col md:flex-row gap-16'>
                        {!Array.isArray(filterCountries) || filterCountries.length === 0 ? (
                            <p className="text-center w-full text-lg font-semibold text-gray-600 dark:text-gray-300 py-10">
                                {!Array.isArray(filterCountries) ? (
                                    'Loading countries...'
                                ) : (
                                    <>
                                        {searchTerm && regionFilter && `No countries found in ${regionFilter} matching "${searchTerm}"`}
                                        {searchTerm && !regionFilter && `No countries found matching "${searchTerm}"`}
                                        {!searchTerm && regionFilter && `No countries found in ${regionFilter}`}
                                        {!searchTerm && !regionFilter && 'No countries found.'}
                                    </>
                                )}
                            </p>
                        ) : (
                            filterCountries.map((country, index) => (
                                <div className="card max-w-2/3 md:max-w-1/3 lg:max-w-1/5 shadow-2xl dark:bg-slate-700/70 rounded-lg overflow-hidden">
                                    <Link to={`/country/${country.name.common}`} key={index}>
                                        <div className="inner">
                                            <img src={country.flags?.png} alt={country.name?.common || 'Country flag'} className='w-screen aspect-video object-cover' />
                                            <div className="countryInfo px-4 pt-6 pb-9">
                                                <h2 className='mb-4'>{country.name || 'Unknown Country'}</h2>
                                                <p>Population: <span className='font-light'>{country.population?.toLocaleString() || 'N/A'}</span></p>
                                                <p>Region: <span className='font-light'>{country.region || 'N/A'}</span></p>
                                                <p>Capital: <span className='font-light'>{country.capital?.[0] || 'N/A'}</span></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </main >
    );
}

export default Countries;
