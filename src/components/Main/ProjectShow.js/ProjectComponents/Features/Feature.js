import React from 'react'
import { Accordion } from '@mantine/core';

export default function Feature(props) {

    const convertDate = (date) => {
        
        var dateMill = Date.parse(date)
        var dateObject = new Date(dateMill)

        var year = dateObject.getFullYear();
        var month = (1 + dateObject.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = dateObject.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }

    console.log(props)

    return (
        <tr onClick={null} key={props.id}>
            <td>{props.title}</td>
            <td>{props.description}</td>
            <td>{convertDate(props.dueDate)}</td>
            <td>{props.public ? "Public" : "Private"}</td>
        </tr>
    )
}