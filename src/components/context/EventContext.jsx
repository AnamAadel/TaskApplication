import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import useGetData from '../hook/useLocalStorage';

export const ProvideData = createContext();


export function useData(){
    return useContext(ProvideData);
}

function EventContext({children}) {
    const [localData, setLocalData] = useState(useGetData());
    function setDataToLocal(data) {
        let newData = [...localData];
        if(!localData.includes(data)){
            console.log(data);
            newData = [...localData, data ]
            setLocalData(newData);
            toast.success("your purchase has completed successfully",{
                toastId: "success",
                theme: "colored"
            })

        }else{
            console.log(data);
            toast.warn("You already have purchased",{
                toastId: "warning",
                theme: "colored"
            })
        }
        
        const jsonData = JSON.stringify(newData);
    
        localStorage.setItem("donation", jsonData);
    
    
    }

  return (
    <ProvideData.Provider 
    value={{
        setDataToLocal,
        localData

    }
    }>
    {children}
    </ProvideData.Provider>
  )
}

export default EventContext