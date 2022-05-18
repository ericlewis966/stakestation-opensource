// material
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
// components
import { Project } from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative'
}));

// ----------------------------------------------------------------------

export default function ProjectPage() {
  return (
    <RootStyle id="move_top">
      <ContentStyle>
        <Project />
      </ContentStyle>
    </RootStyle>
  );
}
