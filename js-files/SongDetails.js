// Get the element by its id
var singleSongView = document.getElementById("single-song-view");

// Set the display property to "none" to hide the element initially
singleSongView.style.display = "none";

// DOM for playlist button
document.getElementById("playlist-button").addEventListener("click", closeSingleSongView);

// Dom for close view button
document.getElementById("close-view-button").addEventListener("click", closeSingleSongView);

function rowClicked(song, songsToDisplay) {
    // Extract the song_id
    const id = song.song_id;
    console.dir("song id=" + id);

    // Get the song object from the id
    const selectedSong = songsToDisplay.find((s) => s.song_id == id);
    console.log(selectedSong);

    // Update song info and show the single-song-view
    updateSongInfo(selectedSong);
    radarChart(selectedSong.analytics);

    // Hide only the search-songs-view and show the single-song-view
    document.getElementById("search-songs-view").style.display = "none";
    document.getElementById("single-song-view").style.display = "block";

    // Hide the "Playlist" button and show the "Close View" button in the header
    document.getElementById("playlist-button").style.display = "none";
    document.getElementById("close-view-button").style.display = "block";
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



