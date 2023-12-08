// Get the element by its id
var playlistView = document.getElementById("playlist-view");

// Set the display property to "none" to hide the element
// playlistView.style.display = "none";

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




