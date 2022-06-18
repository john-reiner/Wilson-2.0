import React from 'react'
import Col from 'react-bootstrap/Col';
import './ProjectLink.css'

export default function Project(props) {

    const convertDate = dateString => {
        function pad(n) {
            return (n < 10) ? '0' + n : n;
        }
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dateObject = new Date(dateString)
        let month = months[dateObject.getMonth()];
        let date = dateObject.getDate()
        let hours = dateObject.getHours()
        if (hours > 12) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }
        let min = dateObject.getMinutes()

        let ampm = dateObject.getHours() >= 12 ? "pm" : "am"

        return `${month} ${date}, ${hours}:${pad(min)} ${ampm}`

        // const date = longDate.slice(4, 9)
    }

    return (
        <tr onClick={() => props.handleProjectShow(props.id)} className='project-link'>
            <td className='link-title'>{props.title}</td>
                {/* <div className='project-title'><h4>{props.title}</h4></div>
                <div className="show-button" onClick={() => props.handleProjectShow(props.id)}>Show</div> */}
            <td className='link-author'>{props.author}</td>
            <td className='link-modified'>{convertDate(props.modified)}</td>
            <td className='link-created'>{convertDate(props.created)}</td>
        </tr>
    )
}
