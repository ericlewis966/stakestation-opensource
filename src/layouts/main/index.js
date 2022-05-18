import { Link as ScrollLink } from 'react-scroll'
import { useLocation, Outlet } from 'react-router-dom'
// material
import {
  Box,
  Link,
  Container,
  Typography,
  Stack,
  IconButton,
} from '@material-ui/core'
import { Icon } from '@iconify/react'
import discordIcon from '@iconify/icons-cib/discord'
import telegramIcon from '@iconify/icons-cib/telegram'
// components
import Logo from '../../components/Logo'
//
import MainNavbar from './MainNavbar'

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation()

  return (
    <Box sx={{ background: '#1d1e20' }}>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        spacing={3}
        alignItems="center"
        sx={{
          mt: 3,
          py: 5,
          borderTop: '1px solid rgba(255,255,255,0.2)',
          px: { xs: 5, md: 10 },
        }}
      >
        <ScrollLink to="move_top" spy smooth>
          <Typography variant="h4" sx={{color: '#F0B90B', cursor: 'pointer'}}>
            Copyright © 2022 MetaReflect.
          </Typography>
        </ScrollLink>
        <Stack direction="row" spacing={1}>
          <IconButton href="https://t.me/SoldiersOfSolana" target="_blank">
            <Icon icon={telegramIcon} />
          </IconButton>
          <IconButton href=" https://discord.gg/soldiers" target="_blank">
            <Icon icon={discordIcon} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  )
}