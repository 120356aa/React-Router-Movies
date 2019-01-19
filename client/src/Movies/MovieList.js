import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import MovieCard from './MovieCard';
import styled from 'styled-components';

const MovieListContainer = styled.div `
  border: 1px solid red;
`

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <MovieListContainer>
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </MovieListContainer>
    );
  }
}

function MovieDetails({ movie }) {
  const { id } = movie;
  return (
    <NavLink to={`/movies/${id}`}>
      <MovieCard movie={movie} />
    </NavLink>
  );
}
