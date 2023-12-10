
// Selecting Views
var playlistButton = document.querySelector("#playlist-button");
const removeAllButton = document.querySelector("#remove-all-button");
const searchSongsView = document.querySelector("#search-songs-view");
const playlistView = document.querySelector("#playlist-view");

//Make playlist view hidden initially
playlistView.style.display = "none";

// Event listeners
playlistButton.addEventListener("click", toggleViews);
removeAllButton.addEventListener("click", removeAllFromPlaylist);

// Playlist data
let playlistData = [];

// Toggle between Search Songs and Playlist Views
function toggleViews() {
    if (searchSongsView.style.display !== "none") {
        showPlaylistView();
    } else {
        showSearchSongsView();
    }
}

// Show the Playlist View and update button text
function showPlaylistView() {
    searchSongsView.style.display = "none";
    playlistView.style.display = "block";
    playlistButton.textContent = "Close Playlist";
}

// Show the Search Songs View and update button text
function showSearchSongsView() {
    searchSongsView.style.display = "block";
    playlistView.style.display = "none";
    playlistButton.textContent = "Playlist";
}

// Add a song to the playlist
function addToPlaylist(song) {
    const isDuplicate = playlistData.some((item) => item.song_id === song.song_id);
    
    if (!isDuplicate) {
        playlistData.push(song);
        updatePlaylistView();
        console.log(`Song "${song.title}" by ${song.artist.name} added to the playlist.`);
    } else {
        console.log(`Song "${song.title}" by ${song.artist.name} is already in the playlist.`);
    }
}

// Update the displayed playlist and summary
function updatePlaylistView() {
    const playlistTableBody = document.querySelector("#playlist-view tbody");
    playlistTableBody.innerHTML = '';

    // Iterate through each song and create a new row in the table
    playlistData.forEach((song) => {
        const row = document.createElement("tr");
        appendCreateCells(row, song);
        appendRemoveButton(row, song.song_id);
        playlistTableBody.appendChild(row);
        row.addEventListener("click", () => rowClicked(song, playlistData));
    });

    updatePlaylistSummary();
}

// Append remove button to a table row
function appendRemoveButton(row, songId) {
    const removeButtonCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeFromPlaylist(songId));
    removeButtonCell.appendChild(removeButton);
    row.appendChild(removeButtonCell);
}

// Update playlist count and average info
function updatePlaylistSummary() {
    const playlistCount = document.getElementById("playlist-count");
    const playlistAverage = document.getElementById("playlist-average");

    // Calculate count and average
    const count = playlistData.length;
    const average = calculateAveragePopularity();

    // Display count and average 
    playlistCount.textContent = count;
    playlistAverage.textContent = average;
}

// Calculate the average popularity of songs in the playlist
function calculateAveragePopularity() {
    if (playlistData.length === 0) {
        return 0;
    }

    const totalPopularity = playlistData.reduce((sum, song) => sum + song.details.popularity, 0);
    return (totalPopularity / playlistData.length).toFixed(2); 
}

// Remove a song from the playlist
function removeFromPlaylist(songId) {
    // Find index of song in playlistData array
    const index = playlistData.findIndex((song) => song.song_id === songId);

    // Remove song from playlistData array
    if (index !== -1) {
        playlistData.splice(index, 1);
        updatePlaylistView();
    }
}

// Remove all songs from the playlist
function removeAllFromPlaylist() {
    // Clear playlistData array
    playlistData = [];

    // Update view 
    updatePlaylistView();
    console.log("All songs removed from the playlist.");
}