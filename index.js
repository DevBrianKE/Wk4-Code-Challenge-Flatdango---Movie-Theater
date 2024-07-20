document.addEventListener('DOMContentLoaded', () => {
    // Fetch Movie Data from `db.json`
    function fetchMovieData() {
        // Fetch the list of movies
        fetch('http://localhost:3000/films')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched Movie Data:', data);
                
                // Remove placeholder `li` element if it exists
                const placeholder = document.querySelector('#films li.placeholder');
                if (placeholder) {
                    placeholder.remove();
                }

                displayMovies(data);
                
                // Automatically display the first movie's details
                if (data.length > 0) {
                    fetchAndDisplayFirstMovie();
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to fetch and display the first movie's details
    function fetchAndDisplayFirstMovie() {
        fetch('http://localhost:3000/films/1')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(movie => {
                console.log('First Movie Data:', movie);
                displayMovieDetails(movie);
            })
            .catch(error => console.error('Error fetching the first movie data:', error));
    }

    // Function to display movies in the list
    function displayMovies(movies) {
        const filmList = document.getElementById('films');
        filmList.innerHTML = '';

        movies.forEach(movie => {
            const movieItem = document.createElement('li');
            movieItem.textContent = movie.title;
            movieItem.dataset.id = movie.id;
            movieItem.classList.add('film', 'item');

            movieItem.addEventListener('click', () => {
                console.log('Movie clicked:', movie);
                displayMovieDetails(movie);
            });

            filmList.appendChild(movieItem);
        });
    }

    function displayMovieDetails(movie) {
        const posterElement = document.getElementById('poster');
        const titleElement = document.getElementById('title');
        const runtimeElement = document.getElementById('runtime');
        const showtimeElement = document.getElementById('showtime');
        const ticketsElement = document.getElementById('tickets');
        const buyButton = document.getElementById('buy-ticket');

        posterElement.src = movie.poster;
        titleElement.textContent = movie.title;
        runtimeElement.textContent = `Runtime: ${movie.runtime} minutes`;
        showtimeElement.textContent = `Showtime: ${movie.showtime}`;

        const availableTickets = movie.capacity - movie.tickets_sold;
        ticketsElement.textContent = `Tickets Available: ${availableTickets}`;
        
        // Enable or disable the Buy Ticket button based on availability
        buyButton.disabled = availableTickets <= 0;
        buyButton.onclick = () => {
            if (availableTickets > 0) {
                ticketsElement.textContent = `Tickets Available: ${availableTickets - 1}`;
                buyButton.disabled = (availableTickets - 1 <= 0);
            }
        };
    }

    // Call the function to fetch movie data when the DOM content is loaded
    fetchMovieData();
});