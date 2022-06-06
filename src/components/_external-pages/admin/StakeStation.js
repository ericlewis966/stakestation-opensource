//react
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//
import { connect } from 'react-redux';
// material
import { styled } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography } from '@material-ui/core'
//
import AdminMasterLockupCard from 'src/components/cards/AdminMasterLockupCard';
import AdminNoLockupCard from 'src/components/cards/AdminNoLockupCard';
import AdminMasterLPFarmCard from 'src/components/cards/AdminMasterLPFarmCard';
//
import AddNewCard from 'src/components/cards/AddNewCard';
//
import { getProjectById } from 'src/actions/firebase';
//
import { StakeTypes } from 'src/constants';
// ----------------------------------------------------------------------


const StakeStation = ({ getProjectById, project }) => {

  const [cryptoStakings, setCryptoStakings] = useState([]);
  const [lpFarms, setLpFarms] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        await getProjectById(id);
      } catch (e) {
        console.log(e);
      }
    })()
  }, [getProjectById])

  useEffect(() => {
    (async () => {
      setCryptoStakings(project?.cryptostakings ? project?.cryptostakings : []);
      setLpFarms(project?.lpfarms ? project?.lpfarms : []);
    })()
  }, [project])

  const updateStore = async () => {
    console.log("called");
    await getProjectById(id);
  }

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
            Crypto Stakings
          </Typography>
          <Grid container sx={{ px: { xs: 6, md: 3 } }} spacing={6} justifyContent="center">
            {
              cryptoStakings.map((item, index) => (
                <Grid key={index} item xs={12} md={3} justifyContent="center">
                  {
                    item.stakeType == StakeTypes.LOCK_UP ? <AdminMasterLockupCard updateStore={updateStore} projectId={id} projectType={StakeTypes.CS} {...item} masterStakeId={item?.id} /> : <AdminNoLockupCard updateStore={updateStore} projectId={id} projectType={StakeTypes.CS} {...item} />
                  }
                </Grid>
              ))
            }
            <Grid item xs={12} md={3} justifyContent="center">
              <AddNewCard label="Crypto Staking" to={`/admin/project/newstake/${id}/${StakeTypes.CS}`} />
            </Grid>
          </Grid>
        </Container>
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
            LP Farms
          </Typography>
          <Grid container sx={{ px: { xs: 6, md: 3 } }} spacing={6} justifyContent="center">
            {
              lpFarms.map((item, index) => (
                <Grid key={index} item xs={12} md={3} justifyContent="center">
                  <AdminMasterLPFarmCard updateStore={updateStore} projectId={id} projectType={StakeTypes.LP} {...item} />
                </Grid>
              ))
            }
            <Grid item xs={12} md={3} justifyContent="center">
              <AddNewCard label="LP Farm" to={`/admin/project/newstake/${id}/${StakeTypes.LP}`} />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => ({
  project: state.project.project
})

export default connect(mapStateToProps, { getProjectById })(StakeStation);