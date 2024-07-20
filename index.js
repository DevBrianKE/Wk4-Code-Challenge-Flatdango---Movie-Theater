document.addEventListener('DOMContentLoaded', () => {
    // Fetch Movie Data from `db.json`
    function fetchMovieData() {
        // Fetch movie data from the server
        fetch('http://localhost:3000/films')
            .then(response => {
                // Check if response is OK, else throw an error
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse response as JSON
            })
            .then(data => {
                console.log('Fetched Movie Data:', data);
                
                // Remove placeholder `li` if it exists
                const placeholder = document.querySelector('#films li.placeholder');
                if (placeholder) {
                    placeholder.remove(); // Remove placeholder
                }

                // Display fetched movies
                displayMovies(data);
                
                // Display details of the first movie by default if data is available
                if (data.length > 0) {
                    fetchAndDisplayMovieDetails(data[0].id);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to fetch and display a movie's details by ID
    function fetchAndDisplayMovieDetails(movieId) {
        // Fetch movie details by ID
        fetch(`http://localhost:3000/films/${movieId}`)
            .then(response => {
                // Check if response is OK, else throw an error
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse response as JSON
            })
            .then(movie => {
                console.log('Fetched Movie Details:', movie);
                // Display movie details
                displayMovieDetails(movie);
            })
            .catch(error => console.error('Error fetching movie details:', error));
    }

    // Function to display movies in the list
    function displayMovies(movies) {
        const filmList = document.getElementById('films');
        filmList.innerHTML = ''; // Clear the existing list

        // Loop through movies and create list items
        movies.forEach(movie => {
            const movieItem = document.createElement('li');
            movieItem.textContent = movie.title; // Set movie title
            movieItem.dataset.id = movie.id; // Store movie ID in dataset
            movieItem.classList.add('film', 'item'); // Add classes

            // Add 'sold-out' class if movie is sold out
            if (movie.capacity - movie.tickets_sold <= 0) {
                movieItem.classList.add('sold-out'); // Mark as sold out
            }

            // Add event listener to display movie details on click
            movieItem.addEventListener('click', () => {
                console.log('Movie clicked:', movie);
                fetchAndDisplayMovieDetails(movie.id); // Fetch and display details
            });

            filmList.appendChild(movieItem); // Add item to the list
        });
    }

    // Function to display detailed information about a selected movie
    function displayMovieDetails(movie) {
        const posterElement = document.getElementById('poster');
        const titleElement = document.getElementById('title');
        const runtimeElement = document.getElementById('runtime');
        const showtimeElement = document.getElementById('showtime');
        const ticketsElement = document.getElementById('tickets');
        const buyButton = document.getElementById('buy-ticket');
    
        // Set movie poster
        posterElement.src = movie.poster;
        // Set movie title
        titleElement.textContent = movie.title;
        // Set movie runtime
        runtimeElement.textContent = `Runtime: ${movie.runtime} minutes`;
        // Set movie showtime
        showtimeElement.textContent = `Showtime: ${movie.showtime}`;
        
        // Calculate and display available tickets
        let availableTickets = movie.capacity - movie.tickets_sold;
        ticketsElement.textContent = `Tickets Available: ${availableTickets}`;
        
        // Update Buy Ticket button based on availability
        if (availableTickets <= 0) {
            buyButton.disabled = true; // Disable button if no tickets
            buyButton.classList.add('sold-out'); // Add 'sold-out' class
            buyButton.textContent = "Sold Out"; // Change button text
        } else {
            buyButton.disabled = false; // Enable button if tickets are available
            buyButton.classList.remove('sold-out'); // Remove 'sold-out' class
            buyButton.textContent = "Buy Ticket"; // Change button text
        }
    
        // Handle Buy Ticket button click
        buyButton.onclick = () => {
            if (availableTickets > 0) {
                availableTickets -= 1; // Decrement available tickets
                ticketsElement.textContent = `Tickets Available: ${availableTickets}`; // Update ticket count
                buyButton.disabled = availableTickets <= 0; // Disable button if no tickets left
                if (availableTickets <= 0) {
                    buyButton.classList.add('sold-out'); // Add 'sold-out' class
                    buyButton.textContent = "Sold Out"; // Change button text
                }
            }
        };
    }

    // Fetch movie data when the DOM content is loaded
    fetchMovieData();
});
