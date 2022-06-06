import { useState } from 'react';
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { styled } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Box,
    Container,
    Typography,
    Stack,
    Card,
    Collapse,
    CardMedia,
    CardContent,
    IconButton,
    CardActions,
    Link
} from '@material-ui/core';
// import { AwesomeButton } from 'react-awesome-button';
import CardButton from 'src/components/CardButton';

// ----------------------------------------------------------------------

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: 'all .6s'
}));

// ----------------------------------------------------------------------

export default function InternalCard({ stakeTokenInfo, rewardTokenInfo, dividendTokenInfo, stakingToken, rewardToken, name, bio, description, twitter, telegram, category }) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card
            sx={{
                borderRadius: '16px',
                background: 'linear-gradient(180deg, #000000 0%, #34314a 100%)',
                border: '1px solid yellow',
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
            }}
        >
            <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='h4' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        Stake:
                    </Typography>
                    <Typography variant='h4' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {stakeTokenInfo?.symbol ? stakeTokenInfo?.symbol : "???"}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='h4' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        Reward:
                    </Typography>
                    <Typography variant='h4' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {rewardTokenInfo?.symbol ? rewardTokenInfo?.symbol : "???"}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='h4' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        Reflection:
                    </Typography>
                    <Typography variant='h4' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        { dividendTokenInfo?.symbol ? dividendTokenInfo?.symbol : "???" }
                    </Typography>
                </Container>
            </CardContent>
            <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>

                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25 }}>
                        APR:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25 }}>
                        300%
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25 }}>
                        MRF Earned:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25 }}>
                        300
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <CardButton style={{
                        width: '45%',
                        height: 25,
                        borderRadius: 5,
                        cursor: 'pointer',
                        fontSize: 20,
                        letterSpacing: 1,
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}>
                        Compound
                    </CardButton>
                    <CardButton style={{
                        width: '45%',
                        height: 25,
                        borderRadius: 5,
                        cursor: 'pointer',
                        fontSize: 20,
                        letterSpacing: 1,
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}>
                        Harvest
                    </CardButton>
                </Container>
                {
                    category == 1 ? <>
                        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                            <Typography variant='p' sx={{ fontSize: 25 }}>
                                BUSD Reflected:
                            </Typography>
                            <Typography variant='p' sx={{ fontSize: 25 }}>
                                300
                            </Typography>
                        </Container>
                        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                            <CardButton style={{
                                width: '45%',
                                height: 25,
                                borderRadius: 5,
                                cursor: 'pointer',
                                fontSize: 20,
                                letterSpacing: 1,
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                            }}>
                                Compound
                            </CardButton>
                            <CardButton style={{
                                width: '45%',
                                height: 25,
                                borderRadius: 5,
                                cursor: 'pointer',
                                fontSize: 20,
                                letterSpacing: 1,
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                            }}>
                                Harvest
                            </CardButton>
                        </Container>
                    </> : <></>
                }
                <Container
                    maxWidth="lg"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <RouterLink to='/mint' style={{ width: '100%' }}>
                        <CardButton style={{
                            width: '100%',
                            height: 45,
                            marginTop: 15,
                            borderRadius: 5,
                            cursor: 'pointer',
                            fontSize: 30,
                            letterSpacing: 5,
                            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                        }}>
                            Enable
                        </CardButton>
                    </RouterLink>
                </Container>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ marginBottom: 0 }}>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Deposit Fee:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        0%
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Withdraw Fee:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        4%
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Total Staked:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        1M MRF
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Time Left:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        4 days
                    </Typography>
                </Container>
                <Container sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 1 }}>
                    <Link href='/' target='_blank' sx={{ fontSize: 25, color: '#ba872a', textDecorationColor: '#ba872a' }}>View Contract</Link>
                </Container>
            </Collapse>
        </Card>
    );
}
