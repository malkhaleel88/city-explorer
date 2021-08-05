import React, { Component } from 'react'

export class Weather extends Component {
    render() {
        return (
            <div>
                {
                    this.props.weatherRender.map(weather => {
                        return (
                            <div>
                                <p><h2>Date:</h2> {weather.datetime} 📅</p>
                                <p><h2>Weather Status:</h2> {weather.description} ☁</p>
                            </div>

                        );

                    })
                }
            </div>
        )
    }
}

export default Weather
