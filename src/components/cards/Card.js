import { useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
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
import CardButton from 'src/components/CardButton';
//
import { useGlobalContext } from 'src/contexts/GlobalContext';
//
import getAPR from 'src/utils/getAPR';
import { getContract } from 'src/utils/ContractHelper';
//
import StakeLockUp from 'src/contracts/StakeLockUp.json';
import StakeNoLockUp from 'src/contracts/StakeNoLockUp.json';
import LPFarm from 'src/contracts/LPFarm.json';
//
import StakeTypes from 'src/constants/staketypes';
import { Chain2BlockTime, Chain2Icon } from 'src/network2label/networkLabel';

// ----------------------------------------------------------------------

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: 'all .6s'
}));

const DisabledCover = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgb(255, 255, 255, 0.1)',
  zIndex: 99
}))

// ----------------------------------------------------------------------

export default function MenuPopover({ id, projectBanner, tokenLogo, projectName, disabled = false, cryptoStakings, lpFarms, tokenSymbol, telegram, twitter, website, chain }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { state } = useGlobalContext();
  const [APR, setAPR] = useState(0);


  useEffect(() => {
    // (async () => {
    //   if (contractAddress) {
    //     const provider = await ethers.providers.getDefaultProvider();
    //     let contract;
    //     if (stakeType === StakeTypes.LOCK_UP) {
    //       contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, provider);
    //     } else if(stakeType === StakeTypes.NO_LOCK_UP) {
    //       contract = await getContract(StakeNoLockUp.abi, StakeNoLockUp.deployedBytecode, provider);
    //     }
    //     const totalStaked = await contract.totalStaked();
    //     const blocksPerDay = Chain2BlockTime[state.selectedChain];
    //     const _APR = getAPR(rewardPerBlock, totalStaked, blocksPerDay);
    //     setAPR(_APR);
    //     console.log(rewardPerBlock, totalStaked, blocksPerDay)
    //   }
    // })()
  })

  return (
    <Card
      component="div"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '16px',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        background: '#373536',
        border: !disabled ? '1px solid #F0B90B' : '1px solid #555555',
        borderBottomWidth: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        position: 'relative',
        cursor: !disabled ? 'auto' : 'not-allowed',
        width: 350,
        height: 250
      }}
    >
      {disabled ? <DisabledCover /> : <></>}
      <CardMedia component="img" height="200" src={`data:image/png;base64, ${projectBanner}`} alt="Paella dish" sx={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', zIndex: 50
      }} />
      <Box component="div" sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.93))',
        zIndex: 55
      }} />
      <Stack direction="row" sx={{ justifyContent: 'space-between', position: 'relative', zIndex: 60, p: 2 }}>
        <Box component="img" src={`data:image/png;base64, ${tokenLogo}`} sx={{ display: 'flex', width: 40, borderRadius: 50, border: '1px solid #F0B90B' }} />
        <Box component="img" src={Chain2Icon[chain]} sx={{ display: 'flex', width: 40 }} />
      </Stack>
      <Stack direction="row" sx={{ justifyContent: 'space-between', position: 'relative', zIndex: 60, p: 2 }}>
        <Stack direction="column" sx={{ justifyContent: 'space-between', position: 'relative', zIndex: 60, p: 2 }}>
          <Typography variant='h4'>{projectName}</Typography>
          <RouterLink to={`/project/${id}`} style={{ width: '100%' }}>
            <CardButton style={{
              width: '100%',
              height: 30,
              width: 100,
              borderRadius: 5,
              cursor: 'pointer',
              fontSize: 20,
              letterSpacing: 1,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }} disabled={disabled}>
              Enable
            </CardButton>
          </RouterLink>
        </Stack>
        <Stack direction="column" sx={{ justifyContent: 'space-between', position: 'relative', zIndex: 60, p: 2 }}>
          {
            lpFarms > 0 ? <Typography variant='h4'>LP Farm</Typography> : <></>
          }
          {
            cryptoStakings > 0 ? <Typography variant='h4'>Staking</Typography> : <></>
          }
        </Stack>
      </Stack>
      {/* <Box height={150} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1A1B1F', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
        <Box component="div" sx={{ position: 'relative', display: 'flex', width: '50%' }}>
          <Box component="img" src={`data:image/png;base64, ${tokenLogo}`} sx={{ position: 'absolute', bottom: 10, right: 10, width: 100, border: '4px solid #F0B90B', borderRadius: 4 }} />
          <Box component="img" src={`data:image/png;base64, ${tokenLogo}`} sx={{ position: 'absolute', top: 15, left: 25, width: 60, border: '4px solid #F0B90B', borderRadius: 2 }} />
        </Box>
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingRight: 3 }}>
          <Stack direction="row">
            <Typography variant='h4'>
              Staking&nbsp;
            </Typography>
            <Typography variant='h4' sx={{ color: '#F0B90B' }}>
              {cryptoStakings}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant='h4'>
              Farm&nbsp;
            </Typography>
            <Typography variant='h4' sx={{ color: '#F0B90B' }}>
              {lpFarms}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h4" color="grey.200" sx={{ display: 'flex', mx: "auto", height: 40, width: '100%', textAlign: 'left' }}>
            Network:&nbsp;
          </Typography>
          <Box component="img" src={Chain2Icon[chain]} sx={{ display: 'flex', width: 50 }} />
        </Stack>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40, width: '100%' }}>
            Project:&nbsp;
          </Typography>
          <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40, color: '#F0B90B' }}>
            {projectName}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40, width: '100%' }}>
            Token:&nbsp;
          </Typography>
          <Typography variant="h4" color="grey.200" sx={{ mx: "auto", height: 40, color: '#F0B90B' }}>
            {tokenSymbol}
          </Typography>
        </Stack>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RouterLink to={`/project/${id}`} style={{ width: '100%' }}>
            <CardButton style={{
              width: '100%',
              height: 45,
              marginTop: 15,
              borderRadius: 5,
              cursor: 'pointer',
              fontSize: 30,
              letterSpacing: 0,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }} disabled={disabled}>
              Go to project
            </CardButton>
          </RouterLink>
        </Container>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ marginBottom: 0, }}>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
          <Typography variant='p' sx={{ fontSize: 25 }}>
            Telegram:
          </Typography>
          <Typography variant='p' sx={{ fontSize: 25 }}>
            <RouterLink to={telegram} target="_blank" style={{ color: '#F0B90B', textDecorationColor: '#F0B90B' }}>
              {telegram ? telegram : "??"}
            </RouterLink>
          </Typography>
        </Container>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
          <Typography variant='p' sx={{ fontSize: 25 }}>
            Twitter:
          </Typography>
          <Typography variant='p' sx={{ fontSize: 25 }}>
            <RouterLink to={twitter} target="_blank" style={{ color: '#F0B90B', textDecorationColor: '#F0B90B' }}>
              {twitter ? twitter : "??"}
            </RouterLink>
          </Typography>
        </Container>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
          <Typography variant='p' sx={{ fontSize: 25 }}>
            Website:
          </Typography>
          <Typography variant='p' sx={{ fontSize: 25 }}>
            <RouterLink to={website} target="_blank" style={{ color: '#F0B90B', textDecorationColor: '#F0B90B' }}>
              {website ? website : "??"}
            </RouterLink>
          </Typography>
        </Container>
      </Collapse> */}
    </Card>
  );
}
