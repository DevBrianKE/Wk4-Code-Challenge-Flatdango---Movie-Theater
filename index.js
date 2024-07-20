// Fetch Movie Data from `db.json`
function fetchMovieData() {
    fetch('http://localhost:3000/films') // Adjust URL if your server setup is different
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Movie Data:', data); // Log the fetched data to the console
            if (data.films) {
                displayMovies(data.films); // Pass the list of films to the displayMovies function
            } else {
                console.error('No films property found in data:', data);
            }
        })
        .catch(error => console.error('Error fetching data:', error)); // Handle any errors that occur during fetch
}

// Display Movies in the Document
function displayMovies(films) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear existing content

    films.forEach(film => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';

        movieItem.innerHTML = `
            <img src="${film.poster}" alt="${film.title} Poster" class="movie-poster">
            <h3>${film.title}</h3>
            <p>Runtime: ${film.runtime} minutes</p>
            <p>Showtime: ${film.showtime}</p>
            <p>Capacity: ${film.capacity}</p>
            <p>Tickets Sold: ${film.tickets_sold}</p>
            <p>Description: ${film.description}</p>
            <button onclick="showDetails('${film.id}')">View Details</button>
        `;

        movieList.appendChild(movieItem);
    });
}

// Function to Show Details of a Movie
function showDetails(id) {
    fetch('http://localhost:3000/films') // Adjust URL if needed
        .then(response => response.json())
        .then(data => {
            const film = data.films.find(film => film.id === id);
            if (film) {
                document.getElementById('poster').src = film.poster;
                document.getElementById('title').textContent = film.title;
                document.getElementById('runtime').textContent = `Runtime: ${film.runtime} minutes`;
                document.getElementById('showtime').textContent = `Showtime: ${film.showtime}`;
                document.getElementById('tickets-available').textContent = `Tickets Available: ${film.capacity - film.tickets_sold}`;
            } else {
                console.error('Film not found:', id);
            }
        })
        .catch(error => console.error('Error fetching film details:', error));
}

// Call fetchMovieData to load movies on page load
window.onload = fetchMovieData;
