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
import { updateNoLock, updateRewardPerBlockForNoLockup, updateStakeDurationForNoLockup, updateWalletAForNoLockup } from 'src/actions/firebase';
//
import { getTokenInfo, getContract } from 'src/utils/ContractHelper';
import checkEthereumAddress from 'src/utils/isEthereumAddress';
import isEmpty from 'src/utils/isEmpty';
import getFullContractLink from 'src/utils/getFullContractLink';
//
import { StakeTypes } from 'src/constants';
//
import StakeNoLockUp from 'src/contracts/StakeNoLockUp.json';


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


export default function AdminNoLockupCard({ projectId, id, chainId, contractAddress, stakeType, updateStore }) {

  const { library, account } = useWeb3React();

  const [stakeSettingView, setStakeSettingView] = useState(false);
  const [settingView, setSettingView] = useState(false);

  const [walletA, setWalletA] = useState('');
  const [slippage, setSlippage] = useState('');
  const [dexRouter, setDexRouter] = useState('');
  const [earnedToStakePath, setEarnedToStakePath] = useState([]);
  const [reflectionToStakePath, setReflectionToStakePath] = useState([]);

  const [stakeId, setStakeId] = useState(0);
  const [stakeDuration, setStakeDuration] = useState(0);
  const [depositFee, setDepositFee] = useState(0);
  const [withdrawFee, setWithdrawFee] = useState(0);
  const [rewardPerBlock, setRrewardPerBlock] = useState(0);
  const [rewardState, setRewardState] = useState(false);

  const [actionLoading, setActionLoading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Apply Settings');
  const [addButtonLabel, setAddButtonLabel] = useState('Create SubStaking');

  const updateMainSettings = async () => {
    if (!account) {
      startToast("error", "Please connect your wallet.");
      return false;
    }
    if (isEmpty([dexRouter, slippage, ...earnedToStakePath, ...reflectionToStakePath, depositFee, withdrawFee])) {
      startToast("error", "Please fill all fields.");
      return false;
    }
    if (!checkEthereumAddress([dexRouter, ...earnedToStakePath, ...reflectionToStakePath])) {
      startToast("error", "Please input valid Ethereum address.");
      return false;
    }
    try {
      setActionLoading(true);
      const contract = await getContract(StakeNoLockUp.abi, StakeNoLockUp.deployedBytecode, contractAddress, library?.getSigner());
      try {
        const tx = await contract.setSettings(depositFee, withdrawFee, slippage, dexRouter, earnedToStakePath, reflectionToStakePath);
        await tx.wait();
      } catch (e) {
        setActionLoading(false);
        console.log(e);
      }

      const result = await updateNoLock(projectId, id, {
        slippage: slippage,
        dexRouter: dexRouter,
        earnedToStakePath: earnedToStakePath,
        reflectionToStakePath: reflectionToStakePath,
        depositFee: depositFee,
        withdrawFee: withdrawFee
      })
      if (result) {
        updateStore()
        setActionLoading(false);
        startToast("success", "Stake params updated sucessfully.");
      } else {
        setActionLoading(false);
        startToast("error", "Something was wrong.");
      }
    } catch (e) {
      console.log("ERROR:", e);
      setActionLoading(false);
      startToast("error", "Something was wrong.");
    }
  }

  const updateRewardRate = async () => {
    if (!account) {
      startToast("error", "Please connect your wallet.");
      return false;
    }
    if (isEmpty([rewardPerBlock])) {
      startToast("error", "Please fill all fields.");
      return false;
    }
    try {
      setActionLoading(true);
      const contract = await getContract(StakeNoLockUp.abi, StakeNoLockUp.deployedBytecode, contractAddress, library?.getSigner());

      try {
        const tx = await contract.updateRewardPerBlock(rewardPerBlock);
        await tx.wait();
      } catch (e) {
        setActionLoading(false);
        console.log(e);
      }


      const result = await updateRewardPerBlockForNoLockup(projectId, id, rewardPerBlock);
      if (result) {
        updateStore();
        setActionLoading(false);
      } else {
        setActionLoading(false);
      }
    } catch (e) {
      setActionLoading(false);
      console.log(e);
    }
  }

  const updateStakeDuration = async () => {
    if (!account) {
      startToast("error", "Please connect your wallet.");
      return false;
    }
    if (isEmpty([stakeDuration])) {
      startToast("error", "Please fill all fields.");
      return false;
    }
    if (stakeDuration < 30) {
      startToast("error", "Stake duration must bigger than 30 days");
      return false;
    }
    try {
      setActionLoading(true);
      const contract = await getContract(StakeNoLockUp.abi, StakeNoLockUp.deployedBytecode, contractAddress, library?.getSigner());
      try {
        const tx = await contract.setDuration(stakeDuration);
        await tx.wait();
      } catch (e) {
        setActionLoading(false);
        console.log(e);
      }

      const result = await updateStakeDurationForNoLockup(projectId, id, stakeDuration);
      if (result) {
        updateStore()
        setActionLoading(false);
      } else {
        setActionLoading(false);
      }
    } catch (e) {
      setActionLoading(false);
      console.log(e);
    }
  }

  const updateWalletA = async () => {
    if (!account) {
      startToast("error", "Please connect your wallet.");
      return false;
    }
    if (isEmpty([walletA])) {
      startToast("error", "Please fill all fields.");
      return false;
    }

    if (!checkEthereumAddress([walletA])) {
      startToast("error", "Please input valid Ethereum address.");
      return false;
    }
    try {
      setActionLoading(true);
      const contract = await getContract(StakeNoLockUp.abi, StakeNoLockUp.deployedBytecode, contractAddress, library?.getSigner());

      try {
        const tx = await contract.updateWalletA(walletA);
        await tx.wait();
      } catch (e) {
        setActionLoading(false);
        console.log(e);
      }

      const result = await updateWalletAForNoLockup(projectId, id, walletA);
      if (result) {
        updateStore()
        setActionLoading(false);
      } else {
        setActionLoading(false);
      }
    } catch (e) {
      setActionLoading(false);
      console.log(e);
    }
  }

  const startReward = async () => {
    try {
      setActionLoading(true);
      const contract = await getContract(StakeNoLockUp.abi, StakeNoLockUp.deployedBytecode, contractAddress, library?.getSigner());
      const tx = await contract.startReward();
      await tx.wait();

      setRewardState(true);

      setActionLoading(false);
      startToast("success", "Now staking was enabled");
    } catch (e) {
      setActionLoading(false);
      console.log(e);
      startToast("error", "Something was wrong");
    }
  }

  const stopReward = async () => {
    try {
      setActionLoading(true);
      const contract = await getContract(StakeNoLockUp.abi, StakeNoLockUp.deployedBytecode, contractAddress, library?.getSigner());
      const tx = await contract.stopReward();
      await tx.wait();

      setRewardState(false);

      setActionLoading(false);
      startToast("success", "Now staking was stopped");
    } catch (e) {
      setActionLoading(false);
      console.log(e);
      startToast("error", "Something was wrong");
    }
  }

  useEffect(() => {
    (async () => {
      if (!account) {
        return false;
      }
      const contract = await getContract(StakeNoLockUp.abi, StakeNoLockUp.deployedBytecode, contractAddress, library?.getSigner());
      const startBlock = await contract.startBlock();

      if (startBlock.toNumber() > 0) {
        setRewardState(true)
      } else {
        setRewardState(false);
      }
    })()
  }, [])

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
              No-Lockup
            </Typography>
          </Container>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
            <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
              Type:
            </Typography>
            <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
              {stakeType?.replace(/_/g, '')}
            </Typography>
          </Container>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
            <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
              SubStakes:
            </Typography>
            <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
              0
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
            letterSpacing: 2,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
          }}
            onClick={() => setSettingView(true)}
          >
            Main Setting
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
              onClick={() => setStakeSettingView(true)}
            >
              Stake Setting
            </CardButton>
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 1 }}>
            <Link href={getFullContractLink(chainId, contractAddress)} target='_blank' sx={{ fontSize: 25, color: '#ba872a', textDecorationColor: '#ba872a' }}>View Contract</Link>
          </Container>
        </CardContent>
      </Card>
      <Modal open={stakeSettingView} onBackdropClick={() => setStakeSettingView(false)}>
        <Container direction="col" sx={{ ...modalStyled, width: 500, p: 3, justifyContent: 'center' }}>
          <Container sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <Typography variant='h3'>Stake Setting</Typography>
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input label="_rewardRate" value={rewardPerBlock} onChange={e => setRrewardPerBlock(e.target.value)} wrapperStyle={{ alignItems: 'center', width: '45%' }} labelStyle={{ fontSize: 25 }} placeholder="_%" style={{ justifyContent: 'center' }} />
            <Input label="_stakeDuration" value={stakeDuration} onChange={e => setStakeDuration(e.target.value)} wrapperStyle={{ alignItems: 'center', width: '45%' }} labelStyle={{ fontSize: 25 }} placeholder="_days" style={{ justifyContent: 'center' }} />
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
            <CardButton style={{ width: '45%', fontSize: 25, height: 45, borderRadius: 5 }} onClick={updateRewardRate} loading={actionLoading}>Update RewardRate</CardButton>
            <CardButton style={{ width: '45%', fontSize: 25, height: 45, borderRadius: 5 }} onClick={updateStakeDuration} loading={actionLoading}>Update Duration</CardButton>
          </Container>
          <Divider />
          <Container sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
            <CardButton style={{ width: '45%', fontSize: 25, height: 45, borderRadius: 5 }} onClick={startReward} loading={actionLoading} disabled={rewardState}>Start Reward</CardButton>
            <CardButton style={{ width: '45%', fontSize: 25, height: 45, borderRadius: 5 }} onClick={stopReward} loading={actionLoading} disabled={!rewardState}>Stop Reward</CardButton>
          </Container>
          <Divider sx={{ height: 5 }} />
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input label="Set WalletA" value={walletA} onChange={e => setWalletA(e.target.value)} wrapperStyle={{ alignItems: 'center', width: '100%' }} labelStyle={{ fontSize: 25 }} placeholder="0x...." style={{ justifyContent: 'center', width: '100%' }} />
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
            <CardButton style={{ width: '100%', fontSize: 25, height: 45 }} onClick={updateWalletA} loading={actionLoading}>Update WalletA</CardButton>
          </Container>
        </Container>
      </Modal>
      {/* End StakeSetting Modal */}
      {/* Start Master Setting Modal */}
      <Modal open={settingView} onBackdropClick={() => setSettingView(false)}>
        <Container direction="col" sx={{ ...modalStyled, width: 500, p: 3, justifyContent: 'center' }}>
          <Container sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <Typography variant='h3'>Main Setting</Typography>
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
            <Input label="_depositFee" value={depositFee} onChange={e => setDepositFee(e.target.value)} wrapperStyle={{ alignItems: 'center' }} labelStyle={{ fontSize: 25 }} placeholder="_%" style={{ justifyContent: 'center' }} />
            <Input label="_withdrawFee" value={withdrawFee} onChange={e => setWithdrawFee(e.target.value)} wrapperStyle={{ alignItems: 'center' }} labelStyle={{ fontSize: 25 }} placeholder="_%" style={{ justifyContent: 'center' }} />
          </Container>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
            <CardButton style={{ width: '100%', fontSize: 25, height: 45 }} onClick={updateMainSettings} loading={actionLoading}>{buttonLabel}</CardButton>
          </Container>
        </Container>
      </Modal>
    </>
  );
}
