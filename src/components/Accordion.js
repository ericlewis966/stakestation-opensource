import { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Box,
    Container,
    Typography,
    Stack,
    Card,
    Collapse,
    CardMedia,
    CardContent,
    IconButton,
    CardActions,
    Link
} from '@material-ui/core';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: 'all .6s'
}));

export default function Accordion({ title, content, wrapperStyle }) {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Stack sx={wrapperStyle}>
            <Stack direction="row" sx={{width: 'fit-content'}}>
                <Typography variant="h3" sx={{transition: '0.3s', color: expanded ? '#F0B90B' : '#ffffff', textAlign: 'left'}}>{title}</Typography>
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </Stack>
            <Stack>
                <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ marginBottom: 0 }}>
                    <Typography variant="h4" sx={{fontSize: 30, textAlign: 'left'}}>{content}</Typography>
                </Collapse>
            </Stack>
        </Stack>
    )
}