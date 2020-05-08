import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Project = (props) => {
  const [project, setProject] = useState();
 
  useEffect(() => {
  const id = 1;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/Projects/${projectid}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[]);
}
export default Project;