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

    // Display the song details in the left section on the same line separated by commas
    const songInfoLine = document.querySelector("#song-info-line");
    songInfoLine.textContent =
        `${selectedSong.title}, ${selectedSong.artist.name}, ${selectedSong.genre.name}, ${selectedSong.year}, ${selectedSong.details.duration}`;

        updateSongInfo(selectedSong);

}

    function updateSongInfo(selectedSong) {
        // Display analysis data in the unordered list
        document.querySelector("#bpm").textContent = "BPM: " + selectedSong.details.bpm;
        document.querySelector("#energy").textContent = "Energy: " + selectedSong.analytics.energy;
        document.querySelector("#danceability").textContent = "Danceability: " + selectedSong.analytics.danceability;
        document.querySelector("#liveness").textContent = "Liveness: " + selectedSong.analytics.liveness;
        document.querySelector("#valence").textContent = "Valence: " + selectedSong.analytics.valence;
        document.querySelector("#acousticness").textContent = "Acousticness: " + selectedSong.analytics.acousticness;
        document.querySelector("#speechiness").textContent = "Speechiness: " + selectedSong.analytics.speechiness;
        document.querySelector("#popularity").textContent = "Popularity: " + selectedSong.details.popularity;
    }

