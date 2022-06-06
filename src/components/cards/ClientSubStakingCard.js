import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'src/connectors';
import { NavLink as RouterLink, useLocation } from "react-router-dom";
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
    Link,
    Modal,
} from '@material-ui/core';

import { startToast } from 'src/components/Toast';
import Input from 'src/components/Input';
import CardButton from 'src/components/CardButton';
import SliderSelect from 'src/components/Slider';

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

import { getContract } from 'src/utils/ContractHelper';
import isEmpty from 'src/utils/isEmpty';
import getAPR from 'src/utils/getAPR';
import toSafeNumber from 'src/utils/toSafeNumber';
import toEasyNumber from 'src/utils/toEasyNumber';
//
import { Chain2BlockTime, Chain2Explorer } from 'src/network2label/networkLabel';
import StakeLockUp from 'src/contracts/StakeLockUp.json';
import ERC20 from 'src/contracts/ERC20.json';
// ----------------------------------------------------------------------

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

export default function ClientSubStakingCard({ id, depositFee, withdrawFee, rewardPerBlock, contractAddress, chainId, rewardTokenInfo = null, dividendTokenInfo = null, stakeTokenInfo, stakeDuration, stakeToken, tokenLogo }) {

    const { account, library, activate } = useWeb3React();

    const [apr, setApr] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);
    const [stakedAmount, setStakedAmount] = useState(0);
    const [totalStaked, setTotalStaked] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [enabledAmount, setEnabledAmount] = useState(0);
    const [lockedAmount, setLockedAmount] = useState(0);
    const [availableRewards, setAvailableRewards] = useState(0);
    const [lockDuration, setLockDuratin] = useState(0);

    const [actionLoading, setActionLoading] = useState(false);
    const [viewDepositPopup, setViewDepositPopup] = useState(false);
    const [viewWithdrawPopup, setViewWithdrawPopup] = useState(false);

    const [operationNonce, setOperationNonce] = useState(0);

    const compoundReward = async () => {
        if (!account) {
            startToast("error", "Please connect your wallet.");
            return false;
        }
        try {
            setActionLoading(true);
            const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, contractAddress, library?.getSigner());
            try {
                const tx = await contract.compoundReward(id);
                await tx.wait();

                setActionLoading(false);
            } catch (e) {
                setActionLoading(false);
                console.log(e);
            }
        } catch (e) {
            setActionLoading(false);
            console.log(e);
        }
    }

    const compoundDividend = async () => {
        if (!account) {
            startToast("error", "Please connect your wallet.");
            return false;
        }
        try {
            setActionLoading(true);
            const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, contractAddress, library?.getSigner());
            try {
                const tx = await contract.compoundDividend(id);
                await tx.wait();

                setActionLoading(false);
            } catch (e) {
                setActionLoading(false);
                console.log(e);
            }
        } catch (e) {
            setActionLoading(false);
            console.log(e);
        }
    }

    const claimDividend = async () => {
        if (!account) {
            startToast("error", "Please connect your wallet.");
            return false;
        }
        try {
            setActionLoading(true);
            const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, contractAddress, library?.getSigner());
            try {
                const tx = await contract.claimDividend(id);
                await tx.wait();

                setActionLoading(false);
            } catch (e) {
                setActionLoading(false);
                console.log(e);
            }
        } catch (e) {
            setActionLoading(false);
            console.log(e);
        }
    }

    const claimReward = async () => {
        if (!account) {
            startToast("error", "Please connect your wallet.");
            return false;
        }
        try {
            setActionLoading(true);
            const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, contractAddress, library?.getSigner());
            try {
                const tx = await contract.claimReward(id);
                await tx.wait();

                setActionLoading(false);
            } catch (e) {
                setActionLoading(false);
                console.log(e);
            }
        } catch (e) {
            setActionLoading(false);
            console.log(e);
        }
    }

    const tryStake = async () => {
        if (!account) {
            activate(injected);
            return;
        }
        if (!isEnabled) {
            enable();
        } else {
            setViewDepositPopup(true);
        }
    }

    const enable = async () => {
        if (!account) {
            startToast("error", "Please connect your wallet");
            return false;
        }

        try {
            setActionLoading(true);
            const token = await getContract(ERC20.abi, ERC20.deployedBytecode, stakeToken, library?.getSigner());
            const decimals = await token.decimals();
            const _myBalance = await token.balanceOf(account);
            const myBalance = toSafeNumber(_myBalance, decimals);
            try {
                const tx = await token.approve(contractAddress, ethers.utils.parseUnits(String(myBalance), decimals));
                await tx.wait();

                setOperationNonce(operationNonce + 1);
                setIsEnabled(true);
                startToast("success", "Sucessfully enabled");
                setActionLoading(false);
            } catch (e) {
                startToast("error", "Something was wrong")
                setActionLoading(false);
                console.log(e);
            }
            setActionLoading(false);
        } catch (e) {
            startToast("error", "Something was wrong")
            setActionLoading(false);
            console.log(e);
        }
    }

    const withdraw = async () => {
        if (!account) {
            startToast("error", "Please connect your wallet");
            return false;
        }

        if (isEmpty([depositAmount]) || depositAmount <= 0) {
            startToast("error", "Please input valid deposit amount.");
            return false;
        }

        if (depositAmount > stakedAmount) {
            if (stakedAmount == 0) {
                startToast("error", "You have not staked yet.");
            } else {
                startToast("error", "Withdraw amount is bigger than staked amount.");
            }
            return false;
        }

        try {
            setActionLoading(true);
            const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, contractAddress, library?.getSigner());
            const token = await getContract(ERC20.abi, ERC20.deployedBytecode, stakeToken, library?.getSigner());
            const decimals = await token.decimals();

            var tx = null;

            tx = await contract.withdraw(ethers.utils.parseUnits(String(depositAmount), decimals), id);
            await tx.wait();

            setOperationNonce(operationNonce + 1);
            setActionLoading(false);
            startToast("success", "Seccessfully staked!");
        } catch (e) {
            setActionLoading(false);
            console.log(e);
        }
    }

    const deposit = async () => {
        if (!account) {
            startToast("error", "Please connect your wallet");
            return false;
        }
        if (!isEnabled) {
            startToast("warning", "You have to enable stake before do it.");
            return false;
        }
        if (isEmpty([depositAmount]) || depositAmount <= 0) {
            startToast("error", "Please input valid deposit amount.");
            return false;
        }

        try {
            setActionLoading(true);
            const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, contractAddress, library?.getSigner());
            const token = await getContract(ERC20.abi, ERC20.deployedBytecode, stakeToken, library?.getSigner());
            const decimals = await token.decimals();

            var tx = null;
            if (depositAmount > enabledAmount) {
                tx = await token.approve(contractAddress, totalBalance);
                await tx.wait();
            }

            tx = await contract.deposit(ethers.utils.parseUnits(String(depositAmount), decimals), id);
            await tx.wait();

            setOperationNonce(operationNonce + 1);
            setActionLoading(false);
            startToast("success", "Seccessfully staked!");
        } catch (e) {
            setActionLoading(false);
            console.log(e);
        }
    }

    useEffect(() => {
        (async () => {
            if (!account) return false;

            let contract = null;
            let token = null;
            try {
                console.log("PASS");
                contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, contractAddress, library?.getSigner());
                token = await getContract(ERC20.abi, ERC20.deployedBytecode, stakeToken, library?.getSigner());

                try {
                    const decimals = await token.decimals();
                    const _myBalance = await token.balanceOf(account);
                    const _approved = await token.allowance(account, contractAddress);
                    const _totalStaked = await contract.totalStaked();

                    try {
                        const userInfo = await contract.userStaked(account);
                        console.log("UserInfo:", userInfo);
                        const userStakes = await contract.userStakes(account, 0);

                        const userStaked = toSafeNumber(userInfo.amount.toString(), decimals);
                        const lockedAmount = toSafeNumber(userInfo.locked.toString(), decimals);
                        const availableAmount = toSafeNumber(userInfo.available.toString(), decimals);
                        const lockDuration = userStakes.duration.toNumber();

                        setLockDuratin(lockDuration);
                        setStakedAmount(userStaked);
                        setLockedAmount(lockedAmount);
                        setAvailableRewards(availableAmount);
                    } catch (e) {
                        console.log(e);
                    }

                    const myBalance = toSafeNumber(_myBalance.toString(), decimals);
                    const approved = toSafeNumber(_approved, decimals);
                    const totalStaked = toSafeNumber(_totalStaked.toString(), decimals);

                    setEnabledAmount(approved);
                    setTotalBalance(myBalance);
                    setTotalStaked(totalStaked);
                    setIsEnabled(approved >= myBalance / 10 * 9);

                    const apr = getAPR(rewardPerBlock, totalStaked, Chain2BlockTime[chainId]);
                    setApr(apr);
                } catch (e) {
                    console.log(e);
                }
            } catch (e) {
                console.log(e);
            }
        })()
    }, [account, operationNonce])

    return (
        <Card
            sx={{
                position: 'relative',
                borderRadius: '16px',
                background: '#373536',
                // background: 'linear-gradient(180deg, #000000 0%, #34314a 100%)',
                border: '1px solid #F0B90B',
                borderTopWidth: '5px',
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
            }}
        >
            <CardContent sx={{ display: 'relative', paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
                <Box height={150} sx={{ position: 'relative', width: '100%', height: 130, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1A1B1F', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', paddingLeft: 2, paddingTop: 2 }}>
                                <Stack direction="row">
                                    <Typography variant='p' sx={{ fontSize: 25, lineHeight: 1 }}>Stake:&nbsp;</Typography>
                                    <Typography variant='p' sx={{ fontSize: 25, lineHeight: 1, color: '#F0B90B' }}>{stakeTokenInfo?.symbol ? stakeTokenInfo?.symbol : "??"}</Typography>
                                </Stack>
                                <Stack direction="row">
                                    <Typography variant='p' sx={{ fontSize: 25, lineHeight: 1 }}>Earn:&nbsp;</Typography>
                                    <Typography variant='p' sx={{ fontSize: 25, lineHeight: 1, color: '#F0B90B' }}>{rewardTokenInfo?.symbol ? rewardTokenInfo?.symbol : "??"}</Typography>
                                </Stack>
                                <Stack direction="row">
                                    <Typography variant='p' sx={{ fontSize: 25, lineHeight: 1 }}>Refl:&nbsp;</Typography>
                                    <Typography variant='p' sx={{ fontSize: 25, lineHeight: 1, color: '#F0B90B' }}>{dividendTokenInfo?.symbol ? dividendTokenInfo?.symbol : "??"}</Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ width: '50%', position: 'relative' }}>
                                <Box component="img" src={`data:image/png;base64, ${tokenLogo}`} sx={{ position: 'absolute', top: 25, right: 30, width: 80, display: 'inline', marginRight: 1, borderRadius: 50, border: '1px solid #F0B90B' }} />
                                <Box component="img" src={`data:image/png;base64, ${tokenLogo}`} sx={{ position: 'absolute', top: 70, width: 40, display: 'inline', marginRight: 1, borderRadius: 50, border: '1px solid #F0B90B' }} />
                            </Box>
                        </Box>
                        <Box sx={{ paddingLeft: 2 }}>
                            <Stack direction="row">
                                <Typography variant='p' sx={{ fontSize: 25, }}>Lock Duration:&nbsp;</Typography>
                                <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>{lockDuration ? lockDuration : "??"}days</Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        APR:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {apr == 0 ? apr : apr.toFixed(3)}%
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        Deposit Fee:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {depositFee}%
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        Withdraw Fee:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {withdrawFee}%
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>{rewardTokenInfo?.symbol}</Typography> Earned
                    </Typography>
                    <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%' }}>
                        <CardButton style={{ height: 25, width: 100, fontSize: 20, borderRadius: 3 }} onClick={compoundReward} disabled={!account || !isEnabled} loading={actionLoading}>Compound</CardButton>
                    </Stack>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>{dividendTokenInfo?.symbol}</Typography> Reflected
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                        <CardButton style={{ height: 25, width: 100, fontSize: 20, borderRadius: 3 }} onClick={claimDividend} disabled={!account || !isEnabled} loading={actionLoading}>Harvest</CardButton>
                        <CardButton style={{ height: 25, width: 100, fontSize: 20, borderRadius: 3 }} onClick={compoundDividend} disabled={!account || !isEnabled} loading={actionLoading}>Compound</CardButton>
                    </Stack>
                </Container>

                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }} >

                    {
                        account && stakedAmount > 0 ? <Stack direction="column" justifyContent="center" alignItems="flex-start" height={20}>
                            <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff', lineHeight: 1 }}>
                                <Typography variant='p' sx={{ fontSize: 25, height: 50, color: '#F0B90B', lineHeight: 1 }}>
                                    {stakeTokenInfo?.symbol ? stakeTokenInfo?.symbol : ''}&nbsp;
                                </Typography>
                                Staked:
                            </Typography>
                            <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B', lineHeight: 1 }}>
                                {toEasyNumber(stakedAmount)}
                            </Typography>
                        </Stack> : <></>
                    }
                    {
                        account && stakedAmount > 0 ? <Box maxWidth="lg" sx={{ display: "flex", width: 'fit-content', alignItems: "center", justifyContent: "center", m: 0 }} >
                            <CardButton style={{ width: 50, fontSize: 20, height: 40, borderRadius: 4, borderTopRightRadius: 0, borderBottomRightRadius: 0, minWidth: 10 }} onClick={() => setViewWithdrawPopup(true)} disabled={stakedAmount == 0} loading={actionLoading}>
                                <AiOutlineMinus />
                            </CardButton>
                            <CardButton style={{ width: 50, fontSize: 20, height: 40, borderRadius: 4, borderBottomLeftRadius: 0, borderTopLeftRadius: 0, minWidth: 10 }} onClick={() => setViewDepositPopup(true)} loading={actionLoading}>
                                <AiOutlinePlus />
                            </CardButton>
                        </Box> : <CardButton style={{ height: 40, width: '100%', fontSize: 25, borderRadius: 5 }} onClick={tryStake} >
                            {
                                account ? (isEnabled ? 'Stake' : 'Enable') : 'Connect wallet'
                            }
                        </CardButton>
                    }
                </Container>
                <Container sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 1 }}>
                    <Link href={`${Chain2Explorer[chainId]}/address/${contractAddress}`} target='_blank' sx={{ fontSize: 25, color: '#ba872a', textDecorationColor: '#ba872a' }}>View Contract</Link>
                </Container>
            </CardContent>
            <Modal open={viewDepositPopup} onBackdropClick={() => setViewDepositPopup(false)}>
                <Container direction="col" sx={{ ...modalStyled, width: 300 }}>
                    <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
                        <Typography variant='h3' sx={{ fontSize: 25, color: '#F0B90B' }}>
                            Stake
                        </Typography>
                    </Container>
                    <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                        <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                            Total Staked:
                        </Typography>
                        <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                            {totalStaked}
                        </Typography>
                    </Container>
                    <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 3 }}>
                        <SliderSelect onChange={e => setDepositAmount(e.target.value)} max={totalBalance} />
                    </Container>
                    <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
                        <CardButton style={{ width: '100%', fontSize: 25, height: 40, borderRadius: 4, }} onClick={deposit} loading={actionLoading}>
                            Confirm
                        </CardButton>
                    </Container>
                </Container>
            </Modal>
            <Modal open={viewWithdrawPopup} onBackdropClick={() => setViewWithdrawPopup(false)}>
                <Container direction="col" sx={{ ...modalStyled, width: 300 }}>
                    <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
                        <Typography variant='h3' sx={{ fontSize: 25, color: '#F0B90B' }}>
                            Unstake
                        </Typography>
                    </Container>
                    <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                        <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff', lineHeight: 1 }}>
                            <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B', lineHeight: 1 }}>
                                {stakeTokenInfo?.symbol ? stakeTokenInfo?.symbol : 'Token'}&nbsp;
                            </Typography>
                            Staked:
                        </Typography>
                        <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                            {toEasyNumber(totalStaked)}
                        </Typography>
                    </Container>
                    <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                        <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                            Locked:
                        </Typography>
                        <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                            {toEasyNumber(lockedAmount)}
                        </Typography>
                    </Container>
                    <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 3 }}>
                        <SliderSelect onChange={e => setDepositAmount(e.target.value)} max={stakedAmount} />
                    </Container>
                    <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
                        <CardButton style={{ width: '100%', fontSize: 25, height: 40, borderRadius: 4, }} onClick={withdraw} disabled={stakedAmount == 0} loading={actionLoading}>
                            Confirm
                        </CardButton>
                    </Container>
                </Container>
            </Modal>
        </Card>
    );
}
