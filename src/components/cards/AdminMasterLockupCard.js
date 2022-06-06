import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { styled } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Card,
  Collapse,
  CardMedia,
  CardContent,
  IconButton,
  CardActions,
  Link,
  Modal,
  Divider
} from '@material-ui/core';
import SubStakingCard from 'src/components/cards/AdminSubStakingCard'
import trim from 'src/utils/trim';
import CardButton from 'src/components/CardButton';
import Input from 'src/components/Input';
import { startToast } from 'src/components/Toast';
//db action
import { addSubStaking, updateMasterSettings } from 'src/actions/firebase';
//
import { getTokenInfo, getContract } from 'src/utils/ContractHelper';
import checkEthereumAddress from 'src/utils/isEthereumAddress';
import isEmpty from 'src/utils/isEmpty';
import getFullContractLink from 'src/utils/getFullContractLink';
//
import { StakeTypes } from 'src/constants';
//
import StakeLockUp from 'src/contracts/StakeLockUp.json';


// ----------------------------------------------------------------------

const modalStyled = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#1d1e20',
  boxShadow: 24,
  borderRadius: 2,
  paddingBottom: 5
};


const AdminMasterLockupCard = ({ projectId, stakeType, contractAddress, subStakings, masterStakeId, chainId, updateStore }) => {

  const { library, account } = useWeb3React();

  const [subStakeItems, setSubStakeItems] = useState(subStakings ? subStakings : []);

  const [subStakingView, setSubStakingView] = useState(false);
  const [settingView, setSettingView] = useState(false);

  const [walletA, setWalletA] = useState('');
  const [slippage, setSlippage] = useState('');
  const [dexRouter, setDexRouter] = useState('');
  const [earnedToStakePath, setEarnedToStakePath] = useState([]);
  const [reflectionToStakePath, setReflectionToStakePath] = useState([]);

  const [masterStakingId, setMasterStakingId] = useState(masterStakeId ? masterStakeId : 0);
  const [stakeId, setStakeId] = useState(0);
  const [stakeDuration, setStakeDuration] = useState(0);
  const [depositFee, setDepositFee] = useState(0);
  const [withdrawFee, setWithdrawFee] = useState(0);
  const [rewardPerBlock, setRrewardPerBlock] = useState(0);

  const [actionLoading, setActionLoading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Apply Settings');
  const [addButtonLabel, setAddButtonLabel] = useState('Create SubStaking');

  const updateSettings = async () => {
    if (!account) {
      startToast("error", "Please connect your wallet.");
      return false;
    }
    if (isEmpty([walletA, dexRouter, ...earnedToStakePath, ...reflectionToStakePath])) {
      startToast("error", "Please fill all fields.");
      return false;
    }
    if (!checkEthereumAddress([walletA, dexRouter, ...earnedToStakePath, ...reflectionToStakePath])) {
      startToast("error", "Please input valid Ethereum address.");
      return false;
    }
    try {
      setActionLoading(true);
      const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, contractAddress, library?.getSigner());
      const tx = await contract.setSettings(slippage, dexRouter, earnedToStakePath, reflectionToStakePath, walletA);
      await tx.wait();
      try {
        const result = await updateMasterSettings(projectId, masterStakingId, {
          slippage: slippage,
          dexRouter: dexRouter,
          earnedToStakePath: earnedToStakePath,
          reflectionToStakePath: reflectionToStakePath,
          walletA: walletA
        })
        if (result) {
          updateStore()
          setActionLoading(false);
          setButtonLabel("Updated Successfully");
          startToast("success", "Stake params updated sucessfully.");
        } else {
          setActionLoading(false);
          setButtonLabel("Oops...Try again");
          startToast("error", "Something was wrong.");
        }
      } catch (e) {
        setActionLoading(false);
        setButtonLabel("Oops...Try again");
        startToast("error", "Something was wrong.");
      }
    } catch (e) {
      console.log("ERROR:", e);
      setActionLoading(false);
      startToast("error", "Something was wrong.");
    }
  }

  const createSubStaking = async () => {
    if (!account) {
      startToast("error", "Please connect your wallet.");
      return false;
    }
    if (isEmpty([stakeDuration, depositFee, withdrawFee, rewardPerBlock])) {
      startToast("error", "Please fill all fields.");
      return false;
    }

    try {
      setActionLoading(true);
      const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, contractAddress, library?.getSigner());
      const tx = await contract.addLockup(stakeDuration, depositFee, withdrawFee, rewardPerBlock);
      await tx.wait();

      contract.on('LockupUpdated', async (id, duration, deposFee, withdrFee, rewardRate) => {
        console.log("Update event happened.");
        const result = await addSubStaking(projectId, masterStakingId, {
          id: id,
          stakeDuration: duration.toNumber(),
          depositFee: deposFee.toNumber(),
          withdrawFee: withdrFee.toNumber(),
          rewardPerBlock: rewardRate.toNumber()
        })

        if (result) {
          updateStore()
          setAddButtonLabel("Successfully created");
          setActionLoading(false);
        } else {
          setActionLoading(false);
          setAddButtonLabel("Oops... Try again.")
        }
      })
    } catch (e) {
      setActionLoading(false);
      console.log("ERROR:", e);
    }
  }

  useEffect(() => {
    (async () => {
      setStakeId(subStakings ? subStakings.length : 0);
    })()
  })

  useEffect(() => {
    setSubStakeItems(subStakings ? subStakings : []);
    setMasterStakingId(masterStakeId ? masterStakeId : 0);
  }, [projectId, stakeType, contractAddress, subStakings, masterStakeId, chainId, updateStore])

  useEffect(() => {
    setButtonLabel("Apply Settings");
  }, [walletA, dexRouter, slippage, earnedToStakePath, reflectionToStakePath])

  useEffect(() => {
    setAddButtonLabel('Create SubStaking');
  }, [stakeDuration, depositFee, withdrawFee, rewardPerBlock])

  return (
    <>
      <Card
        sx={{
          borderRadius: '6px',
          background: 'linear-gradient(180deg, #000000 0%, #34314a 100%)',
          border: '1px solid yellow',
          boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        }}
      >
        <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Typography variant='h4' sx={{ fontSize: 25, color: '#F0B90B' }}>
              Master LockUp
            </Typography>
          </Container>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
            <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
              Type:
            </Typography>
            <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
              { stakeType?.replace(/_/g, '') }
            </Typography>
          </Container>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
            <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
              SubStakes:
            </Typography>
            <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
              { subStakeItems.length }
            </Typography>
          </Container>
        </CardContent>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CardButton style={{
            width: '100%',
            height: 40,
            marginTop: 0,
            borderRadius: 5,
            cursor: 'pointer',
            fontSize: 25,
            letterSpacing: 5,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
          }}
            onClick={() => setSettingView(true)}
          >
            Setting
          </CardButton>
        </Container>
        <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CardButton style={{
              width: '100%',
              height: 40,
              marginTop: 0,
              borderRadius: 5,
              cursor: 'pointer',
              fontSize: 25,
              letterSpacing: 2,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }}
              onClick={() => setSubStakingView(true)}
            >
              SubStakings
            </CardButton>
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 1 }}>
            <Link href={getFullContractLink(chainId, contractAddress)} target='_blank' sx={{ fontSize: 25, color: '#ba872a', textDecorationColor: '#ba872a' }}>View Contract</Link>
          </Container>
        </CardContent>
      </Card>
      <Modal open={subStakingView} onBackdropClick={() => setSubStakingView(false)}>
        <Container direction="col" sx={{ ...modalStyled, width: 900 }}>
          <Container sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <Typography variant='h3'>Explore SubStakings</Typography>
          </Container>
          <Container sx={{ maxHeight: 500, overflowY: 'auto', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset' }}>
            <Grid container sx={{ px: { xs: 6, md: 3 } }} spacing={4} justifyContent="center">
              {
                subStakeItems.map((item, index) => (
                  <Grid key={index} item xs={12} md={4} justifyContent="center">
                    {
                      <SubStakingCard updateStore={updateStore} projectId={projectId} masterStakeId={masterStakingId} contractAddress={contractAddress} {...item} />
                    }
                  </Grid>
                ))
              }
            </Grid>
          </Container>
        </Container>
      </Modal>
      {/* End Substakings Modal */}
      {/* Start Master Setting Modal */}
      <Modal open={settingView} onBackdropClick={() => setSettingView(false)}>
        <Container direction="col" sx={{ ...modalStyled, width: 500, p: 3, justifyContent: 'center' }}>
          <Container sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <Typography variant='h3'>Master Stake Setting</Typography>
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input label="_slippageFactor" value={slippage} onChange={e => setSlippage(e.target.value)} wrapperStyle={{ alignItems: 'center' }} labelStyle={{ fontSize: 25 }} placeholder="_%" style={{ justifyContent: 'center' }} />
            <Input label="_dexRouter" value={dexRouter} onChange={e => setDexRouter(e.target.value)} wrapperStyle={{ alignItems: 'center' }} labelStyle={{ fontSize: 25 }} placeholder="0x...." style={{ justifyContent: 'center' }} />
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input label="_earnedToStakedPath" value={earnedToStakePath.toString()} onChange={e => setEarnedToStakePath(trim(e.target.value.split(',')))} wrapperStyle={{ alignItems: 'center' }} labelStyle={{ fontSize: 25 }} placeholder="0x....,0x...." style={{ justifyContent: 'center' }} />
            <Input label="_reflectionToStakedPath" value={reflectionToStakePath.toString()} onChange={e => setReflectionToStakePath(trim(e.target.value.split(',')))} wrapperStyle={{ alignItems: 'center' }} labelStyle={{ fontSize: 25 }} placeholder="0x....,0x...." style={{ justifyContent: 'center' }} />
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input label="Set WalletA" value={walletA} onChange={e => setWalletA(e.target.value)} wrapperStyle={{ alignItems: 'center', width: '100%' }} labelStyle={{ fontSize: 25 }} placeholder="0x...." style={{ justifyContent: 'center', width: '100%' }} />
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <CardButton style={{ width: '100%', fontSize: 25, height: 45 }} onClick={updateSettings} loading={actionLoading}>{buttonLabel}</CardButton>
          </Container>
          {/* End master setting */}
          <Divider sx={{ p: 1 }} />
          {/* Start add new substaking */}
          <Container sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
            <Typography variant='h3'>Create SubStaking</Typography>
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input label="stakeDuration" value={stakeDuration} onChange={e => setStakeDuration(e.target.value)} wrapperStyle={{ alignItems: 'center' }} labelStyle={{ fontSize: 25 }} placeholder="xxx" style={{ justifyContent: 'center' }} />
            <Input label="depositFee" value={depositFee} onChange={e => setDepositFee(e.target.value)} wrapperStyle={{ alignItems: 'center' }} labelStyle={{ fontSize: 25 }} placeholder="_%" style={{ justifyContent: 'center' }} />
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input label="withdrawFee" value={withdrawFee} onChange={e => setWithdrawFee(e.target.value)} wrapperStyle={{ alignItems: 'center' }} labelStyle={{ fontSize: 25 }} placeholder="_%" style={{ justifyContent: 'center' }} />
            <Input label="rewardPerBlock" value={rewardPerBlock} onChange={e => setRrewardPerBlock(e.target.value)} wrapperStyle={{ alignItems: 'center' }} labelStyle={{ fontSize: 25 }} placeholder="_%" style={{ justifyContent: 'center' }} />
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <CardButton style={{ width: '100%', fontSize: 25, height: 45 }} onClick={createSubStaking} loading={actionLoading}>{addButtonLabel}</CardButton>
          </Container>
        </Container>
      </Modal>
    </>
  );
}

export default AdminMasterLockupCard;