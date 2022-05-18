import React from 'react';
import { Box } from "@material-ui/core";

// import binance from 'images/binance.png';
// import ethereum from 'images/ethereum.png';
// import polygon from 'images/polygon.png';
// import cronos from 'images/cronos.png';
// import avalanche from 'images/avalanche.png';

export const Chain2Icon = {
    1: 'images/ethereum.png',
    25: 'images/cronos.png',
    56: 'images/binance.png',
    97: 'images/binance.png',
    137: 'images/polygon.png',
    43114: 'images/avalanche.png'
}

// export const Chain2Icon = {
//     1: <Box component='img' src='images/ethereum.png'/>,
//     25: <Box component='img' src='images/cronos.png'/>,
//     56: <Box component='img' src='images/binance.png'/>,
//     137: <Box component='img' src='images/polygon.png'/>,
//     43114: <Box component='img' src='images/avalanche.png'/>
// }

export const Chain2Name = {
    1: 'Ethereum Network',
    25: 'Cronos Network',
    56: 'Binance Smart Chain',
    97: 'BSC Testnet',
    137: 'Polygon Network',
    43114: 'Avalanche Network'
};

export const Chain2RPC_URL = {
    1: 'https://mainnet.infura.io/v3/',
    25: 'https://evm-t3.cronos.org',
    56: 'https://bsc-dataseed1.defibit.io/',
    137: 'https://rpc-mainnet.matic.network',
    43114: 'https://api.avax.network/ext/bc/C/rpc'
}