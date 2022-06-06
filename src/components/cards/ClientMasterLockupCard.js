import { useState, useEffect } from 'react';
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
    Divider,
    Grid,
    IconButton,
    CardActions,
    Link,
    Modal
} from '@material-ui/core';
// import { AwesomeButton } from 'react-awesome-button';
import ClientSubStakingCard from 'src/components/cards/ClientSubStakingCard';
import CardButton from 'src/components/CardButton';
//
import { Chain2Explorer } from 'src/network2label/networkLabel';

// ----------------------------------------------------------------------

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: 'all .6s'
}));

const modalStyled = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1d1e20',
    boxShadow: 24,
    borderRadius: 2,
    paddingBottom: 5
};
// ----------------------------------------------------------------------

export default function ClientMasterLockupCard({ id, stakeTokenInfo, rewardTokenInfo, dividendTokenInfo, stakeType, stakeToken, subStakings = [], contractAddress, chainId, projectId, updateStore }) {
    const [expanded, setExpanded] = useState(false);

    const [subStakingView, setSubStakingView] = useState(false);

    return (
        <Card
            sx={{
                borderRadius: '16px',
                background: '#373536',
                border: '1px solid #F0B90B',
                borderTopWidth: '5px',
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
            }}
        >
            <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
                    <Typography variant='h3' sx={{ fontSize: 25, color: '#ffffff' }}>
                        Master LockUp
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        Stake:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {stakeTokenInfo?.symbol ? stakeTokenInfo?.symbol : "???"}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        Reward:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {rewardTokenInfo?.symbol ? rewardTokenInfo?.symbol : "???"}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        Reflection:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {dividendTokenInfo?.symbol ? dividendTokenInfo?.symbol : "???"}
                    </Typography>
                </Container>
                <Divider sx={{ p: 3 }} />
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        Type:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {stakeType?.replace(/_/g, '')}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        SubStakes:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {subStakings ? subStakings?.length : 0}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }} >
                    <CardButton style={{ height: 40, width: '100%', fontSize: 25, borderRadius: 5 }} onClick={() => setSubStakingView(true)}>
                        SubStakes
                    </CardButton>
                </Container>
                <Container sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 1 }}>
                    <Link href={`${Chain2Explorer[chainId]}/address/${contractAddress}`} target='_blank' sx={{ fontSize: 25, color: '#ba872a', textDecorationColor: '#ba872a' }}>View Contract</Link>
                </Container>
            </CardContent>
            <Modal open={subStakingView} onBackdropClick={() => setSubStakingView(false)}>
                <Container direction="col" sx={{ ...modalStyled, width: 950 }}>
                    <Container sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <Typography variant='h3'>Explore SubStakings</Typography>
                    </Container>
                    <Container sx={{ maxHeight: 500, overflowY: 'auto', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset', p: 2 }}>
                        <Grid container sx={{ px: { xs: 6, md: 3 } }} spacing={3} justifyContent="center">
                            {
                                subStakings.map((item, index) => (
                                    <Grid key={index} item xs={12} md={4} justifyContent="center">
                                        {
                                            <ClientSubStakingCard
                                                updateStore={updateStore}
                                                projectId={projectId}
                                                masterStakeId={id}
                                                stakeToken={stakeToken}
                                                contractAddress={contractAddress}
                                                chainId={chainId}
                                                rewardTokenInfo={rewardTokenInfo}
                                                dividendTokenInfo={dividendTokenInfo}
                                                {...item}
                                            />
                                        }
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Container>
                </Container>
            </Modal>
        </Card>
    );
}
