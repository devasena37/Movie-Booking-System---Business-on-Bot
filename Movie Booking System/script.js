// script.js

// Function to fetch and display movies by year
function fetchMoviesByYear(year) {
    fetch(`/api/movies/${year}`)
        .then(response => response.json())
        .then(data => {
            const movieDetailsContainer = document.getElementById('movie-details');

            // Clear previous content
            movieDetailsContainer.innerHTML = '';

            // Check if there are movies for the selected year
            if (data.length === 0) {
                const noMoviesMessage = document.createElement('p');
                noMoviesMessage.textContent = 'No movies found for the selected year.';
                movieDetailsContainer.appendChild(noMoviesMessage);
            } else {
                // Loop through movies and display them
                data.forEach(movie => {
                    const movieDiv = document.createElement('div');
                    movieDiv.classList.add('movie-details');
                    movieDiv.innerHTML = `
                        <h2>${movie.movie_name}</h2>
                        <p>Release Date: ${movie.release_date}</p>
                        <p>Theater Location: ${movie.theater_location}</p>
                        <p>Theater Name: ${movie.theater_name}</p>
                    `;
                    movieDetailsContainer.appendChild(movieDiv);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Event listener for year filter change (assuming you have a year filter)
const yearFilter = document.getElementById('year-filter');
yearFilter.addEventListener('change', function () {
    const selectedYear = yearFilter.value;
    fetchMoviesByYear(selectedYear);
});

// Initialize movie details (assuming you want to show all movies initially)
fetchMoviesByYear('all');
