import {useState} from 'react'

export default function useFetch() {

    const [requestedData, setRequestedData] = useState({});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const goFetch = (url, options={}) => {
        setLoading(true)
        fetch(url, options)
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setRequestedData(payload.message)
            } else {
                setErrors(payload.errors)
            }
            setLoading(false)
        })
        .catch(errors => {
            setLoading(false)
            console.error(errors)
            alert("Something went wrong. Please try again later.")
        })
    }
    return [{requestedData, errors, loading}, goFetch]
}
