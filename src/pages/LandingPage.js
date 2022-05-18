// material
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
// components
import { CoverHeader, FarmCards, LandingMinimal, AboutUs } from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
});

const ContentStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#1d1e20',
  overflow: 'hidden',
  position: 'relative',
  "& .aws-btn": {
    "--button-default-font-size": "52px",
    "--button-large-width": "320px",
    "--button-large-height": "102px",
    "--button-primary-color":
      "radial-gradient(circle at 25% 110%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)",
    "--button-primary-color-hover":
      "radial-gradient(circle at 25% 110%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)",
    "--button-primary-color-active":
      "radial-gradient(circle at 25% 110%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)",
    "--button-primary-color-dark":
      "radial-gradient(circle at 25% 110%, #b9a800 0%, #938500 5%, #b10f00 45%, #8c0061 60%, #002ca9 90%)",
    "--button-primary-color-light": "white",

    "--button-default-font-size": "52px",
    "--button-large-width": "320px",
    "--button-large-height": "102px",
    "--button-secondary-color": "#F0B90B",
    "--button-secondary-color-hover": "#F0B90B",
    "--button-primary-color-active":
      "radial-gradient(circle at 25% 110%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)",
    "--button-secondary-color-dark": "#ba872a",
    "--button-secondary-color-light": "white",
    "--button-secondary-border": "1px solid #ba872a"
  },
  // backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle id="move_top">
      <ContentStyle>
        <CoverHeader />
        <LandingMinimal />
        <FarmCards />
        <AboutUs />
      </ContentStyle>
    </RootStyle>
  );
}
