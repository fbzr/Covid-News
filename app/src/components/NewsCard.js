import React from 'react';
import { Card, CardHeader, CardMedia, makeStyles, Typography, CardContent, Link, Hidden, createMuiTheme, ThemeProvider } from '@material-ui/core';

const defaultTheme = createMuiTheme();
const cardTheme = {
    ...defaultTheme,
    overrides: {
        MuiCardContent: {
            root: {
                padding: defaultTheme.spacing(2),
                [defaultTheme.breakpoints.down('sm')]: {
                    padding: '10px 5px 10px 10px !important'
                }
            }
        },
        MuiTypography: {
            h5: {
                fontSize: defaultTheme.typography.h5.fontSize,
                lineHeight: defaultTheme.typography.h5.lineHeight,
                [defaultTheme.breakpoints.down('sm')]: {
                    fontSize: '1rem',
                    lineHeight: '1.1rem'
                }
            }
        }
    }
}

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexWrap: 'nowrap',
        margin: `0 0 15px`
    },
    cardContent: {
        paddingBottom: '8px !important'
    },
    image: {
        width: '20%',
        minWidth: '20%'
    },
    articleDescrition: {
        color: theme.palette.text.secondary
    },
    subContentContainer: {
        display: 'flex'
    },
    creditAndDate: {
        marginTop: theme.spacing(2),
        [defaultTheme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1),
        },
        display: 'flex',
        flexDirection: 'column'
    }
}));

const getDateString = (date) => {
    const dateFormat = new Date(date);
    const month = dateFormat.getMonth() + 1;
    const day = dateFormat.getDate();
    const year = dateFormat.getFullYear();
    return `${(month < 10 && '0') + month}/${day < 10 && '0' + day}/${year}`;
}

const NewsCard = ({ article }) => {
    const {
        title,
        abstract,
        url,
        byline,
        multimedia,
        source,
        published_date
    } = article;

    const imageUrl = multimedia ? multimedia[1]?.url || multimedia[0]?.url : null;

    const {
        card,
        cardContent,
        image,
        articleDescrition,
        subContentContainer,
        creditAndDate
    } = useStyles();

    return (
        <ThemeProvider theme={cardTheme}>
        <Link href={url} target='_blank'>
            <Card className={card}>
                { imageUrl ? 
                <CardMedia className={image} image={imageUrl} title={title} />
                : <div className={image}></div> }
                <CardContent className={cardContent}>
                    <CardHeader style={{padding: '0'}} title={title} />
                    <Hidden smDown>
                        <div className={subContentContainer}>
                            <Typography className={articleDescrition} variant='body2' >{abstract}</Typography>
                        </div>
                    </Hidden>
                    <div className={creditAndDate}>
                        <Typography variant='caption'>{getDateString(published_date)}</Typography>
                        <Typography variant='caption'>{`${byline && byline + ' - '}${source}`}</Typography>
                    </div>
                </CardContent>            
            </Card>
        </Link>
        </ThemeProvider>
    )
}

export default NewsCard
