document.addEventListener('DOMContentLoaded', () => {
    // Fetch Movie Data from `db.json`
    function fetchMovieData() {
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
                    fetchAndDisplayMovieDetails(data[0].id);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to fetch and display a movie's details by ID
    function fetchAndDisplayMovieDetails(movieId) {
        fetch(`http://localhost:3000/films/${movieId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(movie => {
                console.log('Fetched Movie Details:', movie);
                displayMovieDetails(movie);
            })
            .catch(error => console.error('Error fetching movie details:', error));
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

            // Add the 'sold-out' class if the movie is sold out
            if (movie.capacity - movie.tickets_sold <= 0) {
                movieItem.classList.add('sold-out');
            }

            movieItem.addEventListener('click', () => {
                console.log('Movie clicked:', movie);
                fetchAndDisplayMovieDetails(movie.id);
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
        
        // Define availableTickets
        let availableTickets = movie.capacity - movie.tickets_sold;
        ticketsElement.textContent = `Tickets Available: ${availableTickets}`;
        
        // Enable or disable the Buy Ticket button based on availability
        if (availableTickets <= 0) {
            buyButton.disabled = true;
            buyButton.classList.add('sold-out'); // Add 'sold-out' class
            buyButton.textContent = "Sold Out"; // Update button text
        } else {
            buyButton.disabled = false;
            buyButton.classList.remove('sold-out'); // Remove 'sold-out' class
            buyButton.textContent = "Buy Ticket"; // Update button text
        }
    
        buyButton.onclick = () => {
            if (availableTickets > 0) {
                availableTickets -= 1;
                ticketsElement.textContent = `Tickets Available: ${availableTickets}`;
                buyButton.disabled = availableTickets <= 0;
                if (availableTickets <= 0) {
                    buyButton.classList.add('sold-out'); // Add 'sold-out' class
                    buyButton.textContent = "Sold Out"; // Update button text
                }
            }
        };
    }
    

    // Fetch movie data when the DOM content is loaded
    fetchMovieData();
});
