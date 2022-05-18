import { useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from "react-router-dom";
//web3 hook
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../../connectors";
//utils
import { toHex, truncateAddress, safeBalance } from '../../utils'
// material
import { alpha, styled } from "@material-ui/core/styles";
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Stack,
  Hidden,
  Modal,
  Typography,
} from "@material-ui/core";
import { AwesomeButton } from "react-awesome-button";
import { Icon } from "@iconify/react";
import twitterIcon from "@iconify/icons-cib/twitter";
import youtubeIcon from "@iconify/icons-cib/youtube";
import { FaUnlink } from 'react-icons/fa';
import { BiWalletAlt } from 'react-icons/bi';
import walletIcon from "@material-ui/icons/AccountBalanceWallet"
import CardButton from '../../components/CardButton';
import SetNetwork from 'src/components/SetNetwork';
// components
import Logo from "../../components/Logo";
//network label
import { Chain2Icon, Chain2Name, Chain2RPC_URL } from '../../network2label/networkLabel';
//context
import { useGlobalContext } from 'src/contexts/GlobalContext';

// ----------------------------------------------------------------------

const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_DESKTOP,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  borderBottom: "1px solid #ffffff",
  "& .aws-btn": {
    "--button-default-font-size": "28px",
    "--button-secondary-color": "#F0B90B",
    "--button-secondary-color-dark": "#ba872a",
    "--button-secondary-color-light": "white",
    "--button-secondary-border": "1px solid #ba872a",
    "--button-secondary-color-hover": "#F0B90B",
  },
}));

const modalStyled = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#1d1e20',
  boxShadow: 24,
  borderRadius: 2,
  paddingBottom: 5
};

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [modalView, setModalView] = useState(false);
  const [inventoryView, setInventoryView] = useState(false);
  const [showNetworkSetting, setShowNetworkSetting] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [userTokenBalance, setUserTokenBalance] = useState(0);

  const { account, activate, deactivate, chainId, library } = useWeb3React();

  const { state, update } = useGlobalContext();

  const connectInjected = () => {
    if (window.ethereum) {
      activate(injected);
      setModalView(false);
    }
  }

  const connectWalletConnect = () => {
    activate(walletconnect);
    setModalView(false);
  }

  const onConnectWallet = () => {
    if (account) {
      setInventoryView(true);
    } else {
      setModalView(true);
    }
  }

  const onDisconnectWallet = () => {
    deactivate();
    setInventoryView(false);
  }

  useEffect(() => {
    (async () => {
      if (account && window.ethereum) {
        if (chainId !== state.selectedChain) {
          console.log(chainId, state.selectedChain)
          try {
            library.provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: toHex(state.selectedChain) }]
            });
          } catch (switchError) {
            console.log("Switch Error", switchError);
            try {
              await library.provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: toHex(state.selectedChain),
                    chainName: Chain2Name[state.selectedChain],
                    rpcUrls: [Chain2RPC_URL[state.selectedChain]],
                  },
                ],
              });
            } catch (addError) {
              console.log("Add Error", addError);
            }
          }
        }
        const balance = await library.provider.request({
          method: "eth_getBalance",
          params: [account, 'latest']
        });
        setUserBalance(safeBalance(balance, 18));
      }
    })()
  }, [state.selectedChain, chainId, account])

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
      <ToolbarStyle disableGutters>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isHome ? (
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          ) : (
            <RouterLink to="/">
              <AwesomeButton
                type="secondary"
              >
                Home
              </AwesomeButton>
            </RouterLink>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Hidden mdDown>
            <Stack direction="row" spacing={3}>
              <RouterLink to="/admin">
                <AwesomeButton
                  type="secondary"
                >
                  Admin
                </AwesomeButton>
              </RouterLink>
              <AwesomeButton
                type="secondary"
                onPress={() => setShowNetworkSetting(true)}
              >
                <Box component="img" src={Chain2Icon[state.selectedChain]} sx={{ display: 'flex', width: 25, marginRight: 1 }} />
                {Chain2Name[state.selectedChain]}
              </AwesomeButton>
              <AwesomeButton type="secondary" onPress={onConnectWallet}>
                {
                  account ? truncateAddress(account) : <><BiWalletAlt />Connect Wallet</>
                }
              </AwesomeButton>
            </Stack>
          </Hidden>

          <Hidden mdUp>
            <Stack direction="row" spacing={1}>
              <RouterLink to="/admin">
                <AwesomeButton
                  type="secondary"
                >
                  Admin
                </AwesomeButton>
              </RouterLink>
              <AwesomeButton
                type="secondary"
                onPress={() => setShowNetworkSetting(true)}
              >
                <Box component="img" src={Chain2Icon[state.selectedChain]} sx={{ display: 'flex', width: 30, marginRight: 1 }} />
              </AwesomeButton>
              <AwesomeButton type="secondary" onPress={onConnectWallet}>
                {
                  account ? truncateAddress(account) : <BiWalletAlt />
                }
              </AwesomeButton>
            </Stack>
          </Hidden>

          <Modal open={modalView} onBackdropClick={() => setModalView(false)}>
            <Container direction="col" sx={modalStyled}>
              <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography varient='h1' sx={{ display: 'flex', fontSize: 45, color: '#ffffff' }}>Connect your Wallet</Typography>
              </Container>
              <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardButton style={{
                  width: '100%',
                  height: 45,
                  marginTop: 15,
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 30,
                  letterSpacing: 5,
                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                }}
                  onClick={connectInjected}
                >
                  <Box component="img" src="images/Metamask-icon.png" sx={{ width: 35, marginRight: 2 }} />
                  METAMASK
                </CardButton>
              </Container>
              <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardButton
                  style={{
                    width: '100%',
                    height: 45,
                    marginTop: 15,
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 30,
                    letterSpacing: 5,
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                  }}
                  onClick={connectWalletConnect}
                >
                  <Box component="img" src="images/WalletConnect-icon.png" sx={{ width: 35, marginRight: 2 }} />
                  WALLET CONNECT
                </CardButton>
              </Container>
              <Container direction="row" sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                <CardButton
                  style={{
                    width: '100%',
                    height: 45,
                    marginTop: 15,
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 30,
                    letterSpacing: 5,
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                  }}
                  onClick={() => setModalView(false)}
                  errorStyle
                >
                  CLOSE
                </CardButton>
              </Container>
            </Container>
          </Modal>
          <Modal open={inventoryView} onBackdropClick={() => setInventoryView(false)}>
            <Container direction="col" sx={modalStyled}>
              <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography varient='h1' sx={{ display: 'flex', fontSize: 45, color: '#ffffff' }}>Your Inventory</Typography>
              </Container>
              <Container direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography varient='h1' sx={{ display: 'flex', fontSize: 40, color: '#F0B90B' }}>Balance:</Typography>
                <Typography varient='h1' sx={{ display: 'flex', fontSize: 40, color: '#F0B90B' }}>{userBalance}</Typography>
              </Container>
              <Container direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography varient='h1' sx={{ display: 'flex', fontSize: 40, color: '#F0B90B' }}>MRF balance:</Typography>
                <Typography varient='h1' sx={{ display: 'flex', fontSize: 40, color: '#F0B90B' }}>{userBalance}</Typography>
              </Container>
              <Container direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardButton style={{
                  width: '100%',
                  height: 45,
                  marginTop: 15,
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 30,
                  letterSpacing: 5,
                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                }}
                  onClick={onDisconnectWallet}
                  errorStyle={true}
                >
                  {/* <Box component="img" src="images/disconnect.png" sx={{ width: 30, marginRight: 2 }} /> */}
                  <FaUnlink fontSize={25} />
                  &nbsp;
                  Disconnect
                </CardButton>
              </Container>
            </Container>
          </Modal>
          <SetNetwork open={showNetworkSetting} onClose={() => setShowNetworkSetting(false)} />
        </Container>
      </ToolbarStyle >
    </AppBar >
  );
}