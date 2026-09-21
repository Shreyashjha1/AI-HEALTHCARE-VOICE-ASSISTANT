// --- Voice AI Healthcare Assistant ---
// Speech Recognition + Text-to-Speech + Safety Layer

// 🎤 Speech-to-Text Setup
const startBtn = document.getElementById("start-btn");
const userText = document.getElementById("user-text");
const aiResponse = document.getElementById("ai-response");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

// 🔊 Text-to-Speech Function
function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  utter.lang = "en-US";
  synth.speak(utter);
}

// 🛡️ Safety Layer
function safetyCheck(input) {
  const riskyWords = ["diagnose", "prescribe", "medicine", "drug", "pill", "treatment", "surgery"];
  for (let word of riskyWords) {
    if (input.toLowerCase().includes(word)) {
      return "⚠️ I cannot provide medical diagnosis or prescriptions. Please consult a doctor.";
    }
  }
  return null;
}


// 🧠 AI Agent (basic logic for now)

function getAIResponse(input) {
  // Safety first
  const safetyMessage = safetyCheck(input);
  if (safetyMessage) return safetyMessage;

  // Expanded demo responses
  if (input.toLowerCase().includes("diabetes")) {
    return "For diabetes prevention, focus on a balanced diet, regular exercise, and routine checkups.";
  } else if (input.toLowerCase().includes("water")) {
    return "Drinking clean water is essential. Aim for 2–3 liters daily, unless advised otherwise by a doctor.";
  } else if (input.toLowerCase().includes("exercise")) {
    return "Regular physical activity improves overall health. Even 30 minutes of walking daily can help.";
  } else if (input.toLowerCase().includes("hygiene")) {
    return "Maintaining hygiene like washing hands regularly helps prevent infections.";
  } else if (input.toLowerCase().includes("nutrition")) {
    return "Balanced nutrition with fruits, vegetables, whole grains, and proteins supports good health.";
  } else if (input.toLowerCase().includes("mental health")) {
    return "For mental well-being, practice relaxation, talk to loved ones, and seek professional help if needed.";
  } else if (input.toLowerCase().includes("sleep")) {
    return "Getting 7–8 hours of quality sleep each night is important for overall health.";
  } else {
    return "I can only provide general health guidance. Please consult a medical professional for specific concerns.";
  }
}


// 🎤 Start Button Event
startBtn.addEventListener("click", () => {
  recognition.start();
  userText.textContent = "Listening...";
});

// 🎤 Recognition Result
recognition.addEventListener("result", (event) => {
  const transcript = event.results[0][0].transcript;
  userText.textContent = `You said: "${transcript}"`;

  const response = getAIResponse(transcript);
  aiResponse.textContent = response;
  speak(response);
});

// 🎤 Recognition End
recognition.addEventListener("end", () => {
  userText.textContent += " (done)";
});
