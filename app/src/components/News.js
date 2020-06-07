import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, makeStyles, Container, Divider, Grid, Link } from '@material-ui/core';
import NewsCard from './NewsCard';
import NYTimesAttribution from '../img/poweredby_nytimes_150a.png';

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
        // height: '100%',
        width: '100%'
    },
    titleDivider: {
        marginBottom: theme.spacing(2)
    },
    card: {
        width: '40%',
        marginTop: theme.spacing(2)
    }
}))

const News = () => {
    const { news, countryData } = useSelector(state => state);
    const { container, titleDivider } = styles();
    return (
        news?.length > 0 &&
            <Container className={container}>
                <Typography variant='h3'>Headlines</Typography>
                <Link target='_blank' href='https://developer.nytimes.com/'><img src={NYTimesAttribution} alt="News provides by NYTimes API"/></Link>
                {/* { !countryData && <Typography variant='h5' component='h1'>Covid 19</Typography> } */}
                <Divider className={titleDivider}  />
                <Grid container direction='column' alignItems='center' justify='center'>
                    { news.map((article, i) => (
                        <Grid item key={i} style={{width: '100%'}}>
                            <NewsCard article={article} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
    )
}

export default News
