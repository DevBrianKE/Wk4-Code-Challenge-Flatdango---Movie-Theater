document.addEventListener('DOMContentLoaded', () => {
    // Fetch Movie Data from `db.json`
    function fetchMovieData() {
        // Use the fetch API to get movie data from the `db.json` file
        fetch('http://localhost:3000/films')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }) // Convert the response to JSON format
            .then(data => {
                console.log('Fetched Movie Data:', data); // Log the fetched data to the console
                displayMovies(data); // Pass the list of films to the displayMovies function
            })
            .catch(error => console.error('Error fetching data:', error)); // Handle any errors that occur during fetch
    }

    // Function to display movies in the list
    function displayMovies(movies) {
        const filmList = document.getElementById('films');
        filmList.innerHTML = ''; // Clear any existing content

        movies.forEach(movie => {
            // Create a new list item for each movie
            const movieItem = document.createElement('li');
            movieItem.textContent = movie.title; // Set the text content to the movie title
            movieItem.dataset.id = movie.id; // Store the movie ID in a data attribute
            movieItem.classList.add('film', 'item'); // Add classes for styling

            // Add an event listener to handle clicks on the movie item
            movieItem.addEventListener('click', () => {
                // Fetch the details of the clicked movie and display them
                console.log('Movie clicked:', movie); // Log the clicked movie
                displayMovieDetails(movie);
            });

            // Append the movie item to the film list
            filmList.appendChild(movieItem);
        });
    }

    // Function to display movie details
    function displayMovieDetails(movie) {
        // Get the elements where movie details will be displayed
        const posterElement = document.getElementById('poster');
        const titleElement = document.getElementById('title');
        const runtimeElement = document.getElementById('runtime');
        const showtimeElement = document.getElementById('showtime');
        const ticketsElement = document.getElementById('tickets');

        // // Check if the elements are being selected correctly
        // console.log('Poster Element:', posterElement);
        ;

        // Update the HTML content with the movie details
        posterElement.src = movie.poster; // Set the poster image source
        titleElement.textContent = movie.title; // Set the movie title
        runtimeElement.textContent = `Runtime: ${movie.runtime} minutes`; // Set the runtime
        showtimeElement.textContent = `Showtime: ${movie.showtime}`; // Set the showtime

        // Calculate available tickets and update the text
        const availableTickets = movie.capacity - movie.tickets_sold;
        ticketsElement.textContent = `Tickets Available: ${availableTickets}`;
    }

    // Call the function to fetch movie data when the DOM content is loaded
    fetchMovieData(); // Fetch the movie data after the DOM is fully loaded
});
