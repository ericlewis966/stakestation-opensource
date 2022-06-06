// material
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
// components
import { EditProject } from '../components/_external-pages/admin';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative'
}));

// ----------------------------------------------------------------------

export default function EditProjectPage() {
  return (
    <RootStyle id="move_top">
      <ContentStyle>
        <EditProject />
      </ContentStyle>
    </RootStyle>
  );
}
