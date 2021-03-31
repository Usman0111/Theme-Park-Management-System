import React from 'react';
import data from './data.json';
import Attractions from "./components/Attractions";

class App extends React.Component {
  constructor()
  {
    super();
    this.state = {
      attractions: data.attractions,
      cartItems: []
    }
  }


  render()
  {
    return (
      <div className="grid-container">
        <header>
          <a href="/">
            Theme Park
          </a>
        </header>

        <main>
          <div className="content">
            <div className="main">
              <Attractions attractions={this.state.attractions}>

              </Attractions>
            
            </div>
            <div className="sidebar">
              Ticket
            </div>
          </div>
        </main>

        <footer>
          Copyright
        </footer>

      </div>
    );
  }
}

export default App;
