import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Products from './components/Products';

class App extends Component {
  render(){
    return (
      <div className="App">
        <div className="container">
          <Products />
        </div>
      </div>
    );
  }
}

export default App;
