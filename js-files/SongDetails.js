// Get single song element id
var singleSongView = document.getElementById("single-song-view");

const closeViewButton = document.createElement("button");

// Hide view using id
singleSongView.style.display = "none";

// Event listening for hiding playlist button
var playlistButton = document.getElementById("playlist-button");
playlistButton.addEventListener("click", singleSongView);

// Function to create the "Close View" button
function createCloseViewButton() {
    
    closeViewButton.id = "close-view-button";
    closeViewButton.textContent = "Close View";

    // Event listener for the "Close View" button
    closeViewButton.addEventListener("click", function () {
        // Hide the single-song-view
        singleSongView.style.display = "none";

        // Show search-songs-view
        document.getElementById("search-songs-view").style.display = "block";

        // Remove "Close View" button from header
        var closeButtonContainer = document.getElementById("close-view-button-container");
        closeButtonContainer.innerHTML = "";

        // Show "Playlist" button in the header
        playlistButton.style.display = "block";
    });

    // Append "Close View" button to the header
    var closeButtonContainer = document.getElementById("close-view-button-container");
    closeButtonContainer.appendChild(closeViewButton);
}

// Function for when song row is clicked
function rowClicked(song, songsToDisplay) {
    // Extract song_id
    const id = song.song_id;
    console.dir("song id=" + id);

    // Get the song object from the id
    const selectedSong = songsToDisplay.find((s) => s.song_id == id);
    console.log(selectedSong);

    // Hide the playlist view
    hidePlaylistView();

    // Update song info and show the single-song-view
    updateSongInfo(selectedSong);
    radarChart(selectedSong.analytics);

    // Hide only the search-songs-view and show the single-song-view
    document.getElementById("search-songs-view").style.display = "none";
    singleSongView.style.display = "block";

    // Show the "Close View" button dynamically in the header
    createCloseViewButton();

    // Hide the "Playlist" button in the header
    playlistButton.style.display = "none";
}

// Function to hide the playlist view below song info
function hidePlaylistView() {
    searchSongsView.style.display = "block";
    playlistView.style.display = "none";
    playlistButton.textContent = "Playlist";
}

function updateSongInfo(selectedSong) {
    // Display the song details
    const songInfoLine = document.querySelector("#song-info-line");

    const songTimeConvert = selectedSong.details.duration;

    const durationMin = Math.floor(songTimeConvert / 60);
    const durationSec = songTimeConvert % 60;
    const displayTime = durationMin + ':' + durationSec.toString().padStart(2, '0');

    // Text Content in the SongInfo line
    songInfoLine.textContent = `${selectedSong.title}, ${selectedSong.artist.name}, ${selectedSong.genre.name}, ${selectedSong.year}, ${displayTime}`;

    // Display analysis data
    document.querySelector("#bpm").textContent = "BPM: " + selectedSong.details.bpm;
    document.querySelector("#energy").textContent = "Energy: " + selectedSong.analytics.energy;
    document.querySelector("#danceability").textContent = "Danceability: " + selectedSong.analytics.danceability;
    document.querySelector("#liveness").textContent = "Liveness: " + selectedSong.analytics.liveness;
    document.querySelector("#valence").textContent = "Valence: " + selectedSong.analytics.valence;
    document.querySelector("#acousticness").textContent = "Acousticness: " + selectedSong.analytics.acousticness;
    document.querySelector("#speechiness").textContent = "Speechiness: " + selectedSong.analytics.speechiness;
    document.querySelector("#popularity").textContent = "Popularity: " + selectedSong.details.popularity;
}

function radarChart(analytics) {
    const ctx = document.getElementById('radarChart').getContext('2d');

    // Check if chart exists
    const existingChart = Chart.getChart(ctx);

    // If chart exists, destroy it
    if (existingChart) {
        existingChart.destroy();
    }

    // Radar chart data
    const data = {
        labels: ['BPM', 'Energy', 'Danceability', 'Liveness', 'Valence', 'Acousticness', 'Speechiness'],
        datasets: [{
            label: 'Song Analytics',
            backgroundColor: 'gray',
            borderColor: 'blue',
            data: [
                analytics.bpm,
                analytics.energy,
                analytics.danceability,
                analytics.liveness,
                analytics.valence,
                analytics.acousticness,
                analytics.speechiness
            ]
        }]
    };

    // Chart options
    const options = {
        scale: {
            ticks: { beginAtZero: true },
            pointLabels: { fontSize: 14 }
        }
    };

    // Radar chart
    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
}


