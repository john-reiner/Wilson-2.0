import { Paper, Title, Text, Divider, Table } from '@mantine/core'
import React from 'react'
import Link from './Link'

export default function DisplayAllLinks(props) {

    const pluralizeDisplayItem = (displayItem, count) => {
        if (count > 1 || count === 0) {
            return displayItem + 's'
        }
        return displayItem
    }

    const renderLinks = (data) => {
        if (data && data.length > 0) {
            return data.map(dataObject => {
                return (
                    <Link
                        key={props.displayItem+"_"+dataObject.id}
                        id={dataObject.id}
                        title={dataObject.title}
                        author={dataObject.author}
                        status={dataObject.status}
                        modified="1/1/2000"
                        linkClick={props.linkClick}
                        priority={dataObject.priority}
                    />
                )
            })
        }
    }

    return (
        <Paper
            shadow="xs" 
            withBorder
        >
            <Paper
                p="lg"
            >
                <Title 
                    order={3}
                >
                    All {props.displayItem}
                </Title>
                <Text>{props.count + " " + pluralizeDisplayItem(props.displayItem, props.count)}</Text>
            </Paper>
            <Divider/>
            <Table
                striped
                highlightOnHover
            >
                <thead>
                    <tr>
                        <th>Title</th>
                        { props.status && <th>Status</th>}
                        <th>Creator</th>
                        <th>Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {renderLinks(props.data)}
                </tbody>
            </Table>
        </Paper>
    )
}