import React, {useState} from 'react'

export default function useFetch() {

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const goFetch = (url, options={}) => {
        setLoading(true)
        fetch(url, options)
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "ok") {
                setResponse(payload)
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
    return [{response, errors, loading}, goFetch]
}
