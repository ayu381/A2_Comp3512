// Get the playlist button element by its id
var playlistButton = document.getElementById("playlist-button");

// Get the search/browse section element by its id
var searchSongsView = document.getElementById("search-songs-view");

// Get the single-song view element by its id
var singleSongView = document.getElementById("single-song-view");

// Get the playlist view element by its id
var playlistView = document.getElementById("playlist-view");

// Add an event listener to the playlist button
playlistButton.addEventListener("click", function () {
    // Show the playlist view
    searchSongsView.style.display = "none";
    singleSongView.style.display = "none";
    playlistView.style.display = "block";
});

var removeAllButton = document.getElementById("remove-all-button");

// Add event listener for remove all button
removeAllButton.addEventListener("click", function () {
    removeAllFromPlaylist();
});

// Define an array to store playlist data
let playlistData = [];

// Function to add a song to the playlist
function addToPlaylist(song) {
    // Check if song is already in the playlist
    const isDuplicate = playlistData.some((item) => item.song_id === song.song_id);

    // If loop for check for duplicate songs
    if (!isDuplicate) {
        // Add the song to playlist array
        playlistData.push(song);

        updatePlaylistView();

        console.log(`Song "${song.title}" by ${song.artist.name} added to the playlist.`);
    } else {
        console.log(`Song "${song.title}" by ${song.artist.name} is already in the playlist.`);
    }
}

// Function to update the displayed playlist and summary
function updatePlaylistView() {
    const playlistTableBody = document.querySelector("#playlist-view tbody");
    // Table is initially cleared
    playlistTableBody.innerHTML = ''; 

    playlistData.forEach((song) => {
        // Create new row and cells for each song
        const row = document.createElement("tr");
        row.appendChild(createCell(song.title));
        row.appendChild(createCell(song.artist.name));
        row.appendChild(createCell(song.year));
        row.appendChild(createCell(song.genre.name));
        row.appendChild(createCell(song.details.popularity));

        // Remove all button
        const removeButtonCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            removeFromPlaylist(song.song_id);
        });
        removeButtonCell.appendChild(removeButton);
        row.appendChild(removeButtonCell);

        // Append the row to the playlist table body
        playlistTableBody.appendChild(row);

        // click event for each row
        row.addEventListener("click", () => rowClicked(song, playlistData));
    });

    // Update playlist count and average info
    const playlistCount = document.getElementById("playlist-count");
    const playlistAverage = document.getElementById("playlist-average");

    // Calculate count and average
    const count = playlistData.length;
    const average = calculateAveragePopularity();

    // Display count and average 
    playlistCount.textContent = count;
    playlistAverage.textContent = average;
}

// Function for calculating average popularity
function calculateAveragePopularity() {
    if (playlistData.length === 0) {
        return 0;
    }

    const totalPopularity = playlistData.reduce((sum, song) => sum + song.details.popularity, 0);
    return (totalPopularity / playlistData.length).toFixed(2); 
}

// Function to remove a song from playlist
function removeFromPlaylist(songId) {
    // Find index of song in playlistData array
    const index = playlistData.findIndex((song) => song.song_id === songId);

    // Remove song from playlistData array
    if (index !== -1) {
        playlistData.splice(index, 1);

        updatePlaylistView();
    }
}

// Function for clearing playlist
function removeAllFromPlaylist() {
    // Clear the playlistData array
    playlistData = [];

    // Update view show that playlist is cleared
    updatePlaylistView();

    console.log("All songs removed from the playlist.");
}

// Function for creating a cell for each row
function createCell(value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    return cell;
}
