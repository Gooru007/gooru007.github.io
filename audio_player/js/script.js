"use strict";
//
const musicList = [
  {
    name: "Depeche Mode Enjoy The Silence",
    src: "music/Depeche-Mode-Enjoy-The-Silence_USnDpMf.mp3",
  },
  {
    name: "Depeche Mode Never Let Me Down Again",
    src: "music/Depeche-Mode-Never-Let-Me-Down-Again.mp3",
  },
  {
    name: "Depeche Mode Personal Jesus",
    src: "music/depeche-mode-personal-jesus_F9MKd9k.mp3",
  },
  {
    name: "HIM Bury Me Deep Inside Your Heart",
    src: "music/HIM__Bury_Me_Deep_Inside_Your_Heart.mp3",
  },
  {
    name: "Papa Roach Between Angels And Insects",
    src: "music/Papa_Roach-Between_Angels_And_Insects.mp3",
  },
  {
    name: "Placebo Chemtrails",
    src: "music/Placebo_-_Chemtrails.mp3",
  },
  {
    name: "Sneaker Pimps Bloodsport",
    src: "music/Sneaker_Pimps_Bloodsport.mp3",
  },
  {
    name: "Stereophonics Have A Nice Day",
    src: "music/Stereophonics__Have_A_Nice_Day.mp3",
  },
  {
    name: "HIM Poison Girl",
    src: "music/HIM__Poison_Girl.mp3",
  },
  {
    name: "Empathy Test Losing Touch",
    src: "music/Empathy-Test_-_Losing-Touch.mp3",
  },
  {
    name: "Placebo Try Better Next Time",
    src: "music/Placebo_-_Try_Better_Next_Time.mp3",
  },
  {
    name: "Stereophonics Dakota",
    src: "music/Stereophonics_-_Dakota.mp3",
  },
];

// DOM Elements 1
const currentTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");
const trackName = document.querySelector(".track-name");

const playPauseBtn = document.querySelector(".track-play-pause");
const prevBtn = document.querySelector(".track-prev");
const nextBtn = document.querySelector(".track-next");
const randomBtn = document.querySelector(".track-random");
const repeatBtn = document.querySelector(".track-repeat");

const trackProgress = document.querySelector(".track-progress");
const trackVolume = document.querySelector(".track-volume");

const trackList = document.querySelector(".track-list");
const currentTrack = document.createElement("audio");

// Variables
let isPlaying = false;
let trackIndex = 0;
let isRandom = false;
let intervalId;
let isRepeat = false;

// Functions calls
renderAllTracks(musicList);
loadTrack(trackIndex);

// DOM Elements 2
const trackItems = document.querySelectorAll(".track-item");

// Events
playPauseBtn.addEventListener("click", playPauseTrack);
trackList.addEventListener("click", trackChoice);
trackVolume.addEventListener("change", setVolume);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
randomBtn.addEventListener("click", randomTrack);
trackProgress.addEventListener("change", rewindTrack);
repeatBtn.addEventListener("click", repeatTrack);
currentTrack.addEventListener("ended", nextTrack);

// Functions

function repeatTrack() {
  isRepeat ? stopRepeat() : playRepeat(); //////////////////////
}

function playRepeat() {
  repeatBtn.classList.add("active"); //////////////////////////
  isRepeat = true;
}

function stopRepeat() {
  repeatBtn.classList.remove("active"); ////////////////////////////
  isRepeat = false;
}

function setUpdate() {
  let durationMinutes = Math.floor(currentTrack.duration / 60);
  let durationSeconds = Math.floor(currentTrack.duration % 60);
  let currentMinutes = Math.floor(currentTrack.currentTime / 60);
  let currentSeconds = Math.floor(currentTrack.currentTime % 60);
  trackProgress.value =
    (currentTrack.currentTime * 100) / currentTrack.duration;

  if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;
  if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
  if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
  if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;

  totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
  currentTime.textContent = `${currentMinutes}:${currentSeconds}`;
}

function rewindTrack() {
  currentTrack.currentTime =
    (currentTrack.duration / 100) * trackProgress.value;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  randomBtn.classList.add("active");
  isRandom = true;
}

function pauseRandom() {
  randomBtn.classList.remove("active");
  isRandom = false;
}

function prevTrack() {
  if (trackIndex === 0) {
    trackIndex = musicList.length - 1;
  } else {
    trackIndex--;
  }

  loadTrack(trackIndex);
  playTrack();
  toggleActiveClass();
}

function nextTrack() {
  if (isRepeat) {
    trackIndex = trackIndex; ///////////////
  } else {
    ////////////////////////////
    if (trackIndex < musicList.length - 1 && isRandom === false) {
      trackIndex++;
    } else if (trackIndex < musicList.length - 1 && isRandom === true) {
      trackIndex = Math.floor(Math.random() * musicList.length);
    } else {
      trackIndex = 0;
    }
  }

  loadTrack(trackIndex);
  playTrack();
  toggleActiveClass();
}

function toggleActiveClass() {
  trackItems.forEach((track) => track.classList.remove("active"));
  trackItems[trackIndex].classList.add("active");
}

function setVolume() {
  currentTrack.volume = trackVolume.value / 100;
}

function trackChoice(e) {
  if (e.target.classList.contains("track-item")) {
    for (let track of musicList) {
      if (track.name === e.target.textContent) {
        trackIndex = musicList.indexOf(track);
        currentTrack.src = track.src;
        trackName.textContent = e.target.textContent;
      }
    }
    playTrack();
    toggleActiveClass();
  }
}

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  playPauseBtn.classList.remove("icon-play");
  playPauseBtn.classList.add("icon-pause");
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  playPauseBtn.classList.remove("icon-pause");
  playPauseBtn.classList.add("icon-play");
}

function playPauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
  toggleActiveClass();
}

function loadTrack(trackIndex) {
  clearInterval(intervalId);
  currentTrack.src = musicList[trackIndex].src;
  trackName.textContent = musicList[trackIndex].name;
  intervalId = setInterval(setUpdate, 1000);
}

function renderAllTracks(arr) {
  const allTracksLayout = arr.reduce(
    (acc, track) => (acc += `<li class="track-item">${track.name}</li>`),
    ""
  );
  trackList.insertAdjacentHTML("afterbegin", allTracksLayout);
}
