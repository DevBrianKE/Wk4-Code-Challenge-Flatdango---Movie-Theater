document.addEventListener('DOMContentLoaded', () => {
    const filmDetailsSection = document.getElementById('movie-details');
    const filmList = document.getElementById('films');
    const buyTicketButton = document.getElementById('buy-ticket');

    // Fetch all movies and populate the film list
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
            data.forEach(film => {
                const li = document.createElement('li');
                li.classList.add('film', 'item');
                li.dataset.id = film.id;
                li.innerText = film.title;
                li.addEventListener('click', () => showFilmDetails(film.id));
                
                filmList.appendChild(li);
            });
        });

    // Fetch and display details of a film
    function showFilmDetails(id) {
        fetch(`http://localhost:3000/films/${id}`)
            .then(response => response.json())
            .then(film => {
                document.getElementById('poster').src = film.poster;
                document.getElementById('title').innerText = film.title;
                document.getElementById('runtime').innerText = `Runtime: ${film.runtime} mins`;
                document.getElementById('showtime').innerText = `Showtime: ${film.showtime}`;
                const ticketsAvailable = film.capacity - film.tickets_sold;
                document.getElementById('tickets-available').innerText = `Tickets Available: ${ticketsAvailable}`;
                
                // Update the button state
                if (ticketsAvailable <= 0) {
                    buyTicketButton.innerText = 'Sold Out';
                    buyTicketButton.disabled = true;
                    document.querySelector(`[data-id="${film.id}"]`).classList.add('sold-out');
                } else {
                    buyTicketButton.innerText = 'Buy Ticket';
                    buyTicketButton.disabled = false;
                }

                buyTicketButton.onclick = () => buyTicket(film.id, ticketsAvailable);
            });
    }

    // Handle buying a ticket
    function buyTicket(id, ticketsAvailable) {
        if (ticketsAvailable > 0) {
            fetch(`http://localhost:3000/films/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tickets_sold: ticketsAvailable + 1 })
            })
            .then(response => response.json())
            .then(() => showFilmDetails(id)); // Refresh details
        }
    }
});
