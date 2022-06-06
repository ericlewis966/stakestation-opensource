import { useState } from 'react';
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { styled } from '@material-ui/core/styles';
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

import {IoIosAddCircle} from 'react-icons/io';

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

export default function AddNewCard({ label, to }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: '6px',
        background: 'linear-gradient(180deg, #000000 0%, #34314a 100%)',
        border: '1px solid yellow',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
      }}
    >
      <CardContent>
        <Typography variant="h4" color="grey.200" sx={{ mx: "auto", textAlign: 'center', marginBottom: 1 }}>
          {
            label
          }
        </Typography>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RouterLink to={to} style={{ width: '100%', color: '#F0B90B' }}>
            <IoIosAddCircle fontSize={100}/>
          </RouterLink>
        </Container>
      </CardContent>
    </Card>
  );
}
