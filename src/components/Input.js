import { styled, Stack, Typography } from "@material-ui/core"

const StyledInput = styled('input')(({style}) => ({
    ...style,
    outline: 'none',
    border: '1px solid #F0B90B',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 15,
    borderRadius: 4,
    height: 40,
    paddingLeft: 10 
}))

export default function Input({ className, value, onChange, onClick, placeholder, style, label, labelStyle, wrapperStyle, disabled}) {
    return (
        <Stack direction="column" sx={wrapperStyle}>
            <Typography variant="p" style={labelStyle}>{label}</Typography>
            <StyledInput className={className} value={value} onChange={onChange} onClick={onClick} placeholder={placeholder} style={style} disabled={disabled}/>
        </Stack>
    )
}