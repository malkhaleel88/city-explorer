import React, { Component } from 'react'
import WeatherInfo from './component/Weather';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationDisplay: '',
      latitude: '',
      longitude: '',
      weatherData: [],
      mapShown: false,
      errorShown: false,
      dataShown: false,
      errorWarning: '',
    };
  }

  submission = async (event) => {
    event.preventDefault();
    let Loc = event.target.locationName.value;

    try {

      let response = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${Loc}&format=json`);

      let locationData = response.data[0];
      let cityName = locationData.display_name.split(',')[0];
      let weatherResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/weather?searchQuery=${cityName}&lat=${locationData.lat}&lon=${locationData.lon}`);

      this.setState({
        locationDisplay: locationData.display_name,
        latitude: locationData.lat,
        longitude: locationData.lon,
        weatherData: weatherResponse.data,
        mapShown: true,
        errorShown: false,
        dataShown: true,

      });
    }
    catch (fault) {
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
        <div>
          {
            this.state.dataShown &&
            <div>
              <p>
                Location Name: {this.state.locationDisplay}
              </p>

              <p>
                Latitude: {this.state.latitude}
              </p>
              <p>
                Longitude: {this.state.longitude}
              </p>
            </div>
          }
        </div>
        <div>
          <WeatherInfo weatherRender={this.state.weatherData} />
        </div>
        <div>
          {
            this.state.mapShown &&
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.state.latitude},${this.state.longitude}`} alt="Map" />
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
