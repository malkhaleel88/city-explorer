import React, { Component } from 'react'

export class Movies extends Component {
    render() {
        return (
            <div>
                {
                    this.props.moviesRender.map(movies => {
                        return (
                            <div>
                                <p><h2>Movie Name:</h2> {movies.title} 🎥</p>
                                <p><h2>Overview:</h2> {movies.overview} 🧾</p>
                                <p><h2>Average Votes:</h2> {movies.avgVotes} 📊</p>
                                <p><h2>Total votes:</h2> {movies.totalVotes} 📈</p>
                                <img src={movies.imgUrl} alt="Poster" />
                                <p><h2>Popularity:</h2> {movies.popularity} 🤩</p>
                                <p><h2>Release Date:</h2> {movies.releasedOn} 📅</p>
                            </div>

                        );

                    })
                }
            </div>
        )
    }
}

export default Movies



