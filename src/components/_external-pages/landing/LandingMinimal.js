// material
import { styled } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography, Button, Stack } from '@material-ui/core'
import { AwesomeButton } from 'react-awesome-button'
import { Icon } from '@iconify/react'

import discordIcon from '@iconify/icons-cib/discord'
import telegramIcon from '@iconify/icons-cib/telegram'
import ImageScroll from '../../ImageScroll'
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(4),
  },
  '& .aws-btn': {
    '--button-default-font-size': '48px',
    '--button-large-height': '102px',
  },
}))

const StackStyle = {
  width: {lg: 250, md: 250, sm: 400, xs: 300},
  p: 4, 
  border: '1px solid #F0B90B', 
  alignItems: 'center', 
  borderRadius: 2, 
  boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
  backgroundColor: '#222222',
  marginBottom: 2
};

export default function LandingMinimalHelps() {
  return (
    <RootStyle>
      <Box sx={{ px: { xs: 3, md: 12 }, p: 5 }}>
        <MotionInView variants={varFadeInUp}>
          <Stack direction="row" sx={{display: 'flex', flexDirection: {lg: 'row', md: 'row', sm: 'column', xs: 'column'}, justifyContent: 'space-around', alignItems: 'center'}}>
            <Stack direction="column" sx={StackStyle}>
              <Typography variant='h4'>Total Staked</Typography>
              <Typography variant='h3'>$0.00</Typography>
            </Stack>
            <Stack direction="column" sx={StackStyle}>
              <Typography variant='h4'>Total Earned</Typography>
              <Typography variant='h3'>$0.00</Typography>
            </Stack>
            <Stack direction="column" sx={StackStyle}>
              <Typography variant='h4'>Total Reflected</Typography>
              <Typography variant='h3'>$0.00</Typography>
            </Stack>
          </Stack>
        </MotionInView>
      </Box>
    </RootStyle>
  )
}