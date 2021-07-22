import React, {useState, useEffect} from 'react'

function useFetch(url) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        fetch(url)
            .then(res => {
                if(!res.ok) throw Error('could not fetch data')
                return res.json()
            })
            .then(data=> setData(data))
            .catch(err => setError(err))

    }, [url])

    return {data, setData, error, setError}
}

export default useFetch
