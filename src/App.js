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
      mapShown: false,
      errorShown: false,
      errorWarning: '',
    };
  }

  submission = async (event) => {
    event.preventDefault();
    let Loc = event.target.locationName.value;

    try {

      let response = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${Loc}&format=json`);



      this.setState({
        locationDisplay: response.data[0],
        latitude: response.data[0],
        longitude: response.data[0],
        mapShown: true,
        errorShown: false,

      });
    }
    catch(fault) {
      this.setState({
        errorShown: true,
        errorWarning: `${fault.response.status} ${fault.response.data.error}`
      })
   }
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
        <div>
          {
            this.state.mapShown &&
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.state.latitude.lat},${this.state.longitude.lon}`} alt="Map" />
          }
        </div>
         <div>
           <p>
             {this.state.errorWarning}
           </p>
         </div>
      </div>
    )
  }
}

export default App
