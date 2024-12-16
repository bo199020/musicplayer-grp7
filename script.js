const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const volumeControl = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const currentTrackLabel = document.getElementById("current-track");

let tracks = Array.from(playlist.getElementsByTagName("li"));
let currentTrackIndex = 0;

// Function to load and play a track
function loadTrack(index) {
  const track = tracks[index];
  const src = track.getAttribute("data-src");

  if (src) {
    audio.src = src;
    currentTrackLabel.textContent = track.textContent;

    tracks.forEach((t) => t.classList.remove("active"));
    track.classList.add("active");

    audio
      .play()
      .catch((error) => console.error("Playback failed:", error));
  } else {
    console.error("Audio source not found.");
  }
}

// Play button
playButton.addEventListener("click", () => {
  if (!audio.src) {
    loadTrack(currentTrackIndex);
  } else {
    audio.play().catch((e) => console.error("Playback error:", e));
  }
});

// Pause button
pauseButton.addEventListener("click", () => {
  audio.pause();
});

// Previous button
prevButton.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
});

// Next button
nextButton.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
});

// Volume control
volumeControl.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Playlist selection
tracks.forEach((track, index) => {
  track.addEventListener("click", () => {
    currentTrackIndex = index;
    loadTrack(currentTrackIndex);
  });
});

// Set initial volume and load the first track
document.addEventListener("DOMContentLoaded", () => {
  audio.volume = 0.5; // Default volume
  if (tracks.length > 0) {
    loadTrack(currentTrackIndex);
  }
});
audio.addEventListener("error", () => {
    console.error("Error loading the audio file:", audio.src);
    alert("Error loading the audio file. Please check if the file exists.");
});