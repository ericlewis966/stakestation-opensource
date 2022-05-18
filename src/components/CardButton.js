import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const CardButtonComponent = styled(Button)(({ style, errorStyle = false, active }) => ({
    ...style,
    border: `1px solid ${errorStyle ? '#e8424c' : '#F0B90B'}`,
    backgroundColor: !active ? 'transparent' : '#F0B90B',
    color: '#F0B90B',
    transition: '0.3s',
    '&:hover': {
        border: `2px solid ${errorStyle ? '#e8424c' : '#ba872a'}`,
        backgroundColor: errorStyle ? '#e8424c' : '#F0B90B',
        color: '#ffffff',
    }
}))

const CardButtonComponentErrorStyle = styled(Button)(({ style, errorStyle = true }) => ({
    ...style,
    border: `1px solid ${errorStyle ? '#e8424c' : '#F0B90B'}`,
    backgroundColor: 'transparent',
    color: errorStyle ? '#e8424c' : '#F0B90B',
    transition: '0.3s',
    '&:hover': {
        border: `2px solid ${errorStyle ? '#e8424c' : '#ba872a'}`,
        backgroundColor: errorStyle ? '#e8424c' : '#F0B90B',
        color: '#ffffff',
    }
}))

export default function CardButton({ children, style, onClick, errorStyle = false, active }) {
    return (
        !errorStyle ? <CardButtonComponent style={{ ...style }} onClick={onClick} active={active}> {children} </CardButtonComponent> :
            <CardButtonComponentErrorStyle style={{ ...style }} onClick={onClick} active={active}>
                {children}
            </CardButtonComponentErrorStyle>
    )
};