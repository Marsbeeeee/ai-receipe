// get DOM element
const chatContainer = document.getElementById("chat-container");
const dialogInput = document.getElementById("dialog-input");
const dialogButton = document.getElementById("dialog-button");

// user message
function createRightBubble(text) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble-right");
  bubble.textContent = text;
  chatContainer.appendChild(bubble);
}

// AI message
function createLeftText(text) {
  const message = document.createElement("p");
  message.classList.add("ai-text");
  message.textContent = text;
  chatContainer.appendChild(message);
}

// send to backend and receive message
async function sendToAI(userMessage) {
  try {
    const response = await fetch("/api/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessage }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.aiReply;
  } catch (err) {
    console.error(err);
    return "AI服务暂时不可用...";
  }
}

// after click send
dialogButton.addEventListener("click", async () => {
  const message = dialogInput.value.trim();
  if (!message) return;

  // show user message
  createRightBubble(message);
  dialogInput.value = "";

  // reply message to ai
  const aiReply = await sendToAI(message);
  createLeftText(aiReply);
});
