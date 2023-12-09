// Get the playlist button element by its id
var playlistButton = document.getElementById("playlist-button");

// Get the search/browse section element by its id
var searchSongsView = document.getElementById("search-songs-view");

// Get the single-song view element by its id
var singleSongView = document.getElementById("single-song-view");

// Add an event listener to the playlist button
playlistButton.addEventListener("click", function () {
    // Show the playlist view
    searchSongsView.style.display = "none";
    singleSongView.style.display = "none";
    playlistView.style.display = "block";
});

// Get the remove all button element by its id
var removeAllButton = document.getElementById("remove-all-button");

// Add an event listener to the remove all button
removeAllButton.addEventListener("click", function () {
    // Call the function to remove all songs from the playlist
    removeAllFromPlaylist();
});

// Function to remove all songs from the playlist
function removeAllFromPlaylist() {
    // Clear the playlistData array
    playlistData = [];

    // Update the playlist view to reflect the changes
    updatePlaylistView();

    console.log("All songs removed from the playlist.");
}

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

// Function to update the displayed playlist
function updatePlaylistView() {
    const playlistTableBody = document.querySelector("#playlist-view tbody");
    playlistTableBody.innerHTML = ''; // Clear existing rows

    playlistData.forEach((song) => {
        // Create a new row and cells for each song
        const row = document.createElement("tr");
        row.appendChild(createCell(song.title));
        row.appendChild(createCell(song.artist.name));
        row.appendChild(createCell(song.year));
        row.appendChild(createCell(song.genre.name));
        row.appendChild(createCell(song.details.popularity));

        // Add button cell for removing from the playlist
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
    });
}

// Function to remove a song from the playlist
function removeFromPlaylist(songId) {
    // Find index of song in playlistData array
    const index = playlistData.findIndex((song) => song.song_id === songId);

    // Remove song from playlistData array
    if (index !== -1) {
        playlistData.splice(index, 1);

        updatePlaylistView();
    }
}

// Function for creating a cell for each row
function createCell(value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    return cell;
}
