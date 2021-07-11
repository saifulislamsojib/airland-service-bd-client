import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Booking from './pages/Booking';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/booking" component={Booking} />
        <Route path="/booking/:id" component={Booking} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
