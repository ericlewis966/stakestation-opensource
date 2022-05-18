import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Stack, Typography, styled } from '@material-ui/core';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#F0B90B',
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const Input = styled('input')(() => ({

}))

export default function StyledDropzone({contentText, sx, label, labelStyle}) {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: { 'image/*': [] } });

    const style = useMemo(() => ({
        ...sx,
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <Stack direction="column" sx={labelStyle}>
            <Typography variant="p">{label}</Typography>
            <Container sx={{backgroundColor: 'transparent'}}>
            <Stack {...getRootProps({ style })} sx={{backgroundColor: 'transparent'}} direction="column">
                <Input {...getInputProps()} />
                <Typography variant="p">{contentText}</Typography>
            </Stack>
        </Container>
        </Stack>
    );
}

<StyledDropzone />