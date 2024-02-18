import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useFetch = (url, options = { method: "GET" }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    const get = async () => {
        setIsLoading(true);
        try {
            let response = await axios.get(url);

            setData(response.data);

            setError(false);
        } catch (error) {
            toast.error(error.message);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const post = async (data) => {
        setIsLoading(true);
        try {
            let response = await axios.post(url, data);

            setData(response.data);

            setError(false);
        } catch (error) {
            toast.error(error.message);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (options.method === "POST") return;
        get();
      }, []);

  return {isLoading, error, data, post, get }
}

export default useFetch