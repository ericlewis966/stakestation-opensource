import { Slider, SliderThumb, styled } from '@material-ui/core'

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#F0B90B' : '#F0B90B',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        '&:focus, &:hover, &.Mui-active': {
            boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 22,
        fontWeight: 'normal',
        top: 0,
        backgroundColor: 'unset',
        color: '#F0B90B',
        '&:before': {
            display: 'none',
            color: '#F0B90B'
        },
        '& *': {
            background: 'transparent',
            color: '#F0B90B',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
        color: '#F0B90B',
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: 'currentColor',
        },
    },
}));

export default function SliderSelect({ onChange, defaultValue = 0, max = 1000 }) {

    const marks = [
        { value: 0, label: '0%' },
        { value: max / 4 * 1, label: '25%' },
        { value: max / 4 * 2, label: '50%' },
        { value: max / 4 * 3, label: '75%' },
        { value: max, label: '100%' }
    ];

    return (
        <IOSSlider
            aria-label="ios slider"
            defaultValue={defaultValue}
            marks={marks}
            max={max}
            onChange={onChange}
            valueLabelDisplay="on"
        />
    )
}