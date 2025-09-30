
import player from "./app/player";
const songs = [
        {
            song_name : "Good luck, Babe!",
            artist_name: "Chappell Roan",
            song_url: "media\Good luck, Babe!.mp3",
            caratula: "media/chapell.jpg"
        },
        {
            song_name : "Manchild",
            artist_name: "Sabrina Carpenter",
            song_url: "./media/song_2.mp3",
            caratula: "https://picsum.photos/200"
        },
        {
            song_name : "cancion CHIDA 3",
            artist_name: "artista 3",
            song_url: "./media/song_3.mp3",
            caratula: "https://picsum.photos/200"
        },
    ];

const last = [];

const playlist = createPlaylist(songs.length);


window.addEventListener('DOMContentLoaded', () => {
    audioController.initializaPlayer(createPlaylist(songs, null));
    console.log(audioController._nextSongs);
    console.log(audioController._actualSong);
    loadSong(audioController._actualSong);
})

function loadSong(i){
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");

    media.src = now.song_url;
    title.innerText = now.song_name;
    artist.innerText = now.artist_name;
    song_img.src = now.caratula;
}

media.addEventListener('loadedmetadata', () => {
    progress_bar.max = 100;
    progress_bar.value = 0;
    if(play_btn.classList.contains("pause")){
        media.play();
    }
});

media.ontimeupdate = function updateProgressBar() {
    const progress_value = (this.currentTime / this.duration) * 100;
    progress_bar.value = progress_value;
}

lastest.addEventListener('click', function(){
    if(!last.length == 0){
        playlist.push(playingNow);
        playingNow = last.pop();
        loadSong(playingNow)
    }
});
forward.addEventListener('click', function(){
    if(!playlist.length == 0){
        last.push(playingNow);
        playingNow = playlist.pop();
        loadSong(playingNow)
    }
});

progress_bar.oninput = function() {
    media.currentTime = (this.value/100) * media.duration;
}

play_btn.addEventListener("click", playPause);

function playPause(){
    if(play_btn.classList.contains("pause")){
        media.pause();
        play_btn.classList.remove("pause");
        play_btn.classList.add("play");
        play_btn.innerText = "Play"
    }else{
        media.play();
        play_btn.classList.remove("play");
        play_btn.classList.add("pause");
        play_btn.innerText = "Pause";
    }
}

