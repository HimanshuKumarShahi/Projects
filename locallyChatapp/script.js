async function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const userMessage = input.value;
  if (!userMessage) return;

  // Show user message
  chat.innerHTML += `<p><b>You:</b> ${userMessage}</p>`;
  input.value = "";

  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gemma3:270M-F16",
        prompt: userMessage,
        stream: false
      })
    });

    const data = await res.json();

    // Show AI response
    chat.innerHTML += `<p><b>AI:</b> ${data.response}</p>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    chat.innerHTML += `<p style="color:red;">Error connecting to AI</p>`;
  }
}