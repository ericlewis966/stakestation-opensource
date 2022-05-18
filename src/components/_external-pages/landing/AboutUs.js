
// material
import { styled } from '@material-ui/core/styles'
import { Box, Grid, Typography, Stack } from '@material-ui/core'
import { AwesomeButton } from 'react-awesome-button'
//
import Accordion from '../../Accordion';
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate'
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
  '& .aws-btn': {
    '--button-default-font-size': '48px',
    '--button-large-height': '102px',
  },
}))

const accordionStyle = {
  "&.accordion-title": {
    border: '1px solid #F0B90B',
    color: 'yellow'
  }
}

export default function Faq() {
  return (
    <RootStyle>
      <Box sx={{ px: { xs: 3, md: 24 } }}>
        <Box sx={{ mb: { xs: 10, md: 25 } }}>
          <MotionInView variants={varFadeInUp}>
            <Typography
              sx={{
                textAlign: 'center',
                mb: 4,
                fontSize: 100,
                fontWeight: 700,
              }}
            >
              FAQ
            </Typography>
            <Stack direction="column" sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: 2,
              border: '2px solid rgba(255, 255, 255, 0.4)',
              marginTop: 10,
            }}>
              <Accordion title="What is MetaReflect?" content="MetaReflect is a High-Reward token on the Binance Smart Chain that rewards its holders in Binance USD Token (BUSD)." wrapperStyle={{p: 2}} />
              <Accordion title="When can I buy MetaRlflect?" content="MetaReflect is available on Pinksale.Finance it is available to 500 Whitelisted Wallet Addresses on February 20th at 5PM UTC." wrapperStyle={{p: 2}}/>
              <Accordion title="How can I Buy MetaReflect If I Missed Whitelist/Presale?" content="MetaReflect is a High-Reward token on the Binance Smart Chain that rewards its holders in Binance USD Token (BUSD)." wrapperStyle={{p: 2}} />
              <Accordion title="Will the liquidity be locked?" content="MetaReflect is a High-Reward token on the Binance Smart Chain that rewards its holders in Binance USD Token (BUSD)." wrapperStyle={{p: 2}} />
            </Stack>
          </MotionInView>
        </Box>
      </Box>
    </RootStyle>
  )
}
