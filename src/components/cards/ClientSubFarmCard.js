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
    Modal
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
import { Chain2Explorer } from 'src/network2label/networkLabel';
import LPFarm from 'src/contracts/LPFarm.json';
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

export default function ClientSubFarmCard({ id, allocPoint, depositFee, withdrawFee, contractAddress, chainId, lpToken, rewardTokenInfo, dividendTokenInfo, tokenLogo }) {

    const { account, library, activate } = useWeb3React();

    const [totalEarned, setTotalEarned] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [stakedAmount, setStakedAmount] = useState(0);
    const [rewardedAmount, setRewardedAmount] = useState(0);
    const [dividendAmount, setDividendAmount] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);

    const [operationNonce, setOperationNonce] = useState(0);
    const [actionLoading, setActionLoading] = useState(false);
    const [viewDepositPopup, setViewDepositPopup] = useState(false);
    const [viewWithdrawPopup, setViewWithdrawPopup] = useState(false);


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
            const token = await getContract(ERC20.abi, ERC20.deployedBytecode, lpToken, library?.getSigner());
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
            startToast("error", "Please connect your wallet.");
            return false;
        }
        try {
            setActionLoading(true);
            const contract = await getContract(LPFarm.abi, LPFarm.deployedBytecode, contractAddress, library?.getSigner());
            const token = await getContract(ERC20.abi, ERC20.deployedBytecode, lpToken, library?.getSigner());
            const decimals = await token.decimals();
            try {
                const tx = await contract.withdraw(id, ethers.utils.parseUnits(String(withdrawAmount), decimals));
                await tx.wait();

                setActionLoading(false);
                startToast("success", "Withdrawed successfully");
            } catch (e) {
                startToast("error", "Something was wrong.");
                setActionLoading(false);
                console.log(e);
            }
        } catch (e) {
            startToast("error", "Something was wrong.");
            setActionLoading(false);
            console.log(e);
        }
    }

    const deposit = async () => {
        if (!account) {
            startToast("error", "Please connect your wallet");
            return false;
        }

        if (isEmpty([depositAmount]) || depositAmount <= 0) {
            startToast("error", "Please input valid deposit amount.");
            return false;
        }

        try {
            setActionLoading(true);
            const contract = await getContract(LPFarm.abi, LPFarm.deployedBytecode, contractAddress, library?.getSigner());
            const token = await getContract(ERC20.abi, ERC20.deployedBytecode, lpToken, library?.getSigner());
            const decimals = await token.decimals();

            var tx = await token.approve(contractAddress, ethers.utils.parseUnits(String(depositAmount), decimals));
            await tx.wait();

            tx = await contract.deposit(id, ethers.utils.parseUnits(String(depositAmount), decimals));
            await tx.wait();

            setActionLoading(false);
            startToast("success", "Deposited successfully.");
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
            const contract = await getContract(LPFarm.abi, LPFarm.deployedBytecode, contractAddress, library?.getSigner());
            const token = await getContract(ERC20.abi, ERC20.deployedBytecode, lpToken, library?.getSigner());

            try {
                const decimals = await token.decimals();
                const _myBalance = await token.balanceOf(account);
                const userInfo = await contract.userInfo(id, account);

                const myBalance = toSafeNumber(_myBalance.toString(), decimals);
                const stakedAmount = toSafeNumber(userInfo.amount.toString(), decimals);
                const rewardedAmount = toSafeNumber(userInfo.rewardDebt.toString(), decimals);
                const dividendAmount = toSafeNumber(userInfo.reflectionDebt.toString(), decimals);

                setTotalBalance(myBalance);
                setStakedAmount(stakedAmount);
                setRewardedAmount(rewardedAmount);
                setDividendAmount(dividendAmount);
            } catch (e) {
                console.log(e);
            }
        })()
    }, [account])

    return (
        <Card
            sx={{
                position: 'relative',
                borderRadius: '16px',
                background: '#373536',
                border: '1px solid #F0B90B',
                borderTopWidth: '5px',
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
            }}
        >
            <CardContent sx={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
                <Box height={150} sx={{ position: 'relative', width: '100%', height: 130, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1A1B1F', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', paddingLeft: 2, paddingTop: 3 }}>
                                <Stack direction="row">
                                    <Typography variant='p' sx={{ fontSize: 25, }}>Earn:&nbsp;</Typography>
                                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>{rewardTokenInfo?.symbol ? rewardTokenInfo?.symbol : "??"}</Typography>
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
                    </Box>
                </Box>
                {/* <Box height={150} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1A1B1F', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}></Box> */}
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        AollcPoint:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {allocPoint ? allocPoint : 0}%
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
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                            {rewardTokenInfo.symbol ? rewardTokenInfo.symbol : 'Token'}&nbsp;
                        </Typography>
                        Earned:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {rewardedAmount}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                        <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                            {dividendTokenInfo.symbol ? dividendTokenInfo.symbol : ''}&nbsp;
                        </Typography>
                        Reflected:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {dividendAmount}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }} >

                    {
                        account && stakedAmount > 0 ? <Stack direction="column" justifyContent="center" alignItems="flex-start" height={20}>
                            <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff', lineHeight: 1 }}>
                                LPToken Staked:
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
                    <Link href={`${Chain2Explorer[chainId]}/address/${lpToken}`} target='_blank' sx={{ fontSize: 25, color: '#ba872a', textDecorationColor: '#ba872a' }}>View LPToken in Explorer</Link>
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
                            {stakedAmount}
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
                            LPToken Staked:
                        </Typography>
                        <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                            {toEasyNumber(stakedAmount)}
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
