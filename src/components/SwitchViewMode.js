import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import {
    Box,
    Stack,
} from '@material-ui/core';

import { useToasts } from 'react-toast-notifications'

import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';

import { useGlobalContext } from 'src/contexts/GlobalContext';


const SwitchViewMode = ({ card }) => {

    const { state, update } = useGlobalContext();

    const { addToast } = useToasts();

    const styleChangedCondition = (state.publicViewMode === 1 && card === 1) || (state.internalViewMode === 1 && card === 2);

    const switchContainerStyle = {
        p: 2,
        borderBottom: '1px solid #F0B90B',
        width: 'fit-content',
    };
    const switchButtonStyle = {
        fontSize: 20,
        cursor: 'pointer',
    };

    const gridViewStyle = {
        color: styleChangedCondition ?  '#F0B90B' : '#ffffff'
    }

    const listViewStyle = {
        color: styleChangedCondition ? '#ffffff' : '#F0B90B'
    }

const switchMode = (mode) => {
    if(window.innerWidth <= 600) {
        update({ publicViewMode: 1 });
        addToast("Can't turn on list mode in mobile device.", {
            appearance: 'warning',
            autoDismiss: true,
        });
        return;
    }
    switch (card) {
        case 1:
            update({ publicViewMode: mode })
            break;
        case 2:
            update({ internalViewMode: mode })
            break;
        default:
            break;
    }
}

useEffect(() => {
    if(window.innerWidth <= 600) {
        update({ publicViewMode: 1 })
    }
})

return (
    <>
        <Box sx={{}}>
            <Stack direction="row" gap={2} sx={switchContainerStyle}>
                <Box sx={{...switchButtonStyle, ...gridViewStyle}} onClick={() => switchMode(1)}>
                    <BsFillGrid3X3GapFill />
                </Box>
                <Box sx={{...switchButtonStyle, ...listViewStyle}} onClick={() => switchMode(2)}>
                    <FaThList />
                </Box>
            </Stack>
        </Box>
    </>
)
}


export default SwitchViewMode;

