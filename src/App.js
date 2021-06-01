import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Pages} from './pages'
function App(props) {
  return (
    <div>
      <Router>
        <Route path='/' exact component={Pages.Login} {...props}></Route>
        <Route path='/devices' exact component={Pages.Devices} {...props}></Route>
      </Router>
    </div>
  );
}

export default App;
