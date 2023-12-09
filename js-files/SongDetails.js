// Get the element by its id
// var singleSongView = document.getElementById("single-song-view");

// Set the display property to "none" to hide the element
//singleSongView.style.display = "none";

function rowClicked(song, songsToDisplay) {
    // Extract the song_id
    const id = song.song_id;
    console.dir("song id=" + id);

    // Get the song object from the id
    const selectedSong = songsToDisplay.find((s) => s.song_id == id);
    console.log(selectedSong);

        updateSongInfo(selectedSong);
        radarChart(selectedSong.analytics);
}

    function updateSongInfo(selectedSong) {
    // Display the song details
    const songInfoLine = document.querySelector("#song-info-line");
    songInfoLine.textContent =`${selectedSong.title}, ${selectedSong.artist.name}, ${selectedSong.genre.name}, ${selectedSong.year}, ${selectedSong.details.duration}`;

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