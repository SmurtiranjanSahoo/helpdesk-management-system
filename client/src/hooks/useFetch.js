//useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

function useFetch(route) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    axios
      .get(`${BASE_URL}${route}`, { cancelToken: source.token })
      .then((res) => {
        setLoading(false);
        //checking for multiple responses for more flexibility
        //with the route we send in.
        res.data && setData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred. Awkward..");
      });
    return () => {
      source.cancel();
    };
  }, [route]);

  return { data, loading, error };
}
export default useFetch;
