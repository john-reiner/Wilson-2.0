import React, {useEffect} from 'react'
import useFetch from '../../../hooks/useFetch'

export default function SignUpStepTwo(props) {

    const [{requestedData, loading, errors}, goFetch, clearFetch] = useFetch(null)

    useEffect(() => {
        if (requestedData.length > 0) {
            // localStorage.setItem("wilsonUserToken", requestedData)
            // props.setToken(requestedData)
        }

        if (errors.length > 0) {
            console.error(errors)
        }
    }, [requestedData]);

    const handleSubmit = e => {
        e.preventDefault()

        goFetch("http://localhost:3001/api/v2/users",  {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: props.newUser})
        })

    }

    

    return (
        <div>Signup Step two</div>
    )
}