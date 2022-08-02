import React from 'react'

import { Divider, Image, Text, Title, Button, Group, useMantineTheme, Grid, Paper, Stack } from '@mantine/core';

export default function ProjectLink(props) {

    // const theme = useMantineTheme();

    // const secondaryColor = theme.colorScheme === 'dark'
    //     ? theme.colors.dark[1]
    //     : theme.colors.gray[7];

    return (
        <Grid.Col lg={6} xl={4}>
            <Paper 
                shadow="md" 
                withBorder
            >
            
                <Grid
                    grow
                >
                    <Grid.Col 
                        sm={4}
                    >

                        <Image 
                            src={props.project.image ? props.project.image : "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg"} 
                            height={160} 
                            alt="Norway"
                            // radius="sm"
                        />                    
                    </Grid.Col>
                    <Grid.Col sm={8}>
                        <Paper
                            p="xs"
                        >
                            <Stack>
                                <Title order={2}>{props.project.title}</Title>
                                <Text size="sm" lineClamp={1}>
                                    {props.project.description}
                                </Text>
                                <Button 
                                    variant="light" color="blue" 
                                    fullWidth 
                                    style={{ marginTop: 14 }}
                                    onClick={() => props.handleProjectShow(props.project.id)} 
                                >
                                    View Project
                                </Button>
                            </Stack>                    
                            {/* <Divider my="xs"/> */}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Paper>
            {/* <Card shadow="sm" p="sm">
                <Card.Section>
                    
                </Card.Section>
                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                </Group>


            </Card> */}
        </Grid.Col>
        )
    }