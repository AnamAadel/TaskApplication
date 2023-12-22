import React, { useEffect, useState } from 'react';
import { SiTask } from "react-icons/si";
function Benefits() {
    const [benefitsData, setBenefitsData] = useState([]);
    console.log(benefitsData)
    useEffect(()=> {
        const fetchData = async ()=> {
            const res = await fetch("/benefits.json");
            const data = await res.json();
            setBenefitsData(data);
        }
        fetchData()
    },[])
    return (
        <section className=" py-20 px-10 bg-stone-300 dark:bg-gray-800 dark:text-gray-100">
            <div className="container mx-auto p-4 my-6 space-y-2 text-center">
                <h2 className="text-5xl font-bold">{benefitsData.title}</h2>
                <p className="dark:text-gray-400">{benefitsData?.introduction}</p>
            </div>
            <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {
                benefitsData?.userProfiles && benefitsData?.userProfiles.map((content, idx)  => (
                    <div key={idx} className="flex flex-col items-center p-4">
                    <SiTask className='text-5xl text-neutral' />
                        <h3 className="my-3 text-3xl font-semibold">{content.type}</h3>
                        <div className="space-y-1 leadi">
                            <p>{content.description}</p>
                        </div>
                    </div>
                ))
            }
            </div>
        </section>
    )
}

export default Benefits