//react
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography, Button, Stack, Select, MenuItem, InputLabel } from '@material-ui/core'
import { startToast } from 'src/components/Toast';
//
import { useWeb3React } from '@web3-react/core';
//
import { FiCheck } from 'react-icons/fi';
import CheckBox from 'react-custom-checkbox';
//
import CardButton from 'src/components/CardButton';
import Input from 'src/components/Input';
import Switch from 'src/components/Switch';
import NetworkSelect from 'src/components/NetworkSelect';
//
import { deploy, getContract } from 'src/utils/ContractHelper';
import { removeNonObjectItemsFromArray } from 'src/utils/checkArray';
import isEmpty from 'src/utils/isEmpty';
import trim from 'src/utils/trim';
import checkEthereumAddress from 'src/utils/isEthereumAddress';
//
import StakeLockUp from 'src/contracts/StakeLockUp.json';
import StakeNoLockUp from 'src/contracts/StakeNoLockUp.json';
import LPFarm from 'src/contracts/LPFarm.json';
//
import { Address, StakeTypes } from 'src/constants';
//
import { addCryptoStakingToProject, addLpFarmToProject } from 'src/actions/firebase';

export default function EditStakeForm() {

  const [projectType, setProjectType] = useState(1);
  const [stakeType, setStakeType] = useState(1);
  const [deployNew, setDeployNew] = useState(false);

  const [isReflection, setIsReflection] = useState(1);
  const [stakeToken, setStakeToken] = useState("");
  const [rewardToken, setRewardToken] = useState("");
  const [dividendToken, setDividendToken] = useState("");
  const [dexRouter, setDexRouter] = useState("");
  const [stakingContract, setStakingContract] = useState("");
  const [lpToken, setLPToken] = useState("");
  const [earnedStakePath, setEarnedStakePath] = useState([]);
  const [reflectionStakePath, setReflectionStakePath] = useState([]);
  const [rewardPerBlock, setRewardPerBlock] = useState(0);
  const [depositFee, setDepositFee] = useState(0);
  const [withdrawFee, setWithdrawFee] = useState(0);
  const [allocPoint, setAllocPoint] = useState(0);

  const [actionLoading, setActionLoading] = useState(false);

  const { library, account } = useWeb3React();
  const { id, STAKE_TYPE } = useParams();
  const { zeroAddress } = Address;

  const createLockUp = async () => {
    if (!account) {
      startToast("warning", "Please connect your wallet.");
      return false;
    }

    if (isEmpty([stakeToken, rewardToken, dividendToken, dexRouter, earnedStakePath, reflectionStakePath, stakingContract])) {
      startToast("error", "Please fill all fields with valid value.");
      return false;
    }

    if (!checkEthereumAddress([stakeToken, rewardToken, dividendToken, dexRouter, stakingContract, ...earnedStakePath, ...reflectionStakePath])) {
      startToast("error", "Please input valid Ethereum address.");
      return false;
    }

    try {
      setActionLoading(true);
      const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, stakingContract, library?.getSigner());
      var tx = await contract.initialize(stakeToken, rewardToken, dividendToken, dexRouter, earnedStakePath, reflectionStakePath);
      await tx.wait();

      const dbResult = await addCryptoStakingToProject(id, {
        stakeType: StakeTypes.LOCK_UP,
        stakeToken: stakeToken,
        rewardToken: rewardToken,
        dividendToken: dividendToken,
        dexRouter: dexRouter,
        earnedStakePath: earnedStakePath,
        reflectionStakePath: reflectionStakePath,
        contractAddress: stakingContract,
        owner: account
      })

      if (dbResult) {
        startToast("success", "Crypto Staking successfully created.");
        setActionLoading(false);
      } else {
        startToast("error", "Something was wrong.");
        setActionLoading(false);
      }
    } catch (e) {
      startToast("error", "Transaction did not successed.");
      setActionLoading(false);
      return false;
    }
  }

  const createLockUpAndDeployNew = async () => {
    if (!account) {
      startToast("warning", "Please connect your wallet.");
      return false;
    }
    console.log([stakeToken, rewardToken, dividendToken, dexRouter, earnedStakePath, reflectionStakePath])
    if (isEmpty([stakeToken, rewardToken, dividendToken, dexRouter, earnedStakePath, reflectionStakePath])) {
      startToast("error", "Please fill all fields with valid value.");
      return false;
    }

    if (!checkEthereumAddress([stakeToken, rewardToken, dividendToken, dexRouter, ...earnedStakePath, ...reflectionStakePath])) {
      startToast("error", "Please input valid Ethereum address.");
      return false;
    }

    try {
      setActionLoading(true);
      const address = await deploy(StakeLockUp.abi, StakeLockUp.bytecode, library?.getSigner(), []);
      const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, address, library?.getSigner());
      var tx = await contract.initialize(stakeToken, rewardToken, dividendToken, dexRouter, earnedStakePath, reflectionStakePath);
      await tx.wait();

      const dbResult = await addCryptoStakingToProject(id, {
        stakeType: StakeTypes.LOCK_UP,
        stakeToken: stakeToken,
        rewardToken: rewardToken,
        dividendToken: dividendToken,
        dexRouter: dexRouter,
        earnedStakePath: earnedStakePath,
        reflectionStakePath: reflectionStakePath,
        contractAddress: address,
        owner: account
      })
      if (dbResult) {
        startToast("success", "Crypto Staking successfully created.");
        setActionLoading(false);
      } else {
        startToast("error", "Something was wrong.");
        setActionLoading(false);
      }

    } catch (e) {
      startToast("error", "Transaction did not successed.");
      setActionLoading(false);
      return false;
    }
  }

  const createNoLockUp = async () => {

    if (!account) {
      startToast("warning", "Please connect your wallet.");
      return false;
    }

    if (isEmpty([stakeToken, rewardToken, isReflection == 1 ? dividendToken : zeroAddress, rewardPerBlock, depositFee, withdrawFee, dexRouter, earnedStakePath, reflectionStakePath])) {
      startToast("error", "Please fill all fields with valid value.");
      return false;
    }

    if (!checkEthereumAddress([stakeToken, rewardToken, isReflection == 1 ? dividendToken : zeroAddress, dexRouter, ...earnedStakePath, ...reflectionStakePath])) {
      startToast("error", "Please input valid Ethereum address.");
      return false;
    }

    try {
      setActionLoading(true);
      const address = await deploy(StakeNoLockUp.abi, StakeNoLockUp.bytecode, library?.getSigner(), []);
      const contract = await getContract(StakeNoLockUp.abi, StakeNoLockUp.deployedBytecode, address, library?.getSigner());
      var tx = await contract.initialize(stakeToken, rewardToken, isReflection == 1 ? dividendToken : zeroAddress, rewardPerBlock, depositFee, withdrawFee, dexRouter, earnedStakePath, reflectionStakePath, Boolean(isReflection));
      await tx.wait();

      const dbResult = await addCryptoStakingToProject(id, {
        stakeType: StakeTypes.NO_LOCK_UP,
        stakeToken: stakeToken,
        rewardToken: rewardToken,
        dividendToken: dividendToken,
        dexRouter: dexRouter,
        earnedStakePath: earnedStakePath,
        reflectionStakePath: reflectionStakePath,
        contractAddress: address,
        rewardPerBlock: rewardPerBlock,
        hasDividend: Boolean(isReflection)
      })
      if (dbResult) {
        startToast("success", "Crypto Staking successfully created.");
        setActionLoading(false);
      } else {
        startToast("error", "Something was wrong.");
        setActionLoading(false);
      }

    } catch (e) {
      startToast("error", "Transaction did not successed.");
      setActionLoading(false);
      return false;
    }
  }

  const createLPFarm = async () => {
    if (!account) {
      startToast("warning", "Please connect your wallet.");
      return false;
    }
    if (deployNew) {
      createLPFarmAndDeployNew();
      return;
    }
    justCreateLPFarm();
  }

  const createLPFarmAndDeployNew = async () => {
    if (isEmpty([rewardToken, isReflection == 1 ? dividendToken : zeroAddress, rewardPerBlock, depositFee, withdrawFee, lpToken, allocPoint])) {
      startToast("error", "Please fill all fields with valid value.");
      return false;
    }

    if (!checkEthereumAddress([rewardToken, isReflection == 1 ? dividendToken : zeroAddress, lpToken])) {
      startToast("error", "Please input valid Ethereum address.");
      return false;
    }

    try {
      setActionLoading(true);
      const address = await deploy(LPFarm.abi, LPFarm.bytecode, library?.getSigner(), [rewardToken, dividendToken, rewardPerBlock, Boolean(isReflection)]);
      const contract = await getContract(LPFarm.abi, LPFarm.deployedBytecode, address, library?.getSigner());
      var tx = await contract.add(allocPoint, lpToken, depositFee, withdrawFee, true);
      await tx.wait();

      const dbResult = await addLpFarmToProject(id, {
        stakeType: isReflection ? StakeTypes.REFLECTION : StakeTypes.NO_REFLECTION,
        rewardToken: rewardToken,
        dividendToken: dividendToken,
        rewardPerBlock: rewardPerBlock,
        lpToken: lpToken,
        contractAddress: address,
        depositFee: depositFee,
        withdrawFee: withdrawFee,
        hasDividend: Boolean(isReflection),
        allocPoint: allocPoint,
        owner: account
      })

      if (dbResult) {
        startToast("success", "LP Farm successfully created.")
        setActionLoading(false);
      } else {
        startToast("error", "Something was wrong.")
        setActionLoading(false);
      }

    } catch (e) {
      startToast("error", "Transaction did not successed.");
      setActionLoading(false);
      return false;
    }
  }

  const justCreateLPFarm = async () => {
    if (isEmpty([rewardToken, isReflection == 1 ? dividendToken : zeroAddress, stakingContract, rewardPerBlock, depositFee, withdrawFee, lpToken, allocPoint])) {
      startToast("error", "Please fill all fields with valid value.");
      return false;
    }

    if (!checkEthereumAddress([rewardToken, isReflection == 1 ? dividendToken : zeroAddress, lpToken, stakingContract])) {
      startToast("error", "Please input valid Ethereum address.");
      return false;
    }

    try {
      setActionLoading(true);
      const contract = await getContract(LPFarm.abi, LPFarm.deployedBytecode, stakingContract, library?.getSigner());
      var tx = await contract.add(allocPoint, lpToken, depositFee, withdrawFee, true);
      await tx.wait();

      const dbResult = await addLpFarmToProject(id, {
        stakeType: isReflection ? StakeTypes.REFLECTION : StakeTypes.NO_REFLECTION,
        rewardToken: rewardToken,
        dividendToken: dividendToken,
        rewardPerBlock: rewardPerBlock,
        lpToken: lpToken,
        contractAddress: stakingContract,
        depositFee: depositFee,
        withdrawFee: withdrawFee,
        hasDividend: Boolean(isReflection),
        allocPoint: allocPoint,
        owner: account
      })

      if (dbResult) {
        startToast("success", "LP Farm successfully created.")
        setActionLoading(false);
      } else {
        startToast("error", "Something was wrong.")
        setActionLoading(false);
      }
    } catch (e) {
      startToast("error", "Transaction did not successed.");
      setActionLoading(false);
      return false;
    }
  }

  useEffect(() => {
    switch (STAKE_TYPE) {
      case StakeTypes.CS:
        setProjectType(1);
        break;
      case StakeTypes.LP:
        setProjectType(2);
        break;
      default:
        break;
    }
  }, [])

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
          {/* Start Add new Card */}

          <Container spacing={8} sx={{ p: 5, width: 500, height: 'fit-content', border: '1px solid #F0B90B', boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px', borderRadius: 1, marginTop: 5 }}>
            <Typography variant='h4'>Create Staking and Farming</Typography>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Switch label="Project:" labelStyle={{ fontSize: 20 }} onChange={(e) => setProjectType(e.target.value)} options={[{ value: 1, label: 'Staking' }, { value: 2, label: 'LP Farming' }]} value={projectType} disabled={true} />
              {
                projectType == 1 ? <Switch label="Type:" labelStyle={{ fontSize: 20 }} onChange={(e) => setStakeType(e.target.value)} options={[{ value: 1, label: 'Lockup' }, { value: 2, label: 'Non-Lockup' }]} value={projectType == 2 ? 2 : stakeType} /> :
                  <Switch label="Reflection:" labelStyle={{ fontSize: 20 }} onChange={(e) => setIsReflection(e.target.value)} options={[{ value: 1, label: 'Reflection' }, { value: 0, label: 'No-Reflection' }]} value={projectType == 1 ? 1 : isReflection} />
              }
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="0x...." label="Stake Token" labelStyle={{ fontSize: 20 }} value={stakeToken} onChange={(e) => setStakeToken(e.target.value)} disabled={projectType == 2} />
              <Input placeholder="0x...." label="Reward Token" labelStyle={{ fontSize: 20 }} value={rewardToken} onChange={(e) => setRewardToken(e.target.value)} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="0x...." label="Dividend Token" labelStyle={{ fontSize: 20 }} value={isReflection == 1 ? dividendToken : zeroAddress} onChange={e => setDividendToken(e.target.value)} disabled={isReflection == 1 || projectType == 1 ? false : true} />
              <Input placeholder="___%" label="Reward per Block" labelStyle={{ fontSize: 20 }} value={rewardPerBlock} onChange={e => setRewardPerBlock(e.target.value)} disabled={stakeType == 1 && projectType == 1 ? true : false} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2}>
              <Input placeholder="___%" label="Deposit Fee" labelStyle={{ fontSize: 20 }} value={depositFee} onChange={e => setDepositFee(e.target.value)} disabled={stakeType == 1 && projectType == 1 ? true : false} />
              <Input placeholder="___%" label="Withdraw Fee" labelStyle={{ fontSize: 20 }} value={withdrawFee} onChange={e => setWithdrawFee(e.target.value)} disabled={stakeType == 1 && projectType == 1 ? true : false} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              {
                projectType == 1 ? <Input placeholder="0x...." label="Dex Router" labelStyle={{ fontSize: 20 }} value={dexRouter} onChange={e => setDexRouter(e.target.value)} disabled={projectType == 2} /> : <Input placeholder="0" label="Alloc Point" labelStyle={{ fontSize: 20 }} value={allocPoint} onChange={e => setAllocPoint(e.target.value)} />
              }
              <Input placeholder="0x...." label="Staking Contract" labelStyle={{ fontSize: 20 }} value={stakingContract} onChange={e => setStakingContract(e.target.value)} disabled={deployNew || (projectType == 1 && stakeType == 2)} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="0x...." label="LP Token" labelStyle={{ fontSize: 20 }} disabled={projectType == 1} value={lpToken} onChange={e => setLPToken(e.target.value)} />
              <NetworkSelect label="Deploy Network" wrapperStyle={{ width: '45%' }} labelStyle={{ fontSize: 20 }} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2}>
              <Input placeholder="0x...." label="Earned, Stake Path" labelStyle={{ fontSize: 20 }} value={earnedStakePath.toString()} onChange={e => setEarnedStakePath(trim(e.target.value.split(',')))} disabled={projectType == 2} />
              <Input placeholder="0x...." label="Reflection, Stake Path" labelStyle={{ fontSize: 20 }} value={reflectionStakePath.toString()} onChange={e => setReflectionStakePath(trim(e.target.value.split(',')))} disabled={projectType == 2} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <CheckBox checked={stakeType == 2} onChange={(e) => setDeployNew(e)} icon={<FiCheck />} label="Deploy new Contract" borderColor="#F0B90B" style={{ cursor: 'pointer', marginLeft: 20 }} labelStyle={{ fontSize: 20, marginLeft: 10 }} disabled={projectType == 1 && stakeType == 2} />
              <CardButton style={{ width: '45%', fontSize: 25 }} onClick={projectType == 1 ? (stakeType == 1 ? (deployNew ? createLockUpAndDeployNew : createLockUp) : createNoLockUp) : createLPFarm} loading={actionLoading}>
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