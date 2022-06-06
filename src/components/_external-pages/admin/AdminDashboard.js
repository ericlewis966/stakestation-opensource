//react
import { useEffect, useState } from 'react';
// material
import { Box, Grid, Container, Typography, Button, Stack, Select, MenuItem, InputLabel } from '@material-ui/core'
//
import AminProjectCard from 'src/components/cards/AdminProjectCard';
//
import AddNewCard from 'src/components/cards/AddNewCard';
//
import { getProjects } from 'src/actions/firebase';
// ----------------------------------------------------------------------

export  const AdminDashboard = () => {

  const [projectType, setProjectType] = useState(1);
  const [stakeType, setStakeType] = useState(1);
  const [deployNew, setDeployNew] = useState(false);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const projects = await getProjects();
        setProjects(projects);
      } catch (e) {
        console.log(e);
      }
    })()
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
            minHeight: 500
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
          <Grid container sx={{ px: { xs: 6, md: 3 } }} spacing={6}>
            {
              projects.map((item, index) => (
                <Grid key={index} item xs={12} md={3} justifyContent="center">
                  <AminProjectCard {...item} />
                </Grid>
              ))
            }
            <Grid item xs={12} md={3} justifyContent="center">
              <AddNewCard label="Add New Project" to="/admin/newproject" />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  )
}

export default AdminDashboard;