import React, { Component } from 'react'
import WeatherInfo from './component/Weather';
import MoviesInfo from './component/Movies';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';


export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationDisplay: '',
      latitude: '',
      longitude: '',
      weatherData: [],
      moviesData: [],
      mapShown: false,
      dataShown: false,
    };
  }


  submission = async (event) => {

    event.preventDefault();

  await this.setState({
      loc: event.target.locationName.value
    })

    await this.locationShown();
    await this.moviesShown();
  }

  locationShown = () => {

    axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&q=${this.state.loc}&format=json`).then((response) => {

      this.setState({
        locationDisplay: response.data[0].display_name,
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
        mapShown: true,
        dataShown: true,

      })
      this.weatherShown();

    }).catch((err) => {

      console.log(err);
    })

  }


  weatherShown = () => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`).then((weatherResponse) => {
      
      this.setState({
        weatherData: weatherResponse.data,
      });
    }).catch((err) => {

      console.log(err);
    })
  
  }


  moviesShown = () => {


    axios.get(`${process.env.REACT_APP_SERVER_URL}/movies?query=${this.state.loc}`).then((moviesResponse) => {

      this.setState({
        moviesData: moviesResponse.data,
      });

    }).catch((err) => {

      console.log(err);

    })
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
          <Row>
            <Col>
              <div>
                <WeatherInfo weatherRender={this.state.weatherData} />
              </div>
            </Col>
            <Col>
              <div>
                <MoviesInfo moviesRender={this.state.moviesData} />
              </div>
            </Col>
          </Row>
        </div>
        <div>
          {
            this.state.mapShown &&
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_TOKEN}&center=${this.state.latitude},${this.state.longitude}`} alt="Map" />
          }
        </div>
      </div>
    )
  }
}
export default App
