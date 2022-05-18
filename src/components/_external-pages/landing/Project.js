// material
import { styled } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography, Link, Stack } from '@material-ui/core'
import { AwesomeButton } from 'react-awesome-button'
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate'
import InternalCard from '../../InternalCard';
import SwitchViewMode from 'src/components/SwitchViewMode';
//Context
import { useGlobalContext } from 'src/contexts/GlobalContext';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  background: 'url(/images/bg.png)',
  backgroundPosition: 'center center',
  zIndex: 0,
  '& .aws-btn': {
    '--button-default-font-size': '60px',
    '--button-large-height': '80px',
    '--button-secondary-color': '#fafafa',
    '--button-secondary-color-dark': '#67cbc3',
    '--button-secondary-color-light': '#349890',
    '--button-secondary-color-hover': '#ecf9f8',
    '--button-secondary-border': '2px solid #b3e5e1',
  },
}))

const OverlayStyle = styled('div')(({theme}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: -1
}))

const ContentStyle = styled('div')(({ theme }) => ({
  '& .aws-btn': {
    '--button-default-font-size': '42px',
    '--button-large-height': '80px',
    '--button-secondary-color': '#fafafa',
    '--button-secondary-color-dark': '#67cbc3',
    '--button-secondary-color-light': '#349890',
    '--button-secondary-color-hover': '#ecf9f8',
    '--button-secondary-border': '2px solid #b3e5e1',
  },
}))

const Title = styled((props) => <Typography {...props} />)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '10rem',
  lineHeight: 1,
  // fontFamily: 'ThunderBolt2',
  textFillColor: '#ffffff',
  backgroundClip: 'text !important',
  fontWeight: 700,
  textAlign: 'center',
  textTransform: 'uppercase',
  color: 'black',
  [theme.breakpoints.down('sm')]: {
    fontSize: '5rem',
  },
}))

const Inline = styled('p')(() => ({
  display: 'inline',
  color: '#F0B90B',
}))

const Cards = [
  {
    networkLogo: '/images/binance.png',
    stakingToken: '/images/mrf.jpg',
    rewardToken: '/images/mrf.jpg',
    category: 1
  },
  {
    networkLogo: '/images/binance.png',
    stakingToken: '/images/mrf.jpg',
    rewardToken: '/images/mrf.jpg',
    category: 2
  },
  {
    networkLogo: '/images/binance.png',
    stakingToken: '/images/mrf.jpg',
    rewardToken: '/images/mrf.jpg',
    category: 1
  },
  {
    networkLogo: '/images/binance.png',
    stakingToken: '/images/mrf.jpg',
    rewardToken: '/images/mrf.jpg',
    category: 2
  },
  {
    networkLogo: '/images/binance.png',
    stakingToken: '/images/mrf.jpg',
    rewardToken: '/images/mrf.jpg',
    category: 1
  },
  {
    networkLogo: '/images/binance.png',
    stakingToken: '/images/mrf.jpg',
    rewardToken: '/images/mrf.jpg',
    category: 2
  },
]

export default function Project() {

  const { state, update } = useGlobalContext();

  return (
    <>
      <RootStyle>
        <OverlayStyle />
        <MotionInView variants={varFadeInUp} sx={{zIndex: 1}}>
          <Title>
            <Box component="img" src='images/binance.png' sx={{ width: 60, height: 60, display: 'inline', marginRight: 1 }} />
            <Typography variant="h1">Meta Reflect</Typography>
            <Box component="img" src='images/binance.png' sx={{ width: 60, height: 60, display: 'inline', marginLeft: 1 }} />
          </Title>
          <Typography variant="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Hold your <Inline sx={{ color: '#F0B90B' }}>MRF</Inline> tokens for great benefits !
          </Typography>
          <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Link href='https://bscscan.com/address/0x44500d3a280a2f79af6914918c1ae09ef8d7510a#code' target="_blank" style={{color: '#ffffff', textDecorationColor: '#ffffff' }}>
              <Typography component="h1" sx={{fontSize: {lg: 30, md: 30, sm: 20, xs: 20}, textAlign: 'center' }}>
                Token Address: 0x44500d3a280a2f79af6914918c1ae09ef8d7510a
              </Typography>
            </Link>
          </Container>
        </MotionInView>
      </RootStyle>
      <ContentStyle>
        <Container
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: 2,
            border: '2px solid rgba(255, 255, 255, 0.4)',
            marginTop: 20
          }}
        >
          <Typography
            sx={{
              mb: 4,
              lineHeight: 1,
              fontSize: 100,
              fontWeight: 700,
            }}
          >
            Staking Pool
          </Typography>
          <Grid container sx={{ px: { xs: 6, md: 8} }} spacing={8}>
            {
              Cards.filter(item => item.category === 1).map((item, index) => (
                <Grid key={index} item xs={12} md={4} justifyContent="center">
                  <InternalCard {...item} />
                </Grid>
              ))
            }
          </Grid>
        </Container>
        <Container
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: 2,
            border: '2px solid rgba(255, 255, 255, 0.4)',
            marginTop: 10,
          }}
        >
          {/* <Stack sx={{backgroundImage: 'url(\'images/farming.jpg\')'}}> */}
          <Typography
            sx={{
              mb: 4,
              lineHeight: 1,
              fontSize: 100,
              fontWeight: 700,
            }}
          >
            LP Farming
          </Typography>
          {/* </Stack> */}
          <Grid container sx={{ px: { xs: 6, md: 8} }} spacing={8}>
            {
              Cards.filter(item => item.category === 2).map((item, index) => (
                <Grid key={index} item xs={12} md={4} justifyContent="center">
                  <InternalCard {...item} />
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </ContentStyle>
    </>
  )
}