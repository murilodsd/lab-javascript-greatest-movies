// Iteration 1: All directors? - Get the array of all directors.

function getAllDirectors(moviesArray) {
  return moviesArray.map((movie) => movie.director);
}

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  let stevenMovies = [...moviesArray].filter(
    (movie) => movie.director === "Steven Spielberg" && isDrama(movie)
  );

  return stevenMovies.length;
}

function isDrama(movie) {
  return movie.genre.includes("Drama");
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }

  return +(scoreSum([...moviesArray]) / moviesArray.length).toFixed(2);
}

function scoreSum(moviesArray) {
  return moviesArray.reduce((acc, current) => acc + (current.score || 0), 0); //(current.score||0) tratamento para o caso de current.score não existir
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let dramaMovies = [...moviesArray].filter((movie) => isDrama(movie));

  if (dramaMovies.length === 0) {
    return 0;
  }

  return +(scoreSum(dramaMovies) / dramaMovies.length).toFixed(2);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  moviesOrderedByYear = [...moviesArray].sort(function (a, b) {
    if (a.year - b.year < 0) {
      return -1;
    } else if (a.year - b.year > 0) {
      return 1;
    } else {
      //Como é texto vamos comparar uma com a outra e não fazer uma subtração
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else return 0;
    }
  });

  return moviesOrderedByYear;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let arrayOfTitles = getTitles(orderByName([...moviesArray]));

  //Lembrar que o slice diferentemente do metodo substring informa quantos elementos vai pegar e não até qual posição
  firts20MoviesOrderedByNames = arrayOfTitles.slice(0, 20);

  return firts20MoviesOrderedByNames;
}

function getTitles(moviesArray) {
  return moviesArray.map((movie) => movie.title);
}

function orderByName(moviesArray) {
  moviesOrderedByNames = [...moviesArray].sort(function (a, b) {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    } else return 0;
  });
  return moviesOrderedByNames;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let arrayCopied = JSON.parse(JSON.stringify(moviesArray));

  let moviesInMinutes = arrayCopied.map((movie) => {
    movie.duration = changeForMinutes(movie.duration);
    return movie;
  });
  return moviesInMinutes;
}

function changeForMinutes(string) {
  let hoursAndMinutes = string.split(" ");

  let hours = hoursAndMinutes[0].substring(0, hoursAndMinutes[0].indexOf("h"));
  let minutes =
    hoursAndMinutes.length === 2
      ? hoursAndMinutes[1].substring(0, hoursAndMinutes[1].indexOf("m"))
      : 0;

  return parseInt(hours) * 60 + parseInt(minutes);
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
        return null;
      }
  
    let years = getSumOfGradesAndNumberOfMoviesByYear(moviesArray);

  years.sort((a, b) => ((b[1] / b[2]) - a[1] / a[2]))
    

  let year = years[0][0];

  let score = years[0][1]/ years[0][2];

  return `The best year was ${year} with an average score of ${score}`;
}

function getSumOfGradesAndNumberOfMoviesByYear(moviesArray) {
  let years = {};

  moviesArray.forEach((movie) => {
    if (years[movie.year]) {
      years[movie.year].score += movie.score;
      years[movie.year].movies++;
    } else {
      years[movie.year] = { score: movie.score, movies: 1 };
    }
  });

  let sortableYears = []

  for (let eachYear in years) {
    sortableYears.push([eachYear,years[eachYear].score,years[eachYear].movies]);
  }
  return sortableYears;
}
