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
import { Chain2Icon } from 'src/network2label/networkLabel';

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
    backgroundImage: `url(${background})`,
    backgroundSize: '100%',
    backgroundPosition: 'center center',
  }
}))

const DisabledCover = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgb(255, 255, 255, 0.1)',
  zIndex: 99,
  cursor: 'not-allowed'
}))
// ----------------------------------------------------------------------

export default function PublicLowItem({ id, tokenLogo, projectName, disabled = false, cryptoStakings, lpFarms, tokenSymbol, telegram, twitter, website, chain }) {

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '6px',
        border: !disabled ? '1px solid #F0B90B' : '1px solid #555555',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
      }}
    >
      {disabled ? <DisabledCover /> : <></>}
      <RouterLink to='/project' style={{ width: '100%', textDecoration: 'none', decorationColor: '#ffffff', color: '#ffffff' }}>
        <CardWrapper>
          <CardContent>
            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stack direction="row">
                <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40 }}>
                  Token:&nbsp;
                </Typography>
                <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40 }}>
                  {tokenSymbol}&nbsp;
                </Typography>
                <Box
                  component="img"
                  src={`data:image/png;base64, ${tokenLogo}`}
                  alt="logo"
                  sx={{ mx: "auto", width: 40, height: 40, borderRadius: 50, border: '2px solid #F0B90B' }}
                />
              </Stack>
              <Stack direction="row">
                <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40 }}>
                  Network:&nbsp;
                </Typography>
                <Box
                  component="img"
                  src={Chain2Icon[chain]}
                  alt="logo"
                  sx={{ mx: "auto", width: 40, height: 40 }}
                />
              </Stack>
              <Stack direction="row">
                <Typography variant='h4' sx={{ fontSize: 25 }}>
                  Staking: {cryptoStakings ? cryptoStakings : 0}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant='h4' sx={{ fontSize: 25 }}>
                  Farm: {lpFarms ? lpFarms : 0}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant='h4' sx={{ fontSize: 25 }}>
                  Project:
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40 }}>
                  {projectName}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </CardWrapper>
      </RouterLink>
    </Card>
  );
}
