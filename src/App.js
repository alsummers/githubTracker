import React, { Component } from 'react';
import {Row, Col} from 'reactstrap'
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
        <div>{this.state.events.map(event => {
          if(event.type === "PushEvent"){

        return <Row className="card-content" key={event.id}>
        <FontAwesomeIcon  icon={faCheckCircle}/>
          <Col>
          <h3 className="title">{event.type === "PushEvent" ? 'Push' : "Pull Request"}</h3>
          <p>{event.created_at.slice(0,10)}</p>
          <p>{event.repo.name.slice(10)}</p>
          </Col>
        </Row>
          } else {
            return <Row className="card-content" key={event.id}>
            <FontAwesomeIcon icon={faAngleUp} />
          <Col>
          <h3 className="title">{event.type === "PushEvent" ? 'Push' : "Pull Request"}</h3>
          <p>{event.created_at.slice(0,10)}</p>
          <p>{event.repo.name.slice(10)}</p>
          </Col>
        </Row>
          }
        }
        )}
        </div>
      </div>
    );
  }
}

export default App;
