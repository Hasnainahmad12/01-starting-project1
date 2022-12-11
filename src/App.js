import React, {useState} from 'react';
import {ClipLoader} from 'react-spinners';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [Movies , setMovies] = useState([]);
  //We use Loading state
  const [IsLoading, setLoading] = useState(false);
  //We use Error State
  const [error, setError] = useState(null);

  //asunc await use
    async function fetchMoviesHandler() {
      setLoading(true);
      setError(null);
      try {
        //all code we put in try block
     const response = await fetch('https://swapi.dev/api/films/')
     if(!response.ok) {
      throw new Error('Something went wrong!');
     }

     const data = await response.json();

        const transformedMovies = data.results.map((movieData) => {
          return {  
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };
        });
        setMovies(transformedMovies);

      } catch (error) {
        setError(error.message);
      }
      setLoading(false); 
   }

   let content = <p>Fount no Movies.</p>

   if(Movies.length > 0) {
    content = <MoviesList movies={Movies}/>
   }

   if(error) {
    content = <p>{error}</p>
   }

   if (IsLoading) {
    content = <p>{<ClipLoader />}</p>
   }

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;


//We use above async await method
// function fetchMoviesHandler() {
//   fetch('https://swapi.dev/api/films/')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     const transformedMovies = data.results.map((movieData) => {
//       return {  
//         id: movieData.episode_id,
//         title: movieData.title,
//         openingText: movieData.opening_crawl,
//         releaseDate: movieData.release_date
//       };
//     });
//     setMovies(transformedMovies);
//   });
  
//   }


//The Above of this code we find HTTP Errors 
// function App() {
//   const [Movies , setMovies] = useState([]);
//   //We use Loading state
//   const [IsLoading, setLoading] = useState(false);
//   //asunc await use
//     async function fetchMoviesHandler() {
//       setLoading(true);
//      const response = await fetch('https://swapi.dev/api/films/')
//      const data = await response.json();

//         const transformedMovies = data.results.map((movieData) => {
//           return {  
//             id: movieData.episode_id,
//             title: movieData.title,
//             openingText: movieData.opening_crawl,
//             releaseDate: movieData.release_date
//           };
//         });
//         setMovies(transformedMovies);
//         setLoading(false); 
//       }

//content section ki jagah we code hai
// {!IsLoading && Movies.length > 0 && <MoviesList movies={Movies} />}
// {!IsLoading && Movies.length === 0 && <p>Found no Movies</p>}
// {IsLoading && <ClipLoader />}
// {!IsLoading && error && <p>{error}</p>}
