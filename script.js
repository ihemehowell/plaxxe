document.addEventListener('DOMContentLoaded', function() {
    const playPauseButton = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress');
    const currentTimeDisplay = document.querySelector('.progress-container span:first-child');
    const totalTimeDisplay = document.querySelector('.progress-container span:last-child');

    let isPlaying = false;
    let currentTime = 0;
    const totalTime = 195; // Total time of the song in seconds (3:15)

    playPauseButton.addEventListener('click', togglePlayPause);

    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    function playSong() {
        isPlaying = true;
        playPauseButton.classList.remove('bx-play');
        playPauseButton.classList.add('bx-pause');
        updateProgress();
    }

    function pauseSong() {
        isPlaying = false;
        playPauseButton.classList.remove('bx-pause');
        playPauseButton.classList.add('bx-play');
    }

    function updateProgress() {
        const progressInterval = setInterval(function() {
            if (isPlaying) {
                currentTime++;
                currentTimeDisplay.textContent = formatTime(currentTime);
                progressBar.style.width = `${(currentTime / totalTime) * 100}%`;

                if (currentTime >= totalTime) {
                    clearInterval(progressInterval);
                    currentTime = 0;
                    isPlaying = false;
                    playPauseButton.classList.remove('bx-pause');
                    playPauseButton.classList.add('bx-play');
                    progressBar.style.width = '0%';
                    currentTimeDisplay.textContent = '0:00';
                }
            } else {
                clearInterval(progressInterval);
            }
        }, 1000);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});

// Fetch playlists from Spotify API
fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
        'Authorization': 'Bearer <your_access_token>'
    }
})
.then(response => response.json())
.then(data => {
    // Update playlist list with fetched data
    const playlistList = document.querySelector('.playlist-list');
    data.items.forEach(playlist => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-item');
        playlistItem.innerHTML = `
            <img src="${playlist.images[0].url}" alt="Playlist Cover">
            <div class="playlist-info">
                <h2>${playlist.name}</h2>
                <p>Created by: ${playlist.owner.display_name}</p>
                <p>Total tracks: ${playlist.tracks.total}</p>
            </div>
        `;
        playlistList.appendChild(playlistItem);
    });
})
.catch(error => {
    console.error('Error fetching playlists:', error);
});


function performSearch(query) {
    // Clear previous search results
    document.getElementById('searchResults').innerHTML = '';

    // Perform search action (e.g., make request to Spotify API)
    // Replace this with your actual search logic
    console.log('Performing search for:', query);
    
    // Display search results (for demonstration purposes)
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = `<p>Search results for: <strong>${query}</strong></p>`;
}

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', function() {
    const searchQuery = document.getElementById('searchInput').value.trim();
    if (searchQuery !== '') {
        performSearch(searchQuery);
    }
});

// Event listener for pressing enter in search input field
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    const searchQuery = document.getElementById('searchInput').value.trim();
    if (event.key === 'Enter' && searchQuery !== '') {
        performSearch(searchQuery);
    }
});
