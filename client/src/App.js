import { Provider } from 'react-redux';
import store from './state/store';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
