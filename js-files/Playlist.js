// Get playlist button element by id
var playlistButton = document.getElementById("playlist-button");

// Get search/browse section element by id
var searchSongsView = document.getElementById("search-songs-view");

// Get playlist view element by its id
var playlistView = document.getElementById("playlist-view");

//Make playlist view hidden initially
playlistView.style.display = "none";

// Add event listener to playlist button
playlistButton.addEventListener("click", function () {
    
    // Toggle visibility of searchSongsView and playlistView
    if (searchSongsView.style.display !== "none") {
        searchSongsView.style.display = "none";
        playlistView.style.display = "block";
        
        // Change button text to "Close View"
        playlistButton.textContent = "Close Playlist";
    } else {
        searchSongsView.style.display = "block";
        playlistView.style.display = "none";
        
        // Change button text to "Playlist"
        playlistButton.textContent = "Playlist";
    }
});

// Variable for remove all button
var removeAllButton = document.getElementById("remove-all-button");

// Add event listener for remove all button
removeAllButton.addEventListener("click", function () {
    removeAllFromPlaylist();
});

// Define array to store playlist data
let playlistData = [];

// Function to add song to playlist
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
        // Create new rows and cells for each song
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

// Function for clearing playlist button
function removeAllFromPlaylist() {
    
// Clear playlistData array
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
