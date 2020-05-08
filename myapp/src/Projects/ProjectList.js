import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = props => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/projects')
        .then(response => {
          setMovies(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getProjects();
  }, []);
  
  return (
    <div className="project-list">
      {movies.map(movie => (
        <MovieDetails key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;