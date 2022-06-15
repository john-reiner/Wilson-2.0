import React from 'react'
import './Note.css'

export default function Note(props) {

    const convertDate = () => {
        var date =  new Date(props.created)
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
    }

    return (
        <div className='note-container'>
            <div className='note-title-container'>
                <h4>{props.title}</h4>
                <p>{convertDate()}</p>
            </div>
            <div className="note-content-container">
                <p>{props.content}</p>
            </div>
        </div>
    )
}
