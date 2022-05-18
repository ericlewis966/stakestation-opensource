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

// ----------------------------------------------------------------------

export default function MenuPopover({ avatar, name, bio, description, twitter, telegram }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        borderRadius: '16px',
        background: 'linear-gradient(180deg, #000000 0%, #34314a 100%)',
        border: '1px solid yellow',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
      }}
    >
      <CardMedia component="img" height="200" image={avatar} alt="Paella dish" sx={{
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
      }} />
      <CardContent>
        <Typography variant="h3" color="grey.200" sx={{ mx: "auto", height: 40, textAlign: 'center', marginBottom: 1 }}>
          Meta Reflect
        </Typography>
        <Stack direction="row">
          <Box
            component="img"
            src="/images/meta-reflect.png"
            alt="logo"
            sx={{ mx: "auto", width: 40, height: 40 }}
          />
          <Typography variant="h3" color="grey.200" sx={{ mx: "auto", height: 40 }}>
            {name}
          </Typography>
          <Box
            component="img"
            src="/images/binance.png"
            alt="logo"
            sx={{ mx: "auto", width: 40, height: 40 }}
          />
        </Stack>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RouterLink to='/project' style={{ width: '100%' }}>
            <CardButton style={{
              width: '100%',
              height: 45,
              marginTop: 15,
              borderRadius: 5,
              cursor: 'pointer',
              fontSize: 30,
              letterSpacing: 5,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }}>
              Enable
            </CardButton>
          </RouterLink>
        </Container>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ marginBottom: 0 }}>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
          <Typography variant='p' sx={{ fontSize: 25 }}>
            APR:
          </Typography>
          <Typography variant='p' sx={{ fontSize: 25 }}>
            300%
          </Typography>
        </Container>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
          <Typography variant='p' sx={{ fontSize: 25 }}>
            Time Left:
          </Typography>
          <Typography variant='p' sx={{ fontSize: 25 }}>
            300%
          </Typography>
        </Container>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
          <Typography variant='p' sx={{ fontSize: 25 }}>
            Network:
          </Typography>
          <Typography variant='p' sx={{ fontSize: 25 }}>
            300%
          </Typography>
        </Container>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 2 }} >
          <Typography variant='p' sx={{ fontSize: 25 }}>
            Staking Type:
          </Typography>
          <Typography variant='p' sx={{ fontSize: 25 }}>
            300%
          </Typography>
        </Container>
      </Collapse>
    </Card>
  );
}
