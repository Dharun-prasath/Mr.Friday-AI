const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const output = document.getElementById("output");
const micBtn = document.getElementById("micBtn");

// 🔊 Speak out response
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN';       // Change to 'en-US' if needed
  utterance.pitch = 1;
  utterance.rate = 0.95;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
}

// 🧠 Mr. Friday responds to typed or spoken prompt
async function handlePrompt(prompt) {
  if (!prompt) return;

  output.innerHTML = "🧠 Mr. Friday is thinking...";

  try {
    const res = await fetch("http://localhost:5050/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();
    const response = data.response;

    output.innerHTML = `<strong>Mr. Friday:</strong><br>${response}`;
    speak(response); // 🔊 Speak the response
    input.value = ""; // Clear input
  } catch (err) {
    console.error("Error talking to Mr. Friday:", err);
    output.innerHTML = `<span style="color: red;">⚠️ Mr. Friday couldn't respond. Check if backend is running.</span>`;
  }
}

// 🔘 Send button click
sendBtn.addEventListener("click", () => {
  const prompt = input.value.trim();
  handlePrompt(prompt);
});

// 🎙️ Voice Input using Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-IN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

micBtn.addEventListener("click", () => {
  try {
    recognition.start();
    micBtn.innerText = "🎙️ Listening...";
  } catch (e) {
    console.error("Mic start error:", e);
    output.innerHTML = `<span style="color: red;">🎤 Mic couldn't start: ${e.message}</span>`;
  }
});

recognition.onstart = () => {
  console.log("🎤 Mic listening started...");
};

recognition.onresult = (event) => {
  const voicePrompt = event.results[0][0].transcript;
  console.log("🎙️ Heard:", voicePrompt);
  input.value = voicePrompt;
  micBtn.innerText = "🎤";
  handlePrompt(voicePrompt);
};

recognition.onerror = (event) => {
  console.error("🎤 Mic error:", event.error);
  output.innerHTML = `<span style="color: red;">🎤 Mic error: ${event.error}</span>`;
  micBtn.innerText = "🎤";
};

recognition.onend = () => {
  console.log("🎤 Mic listening ended.");
  micBtn.innerText = "🎤";
};
