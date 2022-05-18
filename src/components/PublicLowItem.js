import { useState } from 'react';
import { NavLink as RouterLink, useLocation } from "react-router-dom";
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
import { AwesomeButton } from 'react-awesome-button';
import CardButton from './CardButton';

// ----------------------------------------------------------------------

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: 'all .6s'
}));

const CardWrapper = styled('div')(({ background }) => ({
  width: '100%',
  height: '100%',
  // transition: '0.5s',
  cursor: 'pointer',
  background: '#1d1e20',
  backgroundSize: '100%',
  backgroundPosition: 'center center',
  paddingTop: 15,
  paddingBottom: 15,
  "&:hover": {
    background: `url(${background})`,
    backgroundSize: '100%',
    backgroundPosition: 'center center',
  }
}))
// ----------------------------------------------------------------------

export default function PublicLowItem({ avatar, name, bio, description, twitter, telegram }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        borderRadius: '6px',
        border: '1px solid yellow',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
      }}
    >
      <RouterLink to='/project' style={{ width: '100%', textDecoration: 'none', decorationColor: '#ffffff', color: '#ffffff' }}>
        <CardWrapper background={avatar}>
          <CardContent>
            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stack direction="row">
                <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40 }}>
                  Token:&nbsp;
                </Typography>
                <Box
                  component="img"
                  src="/images/meta-reflect.png"
                  alt="logo"
                  sx={{ mx: "auto", width: 40, height: 40 }}
                />
              </Stack>
              <Stack direction="row">
                <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40 }}>
                  Token:&nbsp;
                </Typography>
                <Box
                  component="img"
                  src="/images/binance.png"
                  alt="logo"
                  sx={{ mx: "auto", width: 40, height: 40 }}
                />
              </Stack>
              <Stack direction="row">
                <Typography variant='h4' sx={{ fontSize: 25 }}>
                  APR: 300%
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant='h4' sx={{ fontSize: 25 }}>
                  Time Left: 4 days
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant='h4' sx={{ fontSize: 25 }}>
                  Staking Type: LP Farm
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40 }}>
                  Project: {name}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </CardWrapper>
      </RouterLink>
    </Card>
  );
}
