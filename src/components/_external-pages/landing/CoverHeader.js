import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { motion } from "framer-motion";
import { AwesomeButton } from "react-awesome-button";
import { styled } from "@material-ui/core/styles";
import { Box, Container, Typography, Stack } from "@material-ui/core";
import { varWrapEnter, varFadeInRight } from "../../animate";
import CardButton from "src/components/CardButton";

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: "relative",
  width: "100%",
  padding: 0,
  backgroundColor: theme.palette.grey[400],
  background: "url(/images/bg.jpg)",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} justifyContent="space-between" {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    margin: "auto",
    width: "100%",
    padding: 0,
    textAlign: "center",
    position: "relative",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up("md")]: {
      margin: "unset",
      textAlign: "left",
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(25),
    },
  })
);

const Title = styled((props) => <Typography {...props} />)(() => ({
  fontSize: "10rem",
  lineHeight: 1,
  fontFamily: "ThunderBolt2",
  textFillColor: "transparent",
  backgroundClip: "text !important",
  background: "url(/images/text-pattern.png)",
  fontWeight: 700,
  textAlign: "center",
  textTransform: "uppercase",
  // color: 'black',
  // textShadow:
  //   '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)'
}));

// ----------------------------------------------------------------------

export default function CoverHeader() {

  const { account } = useWeb3React();

  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <Container maxWidth="lg" sx={{ textAlign: "center", width: '100%', padding: 0}}>
          <ContentStyle>
            <motion.div variants={varFadeInRight} style={{ marginTop: 0, padding: 0, width: '100%' }}>
              <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, paddingLeft: '0 !important' , width: '100%', flexDirection: {lg: 'row', md: 'column', sm: 'column', xs: 'column'} }}>
                <Box sx={{ mx: 'auto', width: { lg: 450}, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: 0}}>
                  <motion.div variants={varFadeInRight}>
                    <Box
                      component="img"
                      src="/images/stakestation.png"
                      alt="logo"
                      sx={{ mx: "auto", width: 450 }}
                    />
                  </motion.div>
                  <Typography
                    variant="p"
                    color="white"
                    sx={{ mx: 'auto', width: { lg: 450, md: 450}, fontSize: 25, paddingLeft: 5, textAlign: {lg: 'left', md: 'left', sm: 'center', xs: 'center'} }}
                  >
                    MetaReflect coin works on an autonomous frictionless yield farming and liquidity generation protocol.
                    Simply hold $MetaReflect tokens in your wallet and earn passive income in Binance USD Just Hold And Accumulate Wealth!
                  </Typography>
                </Box>
                <Box
                  component="img"
                  src="/images/animation_logo.gif"
                  alt="logo"
                  sx={{ mx: "auto", width: 500, margin: 0 }}
                />
              </Container>
            </motion.div>

            <Stack direction="row" sx={{paddingLeft: {lg: 5, md: 5, sm: 0, xs: 0}, justifyContent: {lg: 'flex-start', md: 'flex-start', sm: 'center', xs: 'center'}}} >
              <motion.div variants={varFadeInRight}>
                <RouterLink to="/vision">
                  <CardButton style={{width: 200, height: 50, fontSize: 30}}>
                    MY FARMS
                  </CardButton>
                </RouterLink>
              </motion.div>
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}