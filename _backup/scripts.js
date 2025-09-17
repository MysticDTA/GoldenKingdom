// Handle knowledge submission
async function submitKnowledge(event) {
  event.preventDefault();

  const title = document.getElementById("knowledge-title").value;
  const content = document.getElementById("knowledge-content").value;

  const response = await fetch("/api/submit-knowledge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  const result = await response.json();
  alert(result.message || "Submission complete!");
}

// Fetch all approved knowledge
async function loadKnowledge() {
  const response = await fetch("/api/get-submissions");
  const knowledge = await response.json();

  const container = document.getElementById("knowledge-container");
  container.innerHTML = "";

  knowledge.forEach((item) => {
    const div = document.createElement("div");
    div.className = "knowledge-card";
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.content}</p>
    `;
    container.appendChild(div);
  });
}

// Fetch all submissions (admin only)
async function loadAllSubmissions() {
  const response = await fetch("/api/get-all-submissions");
  const submissions = await response.json();

  const container = document.getElementById("submissions-container");
  container.innerHTML = "";

  submissions.forEach((item) => {
    const div = document.createElement("div");
    div.className = "submission-card";
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.content}</p>
      <button onclick="approveKnowledge('${item.id}')">Approve</button>
    `;
    container.appendChild(div);
  });
}

// Approve a submission
async function approveKnowledge(id) {
  const response = await fetch("/api/approve-knowledge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const result = await response.json();
  alert(result.message || "Approved!");
  loadAllSubmissions();
}

// Run auto-load on library page
if (document.getElementById("knowledge-container")) {
  loadKnowledge();
}
