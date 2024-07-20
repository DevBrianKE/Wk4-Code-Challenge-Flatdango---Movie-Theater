// Step 1: Fetch Movie Data from `db.json`

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