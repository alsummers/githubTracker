import React, { Component } from 'react';
import {Button, Col} from 'reactstrap'
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleUp)
library.add(faCheckCircle)

class App extends Component {
  constructor(){
    super();
    this.state = {
     events: []
    }
  }

  componentDidMount(){
    fetch('https://api.github.com/users/alsummers/events').then(response =>
  response.json()).then((data) => {
    this.setState({events: data})
    console.log(this.state)
  })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>GitTrack</h3>
          <h6>Events from www.github.com/alsummers</h6>
        </header>
        <div className = "boundaries">{this.state.events.map(event => {
          if(event.type === "PushEvent"){

        return <Button className="card-content" key={event.id}><a href={'https://www.github.com/' + event.repo.name + '/commits/master'}>
        <FontAwesomeIcon  className= "checkCircle" icon={faCheckCircle}/>
          <Col >
          <h3 className="title">{event.repo.name.slice(10)}</h3>
          <p>{event.created_at.slice(0,10)}</p>
          <p>{event.type}</p>
          <p>{event.payload.commits[0].message}</p>
          </Col>
          </a>
        </Button>
          } else {
            return <Button disabled className="card-content" key={event.id}>
            <FontAwesomeIcon className= "chevron" icon={faAngleUp} />
          <Col>
          <h3 className="title">{event.repo.name.slice(10)}</h3>
          <p>{event.created_at.slice(0,10)}</p>
          <p>{event.type}</p>
          </Col>
        </Button>
          }
        }
        )}
        </div>
      </div>
    );
  }
}

export default App;
