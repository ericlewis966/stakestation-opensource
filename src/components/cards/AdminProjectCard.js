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
import CardButton from 'src/components/CardButton';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function AminProjectCard({ id, projectName, cryptostakings, lpfarms }) {

  return (
    <Card
      sx={{
        borderRadius: '6px',
        background: 'linear-gradient(180deg, #000000 0%, #34314a 100%)',
        border: '1px solid yellow',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
      }}
    >
      <RouterLink to={`/admin/project/${id}`} style={{textDecorationColor: '#ffffff', textDecoration: 'none', color: '#ffffff'}}>
        <CardContent>
          <Typography variant="h4" color="grey.200" sx={{ mx: "auto", textAlign: 'center', marginBottom: 1 }}>
            {projectName}
          </Typography>
          <Stack direction="column">
            <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='h5'>Staking Project:&nbsp;</Typography>
              <Typography variant='h4' sx={{ color: '#F0B90B' }}>{
                cryptostakings
              }</Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='h5'>LP Farm:&nbsp;</Typography>
              <Typography variant='h4' sx={{ color: '#F0B90B' }}>{
                lpfarms
              }</Typography>
            </Stack>
          </Stack>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <RouterLink to={`/admin/editproject/${id}`} style={{ width: '100%' }}>
              <CardButton style={{
                width: '100%',
                height: 45,
                marginTop: 10,
                borderRadius: 5,
                cursor: 'pointer',
                fontSize: 25,
                letterSpacing: 5,
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
              }}>
                Customize
              </CardButton>
            </RouterLink>
          </Container>
        </CardContent>
      </RouterLink>
    </Card>
  );
}
