import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";


function CountryDetails() {
    const [country, setCountry] = useState(null);
    const [allCountries, setAllCountries] = useState([]);
    const nav = useNavigate();
    const { name } = useParams();

    useEffect(() => {
        async function getCountry() {
            try {
                const countries = await axios('../../../src/data.json');
                const data = countries.data
                const selected = data.find(
                    (c) => c.name.toLowerCase() === name.toLowerCase()
                );
                setCountry(selected);
                setAllCountries(data)
            } catch (err) {
                console.log(err);
            }
        }
        getCountry();
    }, [name]);

    if (!country) {
        return (
            <main className="py-10 text-center">
                <span className="animate-spin"></span>
            </main>
        );
    }

    const borderCountries = country.borders?.map(code => {
        const match = allCountries.find(c => c.alpha3Code === code);
        return match ? match.name : code;
    }) || [];

    const displayBorderCountries = borderCountries.slice(0, 3)

    return (
        <main>
            <section id="countryDetails" className="my-12">
                <div className="container max-w-4/5 mx-auto">
                    <button className="flex gap-1.5 shadow-lg dark:bg-gray-700 my-12 md:mb-12 py-1.5 px-6 rounded-md" onClick={() => nav(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="M9.57 5.93L3.5 12l6.07 6.07M20.5 12H3.67" />
                        </svg>Back
                    </button>
                    <div id="details" className="flex flex-col md:flex-row md:gap-x-28 md:justify-center md:items-center">
                        <div id="img" className="md:w-1/2" >
                            <img src={country.flag} alt={country.name} className="w-full"/>
                        </div>
                        <div id="countryInfo" className="w-3/5">
                            <h1 className="text-2xl font-extrabold mb-6 mt-12 md:my-0">{country.name}</h1>
                            <div id="details" className="flex flex-col md:flex-row md:gap-x-2 md:mt-7">
                                <div className="flex flex-col gap-y-4 md:gap-y-3 w-1/2">
                                    <p className="capitalize"><span className="font-extrabold">native name:</span> {country.nativeName}</p>
                                    <p className="capitalize"><span className="font-extrabold">population:</span> {country.population.toLocaleString()}</p>
                                    <p className="capitalize"><span className="font-extrabold">region:</span> {country.region}</p>
                                    <p className="capitalize"><span className="font-extrabold">sub region:</span> {country.subregion}</p>
                                    <p className="capitalize"><span className="font-extrabold">capital:</span> {country.capital}</p>
                                </div>
                                <div className="flex flex-col gap-y-4 md:gap-y-3 my-8 md:my-0">
                                    <p className="capitalize"><span className="font-extrabold">top level domain:</span> {country.topLevelDomain}</p>
                                    <p className="capitalize"><span className="font-extrabold">currencies:</span> {country.currencies?.map((c) => c.name)}</p>
                                    <p className="capitalize flex"><span className="font-extrabold me-1">languages:</span> {country.languages ? country.languages.map(l => l.name).join(', ') : ''}</p>
                                </div>
                            </div>
                            {borderCountries.length > 0 && (
                                <div id="border" className="mt-4 md:mt-12 md:flex">
                                    <p className="capitalize mb-2 md:mb-0 font-extrabold">Border Countries:</p>
                                    <div className="">
                                        {displayBorderCountries.map((borderName, index) => (
                                            <Link
                                                key={index}
                                                to={`/country/${borderName}`}
                                                className="px-7 py-1 dark:bg-slate-700 rounded shadow xl:ms-2"
                                            >
                                                {borderName}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CountryDetails
