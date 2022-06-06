import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { connect } from 'react-redux';
// material
import { styled } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography, Link, Stack } from '@material-ui/core'
import { AwesomeButton } from 'react-awesome-button'
import { BookLoader } from 'react-awesome-loaders';
//
import { BsTelegram } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate'
import ClientNoLockupCard from 'src/components/cards/ClientNoLockupCard';
import ClientMasterLPFarmCard from 'src/components/cards/ClientMasterLPFarmCard';
import ClientSubStakingCard from 'src/components/cards/ClientSubStakingCard';
import ClientSubFarmCard from 'src/components/cards/ClientSubFarmCard';
//Context
import { useGlobalContext } from 'src/contexts/GlobalContext';
//
import { getProjectById } from 'src/actions/firebase';
//
import { Chain2Icon, Chain2Explorer } from 'src/network2label/networkLabel';
import StakeTyeps from 'src/constants/staketypes';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
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

const WrapperStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  zIndex: 60,
}))

const OverlayStyle = styled('div')(({ theme }) => ({
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

const Project = ({ getProjectById, project }) => {

  const { state, update } = useGlobalContext();
  const { id } = useParams();
  const { account, library } = useWeb3React();

  const updateStore = async () => {
    await getProjectById(id);
  }

  useEffect(() => {
    (async () => {
      await getProjectById(id);
    })()
  }, [getProjectById, account])

  return (
    <>
      <RootStyle>
        <Box component="img" src={`data:image/jpg;base64, ${project.projectBanner}`} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        <WrapperStyle>
          <OverlayStyle />
          <MotionInView variants={varFadeInUp} sx={{ zIndex: 1 }}>
            <Title variant="div">
              <Box component="img" src={`data:image/png;base64, ${project.tokenLogo}`} sx={{ width: 60, height: 60, display: 'inline', marginRight: 1, borderRadius: 50, border: '1px solid #F0B90B' }} />
              <Typography variant="h1">{project?.projectName}</Typography>
              <Box component="img" src={`data:image/png;base64, ${project.tokenLogo}`} sx={{ width: 60, height: 60, display: 'inline', marginLeft: 1, borderRadius: 50, border: '1px solid #F0B90B' }} />
            </Title>
            <Typography variant="h2" sx={{ mb: 4, textAlign: 'center' }}>
              Hold your <Inline sx={{ color: '#F0B90B' }}>{project.tokenSymbol}</Inline> tokens for great benefits !
            </Typography>
            <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Link href={`${Chain2Explorer[project.chain]}/address/${project.tokenAddress}`} target="_blank" style={{ color: '#ffffff', textDecorationColor: '#ffffff' }}>
                <Typography component="h1" sx={{ fontSize: { lg: 30, md: 30, sm: 20, xs: 20 }, textAlign: 'center' }}>
                  Token Address: {project.tokenAddress}
                </Typography>
              </Link>
            </Container>
            <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, marginTop: 5 }}>
              {
                project.telegram ? <Link href={project.telegram} target="_blank" style={{ color: '#ffffff', textDecorationColor: '#ffffff' }}>
                  <BsTelegram fontSize={40} color="#F0B90B" />
                </Link> : <></>
              }
              {
                project.twitter ? <Link href={project.twitter} target="_blank" style={{ color: '#ffffff', textDecorationColor: '#ffffff' }}>
                  <AiFillTwitterCircle fontSize={40} color="#F0B90B" />
                </Link> : <></>
              }
              {
                project.website ? <Link href={project.website} target="_blank" style={{ color: '#ffffff', textDecorationColor: '#ffffff' }}>
                  <CgWebsite fontSize={40} color="#F0B90B" />
                </Link> : <></>
              }
            </Container>
          </MotionInView>
        </WrapperStyle>

      </RootStyle>
      <ContentStyle>
        <Container
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 2,
            border: '2px solid rgba(255, 255, 255, 0.4)',
            marginTop: 20,
            paddingBottom: 10
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
          {
            project.cryptostakings ? <Grid container sx={{ px: { xs: 6, md: 8 } }} spacing={8}>
              {
                project.cryptostakings.map((item, index) => (
                  item.stakeType === StakeTyeps.LOCK_UP && item?.subStakings ? item.subStakings.map((subItem, subIndex) => (
                    <Grid key={index + subIndex} item xs={12} md={4} justifyContent="center">
                      <ClientSubStakingCard tokenLogo={project.tokenLogo} stakeTokenInfo={item.stakeTokenInfo} contractAddress={item.contractAddress} chainId={item.chainId} rewardTokenInfo={item.rewardTokenInfo} dividendTokenInfo={item.dividendTokenInfo} stakeToken={item.stakeToken} {...subItem} />
                    </Grid>
                  )) :
                    <Grid key={index} item xs={12} md={4} justifyContent="center">
                      <ClientNoLockupCard tokenLogo={project.tokenLogo} updateStore={updateStore}
                        projectId={id}
                        {...item}
                      />
                    </Grid>
                ))
              }
            </Grid> : <BookLoader
              background={"linear-gradient(135deg, #F0B90B, #F0B90B)"}
              desktopSize={"100px"}
              mobileSize={"80px"}
              textColor={"#F0B90B"}
            />
          }
        </Container>
        <Container
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 2,
            border: '2px solid rgba(255, 255, 255, 0.4)',
            marginTop: 10,
            paddingBottom: 10
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
          {
            project.lpfarms ? <Grid container sx={{ px: { xs: 6, md: 8 } }} spacing={8}>
              {
                project.lpfarms.map((item, index) => (
                  item.subFarms.map((subItem, subIndex) => (
                    <Grid key={index + subIndex} item xs={12} md={4} justifyContent="center">
                      <ClientSubFarmCard tokenLogo={project.tokenLogo} rewardTokenInfo={item.rewardTokenInfo} dividendTokenInfo={item.dividendTokenInfo ? item.dividendTokenInfo : null} contractAddress={item.contractAddress} chainId={item.chainId} {...subItem} />
                    </Grid>
                  ))
                ))
              }
            </Grid> : <BookLoader
              background={"linear-gradient(135deg, #F0B90B, #F0B90B)"}
              desktopSize={"100px"}
              mobileSize={"80px"}
              textColor={"#F0B90B"}
            />
          }
        </Container>
      </ContentStyle>
    </>
  )
}


const mapStateToProps = (state) => ({
  project: state.project.project
})

export default connect(mapStateToProps, { getProjectById })(Project);