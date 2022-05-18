import { ToastProvider } from 'react-toast-notifications';
// import 'react-awesome-button/dist/styles.css';
import 'react-awesome-button/dist/themes/theme-c137.css';
// routes
import Router from './routes';
//web3 context provider
import { Web3ReactProvider } from '@web3-react/core';
import getLibrary from './connectors/getLibrary';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import ThemePrimaryColor from './components/ThemePrimaryColor';
//context
import { GlobalContextProvider } from './contexts/GlobalContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <GlobalContextProvider>
        <ThemeConfig>
          <ThemePrimaryColor>
            <ToastProvider
              autoDismiss
              autoDismissTimeout={6000}
              placement="bottom-center"
            >
              <ScrollToTop />
              <Router />
            </ToastProvider>
          </ThemePrimaryColor>
        </ThemeConfig>
      </GlobalContextProvider>
    </Web3ReactProvider>
  );
}
