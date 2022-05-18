import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import {
    Box,
    Typography,
    Stack,
} from '@material-ui/core';

import { FaCoins } from 'react-icons/fa';
import { RiPlantFill } from 'react-icons/ri';

import { useGlobalContext } from 'src/contexts/GlobalContext';


const SelectBox = styled('select')(({style}) => ({
    ...style,
    border: '1px solid #F0B90B',
    borderRadius: 5,
    color: '#ffffff',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    "&:after": {
        color: 'yellow',
        background: 'transparent',
        backgroundColor: 'transparent'
    }
}))

const OptionItem = styled('option')(() => ({
    background: 'transparent',
    backgroundColor: 'transparent'
}))

const Switch = ({label, labelStyle, options, style, onChange, disabled, value}) => {

    const { state, update } = useGlobalContext();

    const switchContainerStyle = {
        p: 2,
        borderBottom: '1px solid #F0B90B',
        width: 'fit-content',
    };
    const switchButtonStyle = {
        fontSize: 20,
        cursor: 'pointer',
    };

return (
    <>
        <Box sx={{}}>
            <Stack direction="row" gap={2} sx={switchContainerStyle}>
                <Typography variant='p' sx={labelStyle}>{label}</Typography>
                {/* <Box sx={{...switchButtonStyle}} onClick={() => switchMode(1)}>
                    {leftSide}
                </Box>
                <Box sx={{...switchButtonStyle}} onClick={() => switchMode(2)}>
                    {rightSide}
                </Box> */}
                <SelectBox style={style} onChange={onChange} disabled={disabled} value={value}>
                    {
                        options.map((item, key)=>(
                            <OptionItem value={item.value} key={key}>{item.label}</OptionItem>
                        ))
                    }
                </SelectBox>
            </Stack>
        </Box>
    </>
)
}


export default Switch;

