document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audioPlayer");
    const playlist = document.getElementById("playlist");

    // Deezer API key
    const deezerApiKey = "YOUR_DEEZER_API_KEY";

    // Fetch tracks from Deezer API
    fetch("https://api.deezer.com/chart")
        .then(response => response.json())
        .then(data => {
            const tracks = data.tracks.data;
            tracks.forEach(track => {
                const listItem = document.createElement("li");
                listItem.textContent = track.title;
                listItem.addEventListener("click", function () {
                    playSong(track.preview);
                });
                playlist.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching tracks:", error));

    function playSong(source) {
        audioPlayer.src = source;
        audioPlayer.play();
    }
});
