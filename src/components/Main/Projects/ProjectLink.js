import React from 'react'
// import './ProjectLink.css'

export default function ProjectLink(props) {

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
    }

    return (
        <tr onClick={() => props.handleProjectShow(props.id)} className='project-link'>
            <td className='link-title'>{props.title}</td>
            <td className='link-author'>{props.author}</td>
            <td className='link-modified'>{convertDate(props.modified)}</td>
            <td className='link-created'>{convertDate(props.created)}</td>
        </tr>
    )
}
