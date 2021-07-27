// //FOR DELETING COMMENT OR MARKER
// import {useState, useEffect} from 'react'

// function useDelete(url, token) {

//     const [data, setData] = useState(null)
//     const [error, setError] = useState(null)
    
//     useEffect(() => {
//         fetch(url, {
//             method:'DELETE',
//             headers: new Headers ({
//                 'Authorization': `token ${token}`,
//                 'Content-Type': 'application/json'
//             }),
//         })
//         .then(res => {
//             if(!res.ok) throw Error('could not fetch data')
//                 return res.json()
//         })
//         .then(data=> setData(data))
//         .catch(err => setError(err))

//     }, [url, token])

//     return {data, setData, error, setError}
// }

// export default useDelete