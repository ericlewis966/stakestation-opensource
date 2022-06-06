import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
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
    Link
} from '@material-ui/core';

import { startToast } from 'src/components/Toast';
import Input from 'src/components/Input';
import CardButton from 'src/components/CardButton';

import { getContract } from 'src/utils/ContractHelper';
import isEmpty from 'src/utils/isEmpty';
import { updateSubStakingForCryptoStaking } from 'src/actions/firebase';

import StakeLockUp from 'src/contracts/StakeLockUp.json';
// ----------------------------------------------------------------------

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: 'all .6s'
}));

// ----------------------------------------------------------------------

export default function SubStakingCard({ projectId, masterStakeId, id, stakeDuration, depositFee, withdrawFee, rewardPerBlock, contractAddress, updateStore }) {
    const [expanded, setExpanded] = useState(false);

    const { account, library } = useWeb3React();

    const [duration, setDuration] = useState(stakeDuration);
    const [deposFee, setDeposFee] = useState(depositFee);
    const [withdrFee, setWithdrFee] = useState(withdrawFee);
    const [rewardRate, setRewardRate] = useState(rewardPerBlock);

    const [actionLoading, setActionLoading] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const updateSubStaking = async () => {
        if (!account) {
            startToast("error", "Please connect your wallet.")
            return false;
        }

        if(isEmpty([duration, deposFee, withdrFee, rewardRate])) {
            startToast("error", "Please fill all fields.");
            return false;
        }

        try {
            setActionLoading(true);
            const contract = await getContract(StakeLockUp.abi, StakeLockUp.deployedBytecode, contractAddress, library?.getSigner());
            const tx = await contract.updateLockup(id, duration, deposFee, withdrFee, rewardRate);
            await tx.wait();
            try {
                const result = await updateSubStakingForCryptoStaking(projectId, masterStakeId, {
                    id: id,
                    stakeDuration: duration,
                    depositFee: deposFee,
                    withdrawFee: withdrFee,
                    rewardPerBlock: rewardRate
                })

                if(result) {
                    updateStore()
                    setActionLoading(false);
                    startToast("success", "Successfully updated.");
                } else {
                    setActionLoading(false);
                    startToast("error", "Something was wrong.");
                }
            } catch (e) {
                console.log(e);
            }
             setActionLoading(false);
        } catch (e) {
            console.log(e);
            setActionLoading(false);
        }
    }
    
    useEffect(() => {
        setDuration(stakeDuration);
        setDeposFee(depositFee);
        setWithdrFee(withdrawFee);
        setRewardRate(rewardPerBlock);
    }, [projectId, masterStakeId, id, stakeDuration, depositFee, withdrawFee, rewardPerBlock, contractAddress, updateStore])

    return (
        <Card
            sx={{
                borderRadius: '16px',
                background: 'linear-gradient(180deg, #000000 0%, #34314a 100%)',
                border: '1px solid yellow',
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
            }}
        >
            <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        ID:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        #{id}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        Duration:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {stakeDuration}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        Deposit Fee:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {depositFee}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        Withdraw Fee:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {withdrawFee}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        Reward Per Block:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {rewardPerBlock}
                    </Typography>
                </Container>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ marginBottom: 0 }}>
                <Box maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: 'column', gap: 1, paddingBottom: 1 }}>
                    <Stack direction="row" sx={{ width: '90%' }} justifyContent="space-between">
                        <Input label="Duration" wrapperStyle={{ width: '48%', justifyContent: 'center' }} labelStyle={{ fontSize: 20 }} style={{ height: 30, fontSize: 15, alignItems: 'center' }} value={duration} onChange={e => setDuration(e.target.value)} placeholder="Stake Duration" />
                        <Input label="Deposit Fee" wrapperStyle={{ width: '48%' }} labelStyle={{ fontSize: 20 }} style={{ height: 30, fontSize: 15, }} value={deposFee} onChange={e => setDeposFee(e.target.value)} placeholder="Deposit Fee" />
                    </Stack>
                    <Stack direction="row" sx={{ width: '90%' }} justifyContent="space-between">
                        <Input label="Withdraw Fee" wrapperStyle={{ width: '48%' }} labelStyle={{ fontSize: 20 }} style={{ height: 30, fontSize: 15 }} value={withdrFee} onChange={e => setWithdrFee(e.target.value)} placeholder="Withdraw Fee" />
                        <Input label="Reward Rate" wrapperStyle={{ width: '48%' }} labelStyle={{ fontSize: 20 }} style={{ height: 30, fontSize: 15 }} value={rewardRate} onChange={e => setRewardRate(e.target.value)} placeholder="Reward Per Block" />
                    </Stack>
                    <CardButton onClick={updateSubStaking} loading={actionLoading} style={{ fontSize: 20, height: 30, width: 100, borderRadius: 4 }}>Update</CardButton>
                </Box>
            </Collapse>
        </Card>
    );
}
