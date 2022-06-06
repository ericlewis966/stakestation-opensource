import { useState, useEffect } from 'react';
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
import CardButton from 'src/components/CardButton';
//
import { getTokenInfo } from 'src/utils/ContractHelper';
//
import { StakeTypes } from 'src/constants';


// ----------------------------------------------------------------------

export default function AdminStakingCard({ id, projectType, stakeType, stakeToken, rewardToken, dividendToken }) {

  const { library, account } = useWeb3React();
  const [stakeTokenInfo, setStakeTokenInfo] = useState(null);
  const [rewardTokeninfo, setRewardTokenInfo] = useState(null);
  const [dividendTokenInfo, setDividendTokenInfo] = useState(null);

  useEffect(() => {
    (async () => {
      if (account) {
        if (projectType === StakeTypes.CS) {
          const stakeTokenInfo = await getTokenInfo(stakeToken, library?.getSigner());
          const rewardTokenInfo = await getTokenInfo(rewardToken, library?.getSigner());
          const dividendTokenInfo = await getTokenInfo(dividendToken, library?.getSigner());
          console.log("StakingToken", stakeTokenInfo);

          setStakeTokenInfo(stakeTokenInfo);
          setRewardTokenInfo(rewardTokenInfo);
          setDividendTokenInfo(dividendTokenInfo);
        } else if (projectType === StakeTypes.LP) {
          if (stakeType === StakeTypes.REFLECTION) {
            const rewardTokenInfo = await getTokenInfo(rewardToken, library?.getSigner());
            const dividendTokenInfo = await getTokenInfo(dividendToken, library?.getSigner());

            setRewardTokenInfo(rewardTokenInfo);
            setDividendTokenInfo(dividendTokenInfo);
          } else if (stakeType === StakeTypes.NO_REFLECTION) {
            const rewardTokenInfo = await getTokenInfo(rewardToken, library?.getSigner());

            setRewardTokenInfo(rewardTokenInfo);
          }
        }
      }
    })()
  }, [])

  return (
    <Card
      sx={{
        borderRadius: '6px',
        background: 'linear-gradient(180deg, #000000 0%, #34314a 100%)',
        border: '1px solid yellow',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        width: '100%',
        minHeight: 100
      }}
    >
      <RouterLink to={`/admin/project/edit/${id}/${projectType}`} style={{ textDecorationColor: '#ffffff', textDecoration: 'none', color: '#ffffff' }}>
        <CardContent sx={{width: 'fit-content'}}>
          <CardContent sx={{ paddingLeft: 0, paddingRight: 0,}}>
            <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
              <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                Stake:&nbsp;
              </Typography>
              <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                {stakeTokenInfo ? stakeTokenInfo.symbol : "??"}
              </Typography>
            </Container>
            <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
              <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                Reward:&nbsp;
              </Typography>
              <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                {rewardTokeninfo ? rewardTokeninfo.symbol : "??"}
              </Typography>
            </Container><Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
              <Typography variant='p' sx={{ fontSize: 25, color: '#ffffff' }}>
                Reflection:&nbsp;
              </Typography>
              <Typography variant='p' sx={{ fontSize: 25, color: '#F0B90B' }}>
                {dividendTokenInfo ? dividendTokenInfo.symbol : "??"}
              </Typography>
            </Container>
          </CardContent>
        </CardContent>
      </RouterLink>
    </Card>
  );
}
