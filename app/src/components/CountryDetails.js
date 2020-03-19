import React from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Container, Grid, Typography, Card, CardContent, CardHeader, List, ListItem, ListItemText, Divider, makeStyles } from '@material-ui/core';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        height: '100%'
    },
    titleDivider: {
        marginBottom: theme.spacing(2)
    },
    card: {
        width: '40%',
        marginTop: theme.spacing(2)
    }
}))

const CountryDetails = () => {
    const countryData = useSelector(state => state.countryData);
    const { container, card, titleDivider } = styles();
    return (
        countryData ? 
        <Scrollbars>
            <Container className={container}>
                <Typography variant='h2' component='h1'>{countryData.Country}</Typography>
                <Divider className={titleDivider}  />
                <Grid container direction='column' alignItems='center' justify='center'>
                    <Card className={card}>
                        <CardHeader title={`Total confirmed cases:\n${countryData.TotalConfirmed}`} />
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemText primary='Recovered cases:' />
                                    <Typography>{ countryData.TotalRecovered }</Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary='Fatal cases:' />
                                    <Typography>{ countryData.TotalDeaths }</Typography>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        </Scrollbars>
        : null
    )
}

export default CountryDetails