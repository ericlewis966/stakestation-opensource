//react
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//
import { connect } from 'react-redux';
//image-to-base64
import imageToBase64 from 'image-to-base64';
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
import StyledDropzone from 'src/components/Dropzone';
import Switch from 'src/components/Switch';
import NetworkSelect from 'src/components/NetworkSelect';
//
import { deploy, getContract } from 'src/utils/ContractHelper';
import isEmpty from 'src/utils/isEmpty';
import trim from 'src/utils/trim';
import checkEthereumAddress from 'src/utils/isEthereumAddress';
import toBase64 from 'src/utils/toBase64';
//
import StakeLockUp from 'src/contracts/StakeLockUp.json';
import StakeNoLockUp from 'src/contracts/StakeNoLockUp.json';
import LPFarm from 'src/contracts/LPFarm.json';
//**************************************************************
import { Address } from 'src/constants';
//**************************************************************
import { addNewProject, getProjectById, updateProject } from 'src/actions/firebase';
import { useGlobalContext } from 'src/contexts/GlobalContext';

const EditProject = ({ getProjectById, project }) => {

  const [projectId, setProjectId] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [telegram, setTelegram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');
  const [projectBanner, setProjectBanner] = useState('');
  const [tokenLogo, setTokenLogo] = useState('');
  const [description, setDescription] = useState('');
  const [projectBannerUrl, setProjectBannerUrl] = useState(null);
  const [tokenLogoUrl, setTokenLogoUrl] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);

  const { state, update } = useGlobalContext();
  const { id } = useParams();

  const handleProjectBanner = async (e) => {
    if (e.target.files[0].size > 1048487) {
      startToast("error", "Image file size can't over 1.4M.")
      return false;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.replace("data:", "").replace(/^.+,/, "");
      setProjectBanner(base64);
      setProjectBannerUrl(e.target.files[0].name);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleTokenLogo = (e) => {
    if (e.target.files[0].size > 1048487) {
      startToast("error", "Image file size can't over 1.4M.");
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.replace("data:", "").replace(/^.+,/, "");
      setTokenLogo(base64);
      setTokenLogoUrl(e.target.files[0].name);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const submitProject = async () => {
    if (isEmpty([projectName, tokenSymbol, tokenAddress, projectBannerUrl, tokenLogoUrl, description])) {
      console.log([projectName, tokenSymbol, tokenAddress, projectBannerUrl, tokenLogoUrl, description])
      startToast("error", "Please fill all fields.");
      return false;
    }
    if (!checkEthereumAddress([tokenAddress])) {
      startToast("error", "Please input valid token address.");
      return false;
    }
    setActionLoading(true);
    console.log(projectId, projectName, tokenSymbol, tokenAddress, telegram, twitter, website, projectBanner, tokenLogo, description, projectBannerUrl, tokenLogoUrl, state.selectedChain);
    try {
      const result = await updateProject(projectId, projectName, tokenSymbol, tokenAddress, telegram, twitter, website, projectBanner, tokenLogo, description, projectBannerUrl, tokenLogoUrl, state.selectedChain);
      console.log(projectId, projectName, tokenSymbol, tokenAddress, telegram, twitter, website, projectBanner, tokenLogo, description, projectBannerUrl, tokenLogoUrl, state.selectedChain);
      setActionLoading(false);
      if (result) {
        startToast("success", `Project successfully updated.`)
      } else {
        startToast("error", "Updating project did not success!");
      }
    }
    catch (e) {
      setActionLoading(false);
      startToast("error", e);
    }
  }

  useEffect(() => {
    (async () => {
      await getProjectById(id);
    })()
  }, [getProjectById])

  useEffect(() => {
    (async () => {
      setProjectId(id);
      setProjectName(project.projectName);
      setTokenSymbol(project.tokenSymbol);
      setTokenAddress(project.tokenAddress);
      setTelegram(project.telegram);
      setTwitter(project.twitter);
      setWebsite(project.website);
      setProjectBanner(project.projectBanner);
      setTokenLogo(project.tokenLogo);
      setDescription(project.description);
      setProjectBannerUrl(project.projectBannerUrl);
      setTokenLogoUrl(project.tokenLogoUrl);
      update({ selectedChain: project.chain });
    })()
  }, [project])

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
            Edit Project
          </Typography>
          <Container spacing={8} sx={{ p: 5, width: 500, height: 'fit-content', border: '1px solid #F0B90B', boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px', borderRadius: 1 }}>
            <Typography variant='h4'>Add Project</Typography>
            <Stack direction="row" spacing={7} paddingTop={2}>
              <Input placeholder="Project Name" label="*Project Name" labelStyle={{ fontSize: 20 }} value={projectName} onChange={e => setProjectName(e.target.value)} />
              <Input placeholder="Token Symbol" label="*Token Symbol" labelStyle={{ fontSize: 20 }} value={tokenSymbol} onChange={e => setTokenSymbol(e.target.value)} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <NetworkSelect label="Deploy Network" wrapperStyle={{ width: '45%' }} labelStyle={{ fontSize: 20 }} />
              <Input placeholder="0x..." label="*Token Address" wrapperStyle={{ width: '45%' }} style={{ width: '100% !important' }} labelStyle={{ fontSize: 20 }} value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2}>
              <Input placeholder="@" label="Telegram" labelStyle={{ fontSize: 20 }} value={telegram} onChange={e => setTelegram(e.target.value)} />
              <Input placeholder="@" label="Twitter" labelStyle={{ fontSize: 20 }} value={twitter} onChange={e => setTwitter(e.target.value)} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="https://..." label="Project Website" wrapperStyle={{ width: '100% !important' }} style={{ width: '100% !important' }} labelStyle={{ fontSize: 20 }} value={website} onChange={e => setWebsite(e.target.value)} />
            </Stack>

            <Stack direction="column" sx={{ p: 3 }} spacing={3}>
              <StyledDropzone sx={{ marginTop: 10 }} contentText={projectBannerUrl ? projectBannerUrl : "Drag project banner image and drop here"} label="*Project Banner" labelStyle={{ fontSize: 20 }} onChange={handleProjectBanner} />
              <StyledDropzone sx={{ marginTop: 10 }} contentText={tokenLogoUrl ? tokenLogoUrl : "Drag cryptocurrency logo and drop here"} label="*Token Logo" labelStyle={{ fontSize: 20 }} onChange={handleTokenLogo} />
            </Stack>

            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <Input placeholder="Write here..." label="*Project Description" wrapperStyle={{ width: '100% !important', height: 100 }} style={{ width: '100% !important', height: '100%' }} labelStyle={{ fontSize: 20 }} value={description} onChange={e => setDescription(e.target.value)} />
            </Stack>
            <Stack direction="row" spacing={7} paddingTop={2} sx={{ justifyContent: 'space-between' }}>
              <CardButton onClick={submitProject} loading={actionLoading} style={{ width: '100%', fontSize: 25 }}>Submit Change</CardButton>
            </Stack>
          </Container>
        </Container>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => ({
  project: state.project.project
})

export default connect(mapStateToProps, { getProjectById })(EditProject);