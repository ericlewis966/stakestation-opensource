import React, {useState} from 'react';
import { useGlobalContext } from 'src/contexts/GlobalContext';
import { Chain2Icon, Chain2Name, Chain2RPC_URL } from '../network2label/networkLabel';

import {
    Box,
    Container,
    Modal,
    Typography,
    Stack
} from "@material-ui/core";

import SetNetwork from './SetNetwork';
import CardButton from './CardButton';


export default function NetworkSelect({ label, labelStyle, style, wrapperStyle }) {

    const [showNetworkSetting, setShowNetworkSetting] = useState(false);

    const { state, update } = useGlobalContext();

    return (
        <>
            <Stack direction="column" sx={wrapperStyle}>
                <Typography variant="p" style={labelStyle}>{label}</Typography>
                <CardButton style={{fontSize: 20, height: 40, ...style }} onClick={() => setShowNetworkSetting(true)}>
                    <Box component="img" src={Chain2Icon[state.selectedChain]} sx={{ display: 'flex', width: 25, marginRight: 1 }} />
                    {Chain2Name[state.selectedChain]}
                </CardButton>
            </Stack>
            <SetNetwork open={showNetworkSetting} onClose={() => setShowNetworkSetting(false)} />
        </>
    )
}