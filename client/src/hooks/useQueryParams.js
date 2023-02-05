import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

function useQueryParams(keys) {
    const [searchParams] = useSearchParams();
    const [result, setResult] = useState({});
    useEffect(() => {
        const searchParamsValues = {};
        keys.forEach(key => {
            searchParamsValues[key] = searchParams.get(key);
        })
        setResult(searchParamsValues);
    }, [searchParams])
    return result
}

export default useQueryParams