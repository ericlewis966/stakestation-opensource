import React from 'react';

import {
    Box,
    Container,
    Modal,
    Typography
} from "@material-ui/core";
import CardButton from './CardButton';

import { useGlobalContext } from 'src/contexts/GlobalContext';

const modalStyled = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#1d1e20',
    boxShadow: 24,
    borderRadius: 2,
    paddingBottom: 5,
};

const buttonStyled = {
    width: '100%',
    height: 45,
    marginTop: 15,
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 30,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    textAlign: 'left'
}

const SetNetwork = ({ open, onClose }) => {

    const { state, update } = useGlobalContext();

    const setChain = (chainId) => {
        update({
            selectedChain: chainId
        })
    }

    return (
        <Modal open={open} onBackdropClick={onClose}>
            <Container direction="col" sx={modalStyled}>
                <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography varient='h1' sx={{ display: 'flex', fontSize: 45, color: '#ffffff' }}>Select Network</Typography>
                </Container>
                <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CardButton style={buttonStyled} onClick={() => setChain(56)} >
                        <Box component="img" src="images/binance.png" sx={{ width: 30, marginRight: 2 }} />
                        Binance Smart Chain
                    </CardButton>
                </Container>
                <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CardButton style={buttonStyled} onClick={() => setChain(97)} >
                        <Box component="img" src="images/binance.png" sx={{ width: 30, marginRight: 2 }} />
                        BSC Testnet
                    </CardButton>
                </Container>
                <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CardButton style={buttonStyled} onClick={() => setChain(1)} >
                        <Box component="img" src="images/ethereum.png" sx={{ width: 30, marginRight: 2 }} />
                        Ethereum Network
                    </CardButton>
                </Container>
                <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CardButton style={buttonStyled} onClick={() => setChain(137)} >
                        <Box component="img" src="images/polygon.png" sx={{ width: 30, marginRight: 2 }} />
                        Polygon Network
                    </CardButton>
                </Container>
                <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CardButton style={buttonStyled} onClick={() => setChain(25)} >
                        <Box component="img" src="images/cronos.png" sx={{ width: 30, marginRight: 2 }} />
                        Cronos Network
                    </CardButton>
                </Container>
                <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CardButton style={buttonStyled} onClick={() => setChain(43114)} >
                        <Box component="img" src="images/avalanche.png" sx={{ width: 30, marginRight: 2 }} />
                        Avalanche Network
                    </CardButton>
                </Container>
                <Container direction="row" sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                    <CardButton style={buttonStyled} onClick={onClose} errorStyle>
                        CLOSE
                    </CardButton>
                </Container>
            </Container>
        </Modal>
    )
}

export default SetNetwork;