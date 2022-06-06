import { styled } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';

const CardButtonComponent = styled(Button)(({ style, errorStyle = false, active, disabled }) => ({
    ...style,
    border: `1px solid ${errorStyle ? '#e8424c' : (disabled ? '#3b3c3c' : '#F0B90B')}`,
    backgroundColor: !active ? 'transparent' : '#F0B90B',
    color: '#F0B90B',
    transition: '0.3s',
    cursor: !disabled ? 'auto' : 'not-allowed',
    '&:hover': {
        border: `1px solid ${errorStyle ? '#e8424c' : '#ba872a'}`,
        backgroundColor: errorStyle ? '#e8424c' : '#F0B90B',
        color: '#ffffff',
    },
    '&:disabled': {
        cursor: 'not-allowed !important'
    }
}))

const CardButtonComponentErrorStyle = styled(Button)(({ style, errorStyle = true, disabled }) => ({
    ...style,
    border: `1px solid ${errorStyle ? '#e8424c' : '#F0B90B'}`,
    backgroundColor: 'transparent',
    color: errorStyle ? '#e8424c' : '#F0B90B',
    transition: '0.3s',
    cursor: !disabled ? 'auto' : 'not-allowed',
    '&:hover': {
        border: `2px solid ${errorStyle ? '#e8424c' : '#ba872a'}`,
        backgroundColor: errorStyle ? '#e8424c' : '#F0B90B',
        color: '#ffffff',
    },
    '&:disabled': {
        cursor: 'not-allowed !important'
    }
}))

export default function CardButton({ children, style, onClick, errorStyle = false, active, disabled = false, loading = false }) {
    return (
        !errorStyle ? <CardButtonComponent style={{ ...style }} onClick={onClick} active={active} disabled={disabled || loading}> {
            !loading ? children : <Box component="img" src="/images/loading.svg" sx={{width: 30}} />
        } </CardButtonComponent> :
            <CardButtonComponentErrorStyle style={{ ...style }} onClick={onClick} active={active} disabled={disabled || loading}>
                {!loading ? children : <Box component="img" src="/images/loading.svg" sx={{width: 30}}/>}
            </CardButtonComponentErrorStyle>
    )
};