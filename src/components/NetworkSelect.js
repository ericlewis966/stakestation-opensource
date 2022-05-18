import React from 'react';

import {
    Box,
    Container,
    Modal,
    Typography,
    Stack
} from "@material-ui/core";


const BoxStyle = {
    transition: '0.3s',
    cursor: 'pointer',
    borderRadius: 1,
    '&: hover': {
        backgroundColor: '#F0B90B'
    }
}

export default function NetworkSelect({ label, labelStyle, style }) {
    return (
        <Stack direction="column">
            <Typography variant='p' sx={labelStyle}>{label}</Typography>
            <Stack direction="row" sx={{borderBottom: '1px solid #F0B90B', width: 200, height: 40, justifyContent: 'space-between', ...style}}>
                <Box component="img" src="images/binance.png" sx={{ width: 35, ...BoxStyle}} />
                <Box component="img" src="images/ethereum.png" sx={{ width: 35, ...BoxStyle}} />
                <Box component="img" src="images/polygon.png" sx={{ width: 35, ...BoxStyle}} />
                <Box component="img" src="images/cronos.png" sx={{ width: 35, ...BoxStyle}} />
                <Box component="img" src="images/avalanche.png" sx={{ width: 35, ...BoxStyle}} />
            </Stack>
        </Stack>
    )
}