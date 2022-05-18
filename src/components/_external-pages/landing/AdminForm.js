//react
import {useState} from 'react';
// material
import { styled } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography, Button, Stack, Select, MenuItem, InputLabel } from '@material-ui/core'
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate'
//
import { FiCheck  } from 'react-icons/fi';
import CheckBox from 'react-custom-checkbox';
//
import CardButton from '../../CardButton';
import Input from '../../Input';
import StyledDropzone from 'src/components/Dropzone';
import Switch from '../../Switch';
import NetworkSelect from 'src/components/NetworkSelect';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  background: 'url(/images/black_background.jpg)',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center center',
  '& .aws-btn': {
    '--button-default-font-size': '48px',
    '--button-large-height': '102px',
  },
}))

const Title = styled((props) => <Typography {...props} />)(({ theme }) => ({
  fontSize: '7rem',
  lineHeight: 1,
  color: '#ffffff',
  textFillColor: '#ffffff',
  fontWeight: 700,
  textAlign: 'center',
  color: 'black',
  [theme.breakpoints.down('sm')]: {
    fontSize: '6rem',
  },
}))

export default function AdminForm() {

  const [projectType, setProjectType] = useState(1);
  const [stakeType, setStakeType] = useState(1);
  const [deployNew, setDeployNew] = useState(false);

  // const reflectionEnabled = projectType === 1 && stakeType ===1;

  return (
    <>
      <Container maxWidth="lg">
        <Container
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: 2,
            border: '2px solid rgba(255, 255, 255, 0.4)',
            marginTop: 20,
          }}
          direction="column"
        >
          <Typography
            sx={{
              mb: 4,
              lineHeight: 1,
              fontSize: 70,
              fontWeight: 700,
            }}
          >
            Manage Stakestation
          </Typography>
          <Container spacing={8} sx={{ p: 5, width: 500, height: 'fit-content', border: '1px solid #F0B90B', boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px', borderRadius: 1 }}>
            <Typography variant='h4'>Add Project</Typography>
            <Stack direction="row" spacing={7} paddingTop={2}>
              <Input placeholder="Project Name" label="Project Name" labelStyle={{ fontSize: 20 }} />
              <Input placeholder="Token Symbol" label="Token Symbol" labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="0x..." label="Token Address" wrapperStyle={{ width: '100% !important' }} style={{ width: '100% !important' }} labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2}>
              <Input placeholder="@" label="Telegram" labelStyle={{ fontSize: 20 }} />
              <Input placeholder="@" label="Twitter" labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="https://..." label="Project Website" wrapperStyle={{ width: '100% !important' }} style={{ width: '100% !important' }} labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="column" sx={{ p: 3 }} spacing={3}>
              <StyledDropzone sx={{ marginTop: 10 }} contentText="Drag project banner image and drop here" label="Project Banner" labelStyle={{ fontSize: 20 }} />
              <StyledDropzone sx={{ marginTop: 10 }} contentText="Drag cryptocurrency logo and drop here" label="Token Logo" labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="Write here..." label="Project Description" wrapperStyle={{ width: '100% !important', height: 100 }} style={{ width: '100% !important', height: '100%' }} labelStyle={{ fontSize: 20 }} />
            </Stack>
          </Container>

          <Container spacing={8} sx={{ p: 5, width: 500, height: 'fit-content', border: '1px solid #F0B90B', boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px', borderRadius: 1, marginTop: 5 }}>
            <Typography variant='h4'>Create Staking and Farming</Typography>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Switch label="Project:" labelStyle={{ fontSize: 20 }} onChange={(e) => setProjectType(e.target.value)} options={[{value: 1, label: 'Staking'}, {value: 2, label: 'LP Farming'}]} />
              <Switch label="Type:" labelStyle={{ fontSize: 20 }} onChange={(e) => setStakeType(e.target.value)} options={[{value: 1, label: 'Lockup'}, {value: 2, label: 'Non-Lockup'}]} disabled={projectType == 2} value={projectType == 2 ? 2 : stakeType} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="0x...." label="Stake Token" labelStyle={{ fontSize: 20 }} />
              <Input placeholder="0x...." label="Reward Token" labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="0x...." label="Dividend Token" labelStyle={{ fontSize: 20 }} />
              <Input placeholder="___%" label="Reward per Block" labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2}>
              <Input placeholder="___%" label="Deposit Fee" labelStyle={{ fontSize: 20 }} />
              <Input placeholder="___%" label="Withdraw Fee" labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="0x...." label="Dex Router" labelStyle={{ fontSize: 20 }} />
              <Input placeholder="0x...." label="Staking Contract" labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="___days" label="Staking Duration" labelStyle={{ fontSize: 20 }} />
              <NetworkSelect label="Select Network" labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2}>
              <Input placeholder="0x..." label="Earned, Stake Path" labelStyle={{ fontSize: 20 }} disabled={deployNew} />
              <Input placeholder="0x..." label="Reflection, Stake Path" labelStyle={{ fontSize: 20 }} disabled={deployNew} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <CheckBox onChange={(e) => setDeployNew(e)} icon={<FiCheck />} label="Deploy new Contract" borderColor="#F0B90B" style={{cursor: 'pointer', marginLeft: 20}} labelStyle={{ fontSize: 20, marginLeft: 10 }} />
              <CardButton style={{ width: '45%', fontSize: 25 }}>
                {
                  deployNew ? 'Create and Deploy' : 'Create'
                }
              </CardButton>
            </Stack>
          </Container>
        </Container>
      </Container>
    </>
  )
}