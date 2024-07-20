// Fetch Movie Data from `db.json`

// Function to fetch movie data
function fetchMovieData() {
    //use the fetch API to get movie data from the db.json file
    fetch('http://localhost:3000/films')
    .then(response => response.json())// Convert the response to JSON format
    .then(data => {
        console.log('Fetched Movie Data:', data)// Log the fetched data to the console
        const films = data.films // Store the list of films from the JSON data
    })
    // Handle any errors that occur during fetch
    .catch(error => console.error('Error fetching data:', error)); 
}
// Call the function to fetch movie data when the script loads
fetchMovieData();
// Function to display movies in the list


// Display Movie Details

// Function to display movie details
function displayMovieDetails(movie) {
    // get the elements where movie details will be displayed
    const posterElement = document.getElementById('poster')
    const titleElement = document.getElementById('title')
    const runtimeElement = document.getElementById('runtime')
    const showtimeElement = document.getElementById('showtime')
    const ticketsElement = document.getElementById('tickets')

    //update the HTML content with the movie details
    posterElement.src = movie.poster //set the poster image
    titleElement.textContent = movie.title //set the movie title
    runtimeElement.textContent = `Runtime: ${movie.runtime} minutes`; // Set the runtime
    showtimeElement.textContent = `Showtime: ${movie.showtime}`; // Set the showtime

    // Calculate available tickets and update the text
    const availableTickets = movie.capacity - movie.tickets_sold;
    ticketsElement.textContent = `Tickets Available: ${availableTickets}`;
}