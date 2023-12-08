// Get the element by its id
// var singleSongView = document.getElementById("single-song-view");

// Set the display property to "none" to hide the element
//singleSongView.style.display = "none";

function rowClicked(song, songsToDisplay) {
    //extract the song_id
    const id = song.song_id;
    console.dir("song id=" + id);

        // get the song object from the id
        const selectedSong = songsToDisplay.find(s => s.song_id == id);
        console.log(selectedSong);

        // display the song details
        document.querySelector("#title").textContent = selectedSong.title;
        document.querySelector("#energy").textContent = selectedSong.analytics.energy;
        document.querySelector("#danceablitiy").textContent = selectedSong.analytics.danceability;
        document.querySelector("#liveness").textContent = selectedSong.analytics.liveness;
}