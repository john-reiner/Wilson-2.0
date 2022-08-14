// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useEffect, useState} from 'react'
import { ListType } from '../listTypes';

function useGETList(url: string) {

    const [data, setData] = useState<ListType | null>(null);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
            }
        )
        .then(response => response.json())
        .then((payload: ListType) => {
            setData(payload)
            setLoading(false)
        })
        .catch(errors => {
            setErrors(errors)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [url]);

    return {data, loading, errors}
}

export default useGETList