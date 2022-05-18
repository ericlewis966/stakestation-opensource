import { styled } from '@material-ui/core/styles';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------
const Scroll = styled(Box)(() => ({
  height: 680,
  background: 'url(/images/soldiers-bg.png)',
  backgroundSize: '1024px 680px',
  animation: 'mosaic 10s linear infinite',
  '@keyframes mosaic': {
    '0%': {
      backgroundPosition: '0 0'
    },
    '100%': {
      backgroundPosition: '-1024px 0'
    }
  }
}));
export default function ImageScroll() {
  return <Scroll />;
}
