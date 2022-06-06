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
import { updateFarmForCryptoStaking } from 'src/actions/firebase';

import LPFarm from 'src/contracts/LPFarm.json';
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

export default function SubFarmCard({ projectId, masterFarmId, id, allocPoint, lpToken, depositFee, withdrawFee, withUpdate, contractAddress, updateStore }) {
    const [expanded, setExpanded] = useState(false);

    const { account, library } = useWeb3React();

    const [_allocPoint, setAllocPoint] = useState(allocPoint);
    const [_depositFee, setDepositFee] = useState(depositFee);
    const [_withdrawFee, setWithdrawFee] = useState(withdrawFee);

    const [actionLoading, setActionLoading] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const updateSubFarm = async () => {
        if (!account) {
            startToast("error", "Please connect your wallet.")
            return false;
        }

        if (isEmpty([_allocPoint, _depositFee, _withdrawFee])) {
            startToast("error", "Please fill all fields");
            return false;
        }

        try {
            setActionLoading(true);
            const contract = await getContract(LPFarm.abi, LPFarm.deployedBytecode, contractAddress, library?.getSigner());
            const tx = await contract.set(id, _allocPoint, _depositFee, _withdrawFee, true);
            await tx.wait();
            try {
                const result = await updateFarmForCryptoStaking(projectId, masterFarmId, {
                    id: id,
                    allocPoint: _allocPoint,
                    depositFee: _depositFee,
                    withdrawFee: _withdrawFee,
                    withUpdate: true
                })

                if (result) {
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
        setAllocPoint(allocPoint);
        setDepositFee(depositFee);
        setWithdrawFee(withdrawFee);
    }, [projectId, masterFarmId, id, allocPoint, lpToken, depositFee, withdrawFee, withUpdate, contractAddress, updateStore])

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
                        AllocPoint:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {_allocPoint}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        Deposit Fee:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {_depositFee}
                    </Typography>
                </Container>
                <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        Withdraw Fee:
                    </Typography>
                    <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                        {_withdrawFee}
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
                    <Stack direction="column" sx={{ width: '90%' }} justifyContent="space-between">
                        <Input label="Alloc Point" wrapperStyle={{ width: '100%', alignItems: 'center' }} labelStyle={{ fontSize: 20 }} style={{ height: 30, fontSize: 15 }} value={_allocPoint} onChange={e => setAllocPoint(e.target.value)} placeholder="_" />
                        <Input label="Deposit Fee" wrapperStyle={{ width: '100%', alignItems: 'center' }} labelStyle={{ fontSize: 20 }} style={{ height: 30, fontSize: 15, }} value={_depositFee} onChange={e => setDepositFee(e.target.value)} placeholder="_%" />
                        <Input label="Withdraw Fee" wrapperStyle={{ width: '100%', alignItems: 'center' }} labelStyle={{ fontSize: 20 }} style={{ height: 30, fontSize: 15 }} value={_withdrawFee} onChange={e => setWithdrawFee(e.target.value)} placeholder="%" />
                    </Stack>
                    <CardButton onClick={updateSubFarm} loading={actionLoading} style={{ fontSize: 20, height: 30, width: 100, borderRadius: 4 }}>Update</CardButton>
                </Box>
            </Collapse>
        </Card>
    );
}
