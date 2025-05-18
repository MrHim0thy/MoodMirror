const clientId = 'bc333e004c0e4deb84778c5857822b20';
const redirectUri = 'https://MrHim0thy.github.io/MoodMirror'; // Replace with your GitHub Pages URL
const scopes = 'playlist-modify-public user-top-read';

document.getElementById("login-button").addEventListener("click", () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  window.location.href = authUrl;
});

window.onload = () => {
  const token = getTokenFromUrl();
  if (token) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("mood-section").style.display = "block";
    localStorage.setItem("spotify_token", token);
    loadMoodHistory();
  }
};

function getTokenFromUrl() {
  const hash = window.location.hash;
  if (hash.includes("access_token")) {
    return new URLSearchParams(hash.substring(1)).get("access_token");
  }
  return null;
}

function submitMood() {
  const mood = document.getElementById("mood-select").value;
  const date = new Date().toISOString().split("T")[0];

  const moodEntry = { date, mood };
  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  history.push(moodEntry);
  localStorage.setItem("moodHistory", JSON.stringify(history));
  loadMoodHistory();

  alert(`🎶 Generating a ${mood} playlist... (Coming soon!)`);
}

function loadMoodHistory() {
  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  const historyList = document.getElementById("mood-history");
  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.date}: ${entry.mood}`;
    historyList.appendChild(li);
  });
}
