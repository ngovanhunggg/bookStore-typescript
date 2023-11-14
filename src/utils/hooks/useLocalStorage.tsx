import { useCallback, useState } from "react";
import { StoredData } from "../../interfaces";

const { log } = console;

const useLocalStorage = (): {
    data : StoredData | null;
    setData : (data: StoredData) => void;
    clearData : () => void;

} => {
    const storageKey = 'bookStore'

    // const dataRef:any = useRef()

    // Retrieve the data from LocalStorage 
    const [data,setData] = useState<StoredData | null>( () => {
        const storedData = localStorage.getItem(storageKey);
        return storedData ? JSON.parse(storedData) : null;
    })
    // dataRef.current = data
    log('useLocal render' , data)

    // Update the data in LocalStorage and state
    // UseCallback to updateData isn't changed
    const updateData = useCallback((newData : StoredData): void => {
        localStorage.setItem(storageKey, JSON.stringify(newData))
        setData(newData)
    },[])
    
    // Clear the data in LocalStorage and state
    const clearData = (): void => {
        localStorage.clearItem(storageKey);
        setData(null)
    }
    return {
        data, setData:updateData,clearData
    }
}
export default useLocalStorage;