// JSON parsing for each file given
const artists = JSON.parse(artistContent);
const genres = JSON.parse(genreContent);


// Variables for event listeners
var songSearch = document.getElementById('song-search');
var artistSelect = document.getElementById('artist-select');
var genreSelect = document.getElementById('genre-select');

var titleOption = document.getElementById('title-option');
var artistOption = document.getElementById('artist-option');
var genreOption = document.getElementById('genre-option');

// Initially disable artist and genre select forms before using their respective radio buttons
artistSelect.disabled = true;
genreSelect.disabled = true;

// Event listeners for radio buttons
titleOption.addEventListener('change', function () {
    songSearch.disabled = false;
    artistSelect.disabled = true;
    genreSelect.disabled = true;
});

artistOption.addEventListener('change', function () {
    songSearch.disabled = true;
    artistSelect.disabled = false;
    genreSelect.disabled = true;
});

genreOption.addEventListener('change', function () {
    songSearch.disabled = true;
    artistSelect.disabled = true;
    genreSelect.disabled = false;
});

/// Define originalData as an empty array initially
let originalData = [];

// Function to populate rows with song data
function songDisplay() {
    // Check if data is in local storage
    const storedData = localStorage.getItem('songData');
    if (storedData) {
        // Parse stored data
        const localData = JSON.parse(storedData);

        // Sort
        const sortedLocalData = sortSongs(localData);
        displaySongs(sortedLocalData);

        // Update originalData with the sorted data
        originalData = sortedLocalData;
    } else {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                // Sort
                const sortedApiData = sortSongs(data);
                displaySongs(sortedApiData);

                // Save data to local storage
                localStorage.setItem('songData', JSON.stringify(data));

                // Update originalData with the sorted data
                originalData = sortedApiData;
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

// Function to display filtered songs
function displayFilteredSongs(filteredSongs) {
    displaySongs(filteredSongs);
}

// create rows and append cells
function displaySongs(songsToDisplay) {
    const tableBody = document.querySelector("#search-results tbody");

    // Clear existing rows
    tableBody.innerHTML = '';

    // Iterate through each song and create a new row in the table
    songsToDisplay.forEach((song) => {
        const row = document.createElement("tr");

        // Append cells
        row.appendChild(createCell(song.title));
        row.appendChild(createCell(song.artist.name));
        row.appendChild(createCell(song.year));
        row.appendChild(createCell(song.genre.name));
        row.appendChild(createCell(song.details.popularity));

        // Add button cell
        const addToPlaylistCell = document.createElement("td");
        const addToPlaylistButton = document.createElement("button");
        addToPlaylistButton.textContent = "Add";
        addToPlaylistButton.addEventListener("click", function () {
            addToPlaylist(song); 
        });
        addToPlaylistCell.appendChild(addToPlaylistButton);
        row.appendChild(addToPlaylistCell);

        tableBody.appendChild(row);
    });
}

function addToPlaylist(song) {
    // Implement the logic to add the song to the playlist
    // For example, you can store the selected songs in an array or perform any other desired action
    console.log("Adding to playlist:", song.title);
}

// Function to create cell for each row - then appended above
function createCell(value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    return cell;
}

// Artist select options function
function artistOptions() {
    const artistSelect = document.getElementById("artist-select");

    // Create an option for each artist and add it to the select element
    artists.forEach((artist) => {
        const option = document.createElement("option");
        option.value = artist.name;
        option.textContent = artist.name;
        artistSelect.appendChild(option);
    });

    // Event listener for changes in the artist dropdown
    artistSelect.addEventListener('change', function () {
        filterSongs();
    });
}

// Genre select options function
function genreOptions() {
    const genreSelect = document.getElementById("genre-select");

    // Create an option for each genre and add it to the select element
    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre.name;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });

    // Event listener for changes in the genre dropdown
    genreSelect.addEventListener('change', filterSongs);
}

// Event Listeners
document.getElementById("artist-select").addEventListener('change', filterSongs);
document.getElementById("genre-select").addEventListener('change', filterSongs);
document.getElementById("search-button").addEventListener("click", filterSongs);

// Function to filter songs based on selected artist, genre, and title
function filterSongs() {
    const selectedArtist = document.getElementById("artist-select").value;
    const selectedGenre = document.getElementById("genre-select").value;
    const typedTitle = document.getElementById("song-search").value.toLowerCase();

    // Retrieve the data from local storage or API
    const storedData = localStorage.getItem('songData');
    const songs = storedData ? JSON.parse(storedData) : [];

    let sortedSongs = sortSongs(songs, 'title', sortTitleOrder);

    if (sortArtistOrder === 'desc') {
        sortedSongs = sortSongs(sortedSongs, 'artist', 'desc');
    }

    if (sortGenreOrder === 'desc') {
        sortedSongs = sortSongs(sortedSongs, 'genre', 'desc');
    }

    if (sortYearOrder === 'desc') {
        sortedSongs = sortSongs(sortedSongs, 'year', 'desc');
    }

    const filteredSongs = sortedSongs.filter(song =>
        (!selectedArtist || song.artist.name === selectedArtist) &&
        (!selectedGenre || song.genre.name === selectedGenre) &&
        (!typedTitle || song.title.toLowerCase().startsWith(typedTitle))
    );

    displayFilteredSongs(filteredSongs);
}

// Click event listeners for headers
const titleTh = document.getElementById("title-th");
const artistTh = document.getElementById("artist-th");
const yearTh = document.getElementById("year-th");
const genreTh = document.getElementById("genre-th");
const popularityTh = document.getElementById("popularity-th");

// Global variables for ordering
let sortTitleOrder = 'asc';
let sortArtistOrder = 'asc';
let sortYearOrder = 'asc';
let sortGenreOrder = 'asc';
let sortPopularityOrder = 'asc';

// Sorting functions for songs
function sortSongs(songsSorted, sortBy, sortOrder) {
    return songsSorted.sort((a, b) => {
        const valueA = getValue(a, sortBy);
        const valueB = getValue(b, sortBy);

        if (sortBy === 'artist') {
            // For artist sorting, consider both artist and title
            const artistComparison = valueA.localeCompare(valueB);
            if (artistComparison === 0) {
                return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            }
            return sortOrder === 'asc' ? artistComparison : -artistComparison;
        }

        // Use localeCompare for string comparison
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
}

function getValue(song, sortBy) {
    if (sortBy === 'title') {
        return song.title ? song.title.toUpperCase() : '';
    } else if (sortBy === 'artist') {
        return song.artist && song.artist.name ? song.artist.name.toUpperCase() : '';
    } else if (sortBy === 'genre') {
        return song.genre && song.genre.name ? song.genre.name.toUpperCase() : '';
    }

    // Add additional cases for other sorting criteria if needed
    return '';
}

function toggleSortOrder(sortBy) {
    if (sortBy === 'title') {
        sortTitleOrder = sortTitleOrder === 'asc' ? 'desc' : 'asc';
        sortArtistOrder = 'asc';
        sortGenreOrder = 'asc'; // Reset genre order when sorting by title
    } else if (sortBy === 'artist') {
        sortArtistOrder = sortArtistOrder === 'asc' ? 'desc' : 'asc';
        sortTitleOrder = 'asc';
        sortGenreOrder = 'asc'; // Reset genre order when sorting by artist
    } else if (sortBy === 'genre') {
        sortGenreOrder = sortGenreOrder === 'asc' ? 'desc' : 'asc';
        sortTitleOrder = 'asc';
        sortArtistOrder = 'asc'; // Reset artist order when sorting by genre
    }
}

titleTh.addEventListener('click', function () {
    toggleSortOrder('title');
    filterSongs();
});

artistTh.addEventListener('click', function () {
    toggleSortOrder('artist');
    filterSongs();
});

yearTh.addEventListener('click', function () {
    toggleSortOrder('year'); 
    filterSongs(); 
});

genreTh.addEventListener('click', function () {
    toggleSortOrder('genre'); 
    filterSongs(); 
});

/*

popularityTh.addEventListener('click', function () {
    toggleSortOrder(); 
    filterSongs(); 
});
*/

// Event listening for clearing table data
document.getElementById("clear-button").addEventListener("click", clearFormAndTable);

function clearFormAndTable() {
    // Clear the text input
    songSearch.value = '';

    // Reset radio buttons to default
    titleOption.checked = true;
    artistOption.checked = false;
    genreOption.checked = false;

    // Disable and reset select elements
    artistSelect.disabled = true;
    genreSelect.disabled = true;
    artistSelect.selectedIndex = 0;
    genreSelect.selectedIndex = 0;

    // Reset the sorting order to original state
    sortTitleOrder = 'asc';
    sortArtistOrder = 'asc';

    // Call filterSongs to refresh the displayed data with the originalData
    filterSongs();
}

// Call all functions when window is loaded
window.onload = function () {
    // Set the initial sorting order for title
    sortTitleOrder = 'asc';  
    artistOptions();
    genreOptions();

    // Load the songs and sort them by title
    songDisplay();
    
    filterSongs();  // Apply sorting and filtering based on the initial state
};