let trackCover = document.querySelector(".track-details__tag--track-cover");
let trackName = document.querySelector(".track-details__tag--track-name");
let artistName = document.querySelector(".track-details__tag--artist-name");

let durationSlider = document.querySelector(".slider--duration");
let volumeSlider = document.querySelector(".slider--volume");
let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");

let randomTrackBtn = document.querySelector(".buttons__button--random-track");
let prevTrackBtn = document.querySelector(".buttons__button--prev-track");
let playPauseBtn = document.querySelector(".buttons__button--play-pause");
let nextTrackBtn = document.querySelector(".buttons__button--next-track");
let repeatTrackBtn = document.querySelector(".buttons__button--repeat-track");

const time = "00:00";

currentTime.textContent = time;
totalDuration.textContent = time;

durationSlider.addEventListener("change", goTo);
volumeSlider.addEventListener("change", setVolume);
playPauseBtn.addEventListener("click", playPauseTrack);
randomTrackBtn.addEventListener("click", randomTrack);
prevTrackBtn.addEventListener("click", prevTrack);
nextTrackBtn.addEventListener("click", nextTrack);
repeatTrackBtn.addEventListener("click", repeatTrack);

const trackList = [
  {
    name: "Levitating",
    artist: "Dua Lipa ft DaBaby",
    source: "../source/mp3/Dua Lipa feat. DaBaby - Levitating.mp3",
    cover: "../source/cover/Levitating.png",
  },

  {
    name: "Beggin",
    artist: "Madcon",
    source: "../source/mp3/Madcon - Beggin.mp3",
    cover: "../source/cover/Beggin.jpeg",
  },
  {
    name: "Say So",
    artist: "Doja Cat ft Nicky Minaj ",
    source: "../source/mp3/Doja Cat feat. Nicki Minaj - Say So.mp3",
    cover: "../source/cover/Say_So.png",
  },
  {
    name: "Talk Dirty",
    artist: "Jason Derulo",
    source: "../source/mp3/Jason Derulo feat. 2 Chainz - Talk Dirty.mp3",
    cover: "../source/cover/Talk_Dirty.png",
  },
  {
    name: "Mi Gente",
    artist: "J Balvin ft Willy William",
    source:
      "../source/mp3/J Balvin & Willy William feat. Beyonce - Mi Gente.mp3",
    cover: "../source/cover/Mi_Gente.jpeg",
  },
  {
    name: "Sugar",
    artist: "Maroon 5",
    source: "../source/mp3/Maroon 5 - Sugar.mp3",
    cover: "../source/cover/Sugar.png",
  },
];

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let isOnRepeat = false;
let updateTimer;

let currentTrack = document.createElement("audio");

currentTrack.volume = 0.5;

loadTrack(trackIndex);

function loadTrack(trackIndex) {
  clearInterval(updateTimer);
  reset();

  currentTrack.src = trackList[trackIndex].source;
  currentTrack.load();

  trackCover.src = trackList[trackIndex].cover;
  trackName.textContent = trackList[trackIndex].name;
  artistName.textContent = trackList[trackIndex].artist;

  updateTimer = setInterval(setUpdate, 500);

  currentTrack.addEventListener("ended", nextTrackIfEnded);
}

function reset() {
  currentTime.textContent = time;
  totalDuration.textContent = time;
  durationSlider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomTrackBtn.classList.add("fa-shuffle--active");
}

function pauseRandom() {
  isRandom = false;
  randomTrackBtn.classList.remove("fa-shuffle--active");
}

function repeatTrack() {
  isOnRepeat ? pauseRepeat() : playRepeat();
}

function playRepeat() {
  isOnRepeat = true;
  repeatTrackBtn.classList.add("fa-repeat--active");
}

function pauseRepeat() {
  isOnRepeat = false;
  repeatTrackBtn.classList.remove("fa-repeat--active");
}

function playPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function nextTrack() {
  if (trackIndex < trackList.length - 1 && !isRandom) {
    trackIndex += 1;
  } else if (trackIndex < trackList.length - 1 && isRandom) {
    let randomIndex = Number.parseInt(Math.random() * trackList.length);
    trackIndex = randomIndex;
  } else {
    trackIndex = 0;
  }

  loadTrack(trackIndex);
  playTrack();
}

function nextTrackIfEnded() {
  if (trackIndex < trackList.length - 1) {
    if (!isRandom && !isOnRepeat) {
      trackIndex += 1;
    } else if (isRandom && !isOnRepeat) {
      let randomIndex = Number.parseInt(Math.random() * trackList.length);
      trackIndex = randomIndex;
    } else if (!isRandom && isOnRepeat) {
      trackIndex;
    } else if (isRandom && isOnRepeat) {
      trackIndex;
    }
  } else {
    trackIndex = 0;
  }

  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  if (trackIndex > 0) {
    trackIndex -= 1;
  } else {
    trackIndex = trackList.length - 1;
  }
  loadTrack(trackIndex);
  playTrack();
}

function goTo() {
  let seekTo = currentTrack.duration * (durationSlider.value / 100);
  currentTrack.currentTime = seekTo;
}

function setVolume() {
  currentTrack.volume = volumeSlider.value / 100;
}

function setUpdate() {
  let seekDurationPosition = 0;
  if (!isNaN(currentTrack.duration)) {
    seekDurationPosition =
      currentTrack.currentTime * (100 / currentTrack.duration);
    durationSlider.value = seekDurationPosition;

    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(
      currentTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(
      currentTrack.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currentTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
