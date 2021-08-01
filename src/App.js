import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationDisplay: {},
      latitude: {},
      longitude: {},
      
    };
  }

  submission = async (event) => {
    event.preventDefault();
    let Loc = event.target.locationName.value;

    let response = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${Loc}&format=json`);

 

    this.setState({
      locationDisplay: response.data[0],
      latitude: response.data[0],
      longitude: response.data[0],

    });
  }

  render() {
    return (
      <div>
          <form onSubmit={this.submission} >
          <label >Location Name  </label>
          <input name="locationName" type="text" placeholder="Enter Location Name" />
           <input type="submit" value="Explore!" />
        </form>
        <br />
        <h2>Location Data</h2>
        
          {
            this.state.locationDisplay.display_name &&
            <p>
              Location Name: {this.state.locationDisplay.display_name}
            </p>
          }
           {
            this.state.latitude.lat &&
            <p>
              Latitude: {this.state.latitude.lat}
            </p>
          }
           {
            this.state.longitude.lon &&
            <p>
              Longitude: {this.state.longitude.lon}
            </p>
          }
         
      </div>
    )
  }
}

export default App
