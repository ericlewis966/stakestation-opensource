//react
import {useState} from 'react';
// material
import { styled } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography, Stack } from '@material-ui/core'
import Pagination from '../../Pagination';

import Card from '../../Card'
//
import { useGlobalContext } from 'src/contexts/GlobalContext';
import SwitchViewMode from '../../SwitchViewMode';
import PublicLowItem from '../../PublicLowItem';
import { MotionInView, varFadeInUp, varFadeInDown } from '../../animate'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(12, 0),
  // backgroundColor: theme.palette.grey[900]
}))

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
}))

const Cards = [
  {
    avatar: '/images/team/mountain.jpg',
    name: 'MRF',
    bio: '?',
    twitter: 'https://twitter.com/soldiersofsol',
    telegram: '',
    description:
      'TBD',
  },
  {
    avatar: '/images/team/space.jpg',
    name: 'MRF',
    bio: '?',
    twitter: 'https://twitter.com/soldiersofsol',
    telegram: '',
    description:
      'TBD',
  },
  {
    avatar: '/images/team/tank.jpg',
    name: 'MRF',
    bio: '?',
    twitter: 'https://twitter.com/soldiersofsol',
    telegram: '',
    description:
      'TBD',
  },
  {
    avatar: '/images/team/mountain.jpg',
    name: 'MRF',
    bio: '?',
    twitter: 'https://twitter.com/soldiersofsol',
    telegram: '',
    description:
      'TBD',
  },
  {
    avatar: '/images/team/space.jpg',
    name: 'MRF',
    bio: '?',
    twitter: 'https://twitter.com/soldiersofsol',
    telegram: '',
    description:
      'TBD',
  },
  {
    avatar: '/images/team/tank.jpg',
    name: 'MRF',
    bio: '?',
    twitter: 'https://twitter.com/soldiersofsol',
    telegram: '',
    description:
      'TBD',
  },
]

// ----------------------------------------------------------------------

export default function FarmCards() {

  const { state, update } = useGlobalContext();

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <RootStyle>
      <Box sx={{ px: { xs: 0, md: 12 } }}>
        <Box
          component="img"
          alt="image shape"
          src="/static/home/shape.svg"
          sx={{
            top: 0,
            right: 0,
            bottom: 0,
            my: 'auto',
            position: 'absolute',
            filter: 'grayscale(1) opacity(48%)',
            display: { xs: 'none', md: 'block' },
          }}
        />
        <Typography
          color="white"
          variant="h1"
          sx={{
            textAlign: 'center',
            mb: 4,
            // fontSize: 100,
            fontWeight: 700,
          }}
        >
          Live Pools/Farms
        </Typography>
        <Container sx={{ p: 3, display: 'flex', justifyContent: 'right', marginBottom: 5 }}>
          <SwitchViewMode card={1} />
        </Container>

        <Grid container sx={{ px: { xs: 3, md: state.publicViewMode === 1 ? 20 : 12 } }} spacing={state.publicViewMode === 1 ? 8 : 2}>
          {Cards.map((item, index) => (
            state.publicViewMode === 1 ? <Grid key={index} item xs={12} md={4} justifyContent="center">
              <Card {...item} />
            </Grid> : <Grid key={index} item xs={12} md={0} justifyContent="center"><PublicLowItem {...item} /></Grid>
          ))}
        </Grid>
        <Pagination />
      </Box>
    </RootStyle>
  )
}