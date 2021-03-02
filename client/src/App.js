import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LoginPage from './pages/Login';
import Snackbar from './components/Snackbar';
import Loader from './components/Loader';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
        <Snackbar />
        <Loader />
      </Router>
    </AppProvider>
  );
}

export default App;
