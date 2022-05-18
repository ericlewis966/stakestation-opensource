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

// ----------------------------------------------------------------------

export default function LowItemHeader({ networkLogo, stakingToken, name, bio, description, twitter, telegram, category }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '16px',
                background: 'linear-gradient(180deg, #000000 0%, #34314a 100%)',
                border: '1px solid yellow',
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
            }}
        >
            <CardContent sx={{ width: '100%', paddingLeft: 0, paddingRight: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", }} >
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        APR
                    </Typography>
                    <Stack>
                        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", }} >
                            <Typography variant='p' sx={{ fontSize: 20 }}>
                                MRF Earned
                            </Typography>
                        </Container>
                    </Stack>
                    {
                        category == 1 ? <Stack>
                            <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", }} >
                                <Typography variant='p' sx={{ fontSize: 20 }}>
                                    BUSD Reflected
                                </Typography>
                            </Container>
                        </Stack> : <></>
                    }
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Stake
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Reward
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Reflection
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Deposit Fee
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Withdraw Fee
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Staked Amount
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 20 }}>
                        Time Left
                    </Typography>
                    <Typography variant='p' sx={{ width: '10%', fontSize: 20 }}>
                        Action
                    </Typography>
                </Container>
            </CardContent>
        </Card>
    );
}
