import { Provider } from 'react-redux';
import store from './state/store';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          
        </div>
      </Router>
    </Provider>
  );
}

export default App;
