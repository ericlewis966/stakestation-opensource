// material
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
// components
import { AdminForm, AdminDashboard } from '../components/_external-pages/admin';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative'
}));

// ----------------------------------------------------------------------

export default function AdminPage({to}) {
  return (
    <RootStyle id="move_top">
      <ContentStyle>
        {
          to === 1 ? <AdminDashboard /> : <AdminForm />
        }
      </ContentStyle>
    </RootStyle>
  );
}
