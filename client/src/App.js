import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LoginPage from './pages/Login';
import AppsPage from './pages/Apps';
import Snackbar from './components/Snackbar';
import Loader from './components/Loader';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/apps">
            <AppsPage />
          </Route>
        </Switch>
        <Snackbar />
        <Loader />
      </Router>
    </AppProvider>
  );
}

export default App;
