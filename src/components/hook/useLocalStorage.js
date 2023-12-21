
export default function useGetData() {
    const jsonData = localStorage.getItem("donation");
    const localData = JSON.parse(jsonData);

    if(localData){
        return localData;
    }
    return [];

}


