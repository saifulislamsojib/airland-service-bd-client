import { useEffect, useState } from "react";
import {
  BrowserRouter as Router, Redirect, Route, Switch
} from "react-router-dom";
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import PrivateRoute from "./components/PrivateRoute";
import { auth, setUser } from "./configs/authManager";
import context from "./context/context";
import Booking from './pages/Booking';
import Home from './pages/Home';
import Login from './pages/Login';


function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  const [loading, setLoading] = useState(true);

  const contextValue = {
    loggedInUser,
    setLoggedInUser,
    loading
  }

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser(setUser(user));
      }
      setLoading(false);
    });
  }, [])

  return (
    <context.Provider value={contextValue}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" render={() => loggedInUser.email?<Redirect to="/" />:<Login />} />
          <PrivateRoute path="/booking" component={Booking} />
          <PrivateRoute path="/booking/:id" component={Booking} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </context.Provider>
  );
}

export default App;
