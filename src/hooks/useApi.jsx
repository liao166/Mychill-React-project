import { useState, useEffect } from "react";
import axios from "axios";

function useApi(url, { method = "get", body = null, ...options } = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios({url, method, data: body, ...options});
                setData(response.data)
            }catch(err){
                setError(err);
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    }, [url, method, body, options])
    
    return {data, loading, error}
}

export default useApi


// 可以在其他元件中調用此 hook，例如 :
// const { data, loading, error } = useApi("https://api.example.com/data", {
//     method: "post",
//     body: { key: "value" }
//   });