const API_URL = "/api/messages";

async function loadMessages() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const list = document.getElementById("messagesList");
  list.innerHTML = "";

  data.forEach((msg) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${msg.content}
      <button onclick="deleteMessage('${msg.id}')">Törlés</button>
    `;

    list.appendChild(li);
  });
}

async function addMessage() {
  const input = document.getElementById("messageInput");

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: input.value }),
  });

  input.value = "";
  loadMessages();
}

async function deleteMessage(id) {
  await fetch(`${API_URL}?id=${id}`, {
    method: "DELETE",
  });

  loadMessages();
}

loadMessages();
