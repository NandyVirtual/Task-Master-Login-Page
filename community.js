const postBtn = document.getElementById("postBtn");
const postInput = document.getElementById("postInput");
const feed = document.getElementById("feed");

postBtn.addEventListener("click", () => {
  const text = postInput.value.trim();
  if (!text) return;

  // User Post
  const post = document.createElement("div");
  post.className = "post-card";
  post.innerHTML = `
    <div class="post-user">
      <div class="avatar blue">J</div>
      <div>
        <h4>You</h4>
        <span class="time">Just now</span>
      </div>
    </div>
    <p>${text}</p>
  `;
  feed.prepend(post);

  postInput.value = "";

  // 🔥 AI AUTO RESPONSE WHEN QUESTION OR @comsq FOUND
  if (text.toLowerCase().includes("?") || text.toLowerCase().includes("@comsq")) {
    setTimeout(() => addAIResponse(text), 1200);
  }
});

function addAIResponse(userText) {
  const ai = document.createElement("div");
  ai.className = "post-card ai";
  ai.innerHTML = `
    <div class="post-user">
      <div class="avatar ai-avatar">✨</div>
      <div>
        <h4>Comsq AI <span class="ai-badge">AI Assistant</span></h4>
        <span class="time">Just now</span>
      </div>
    </div>
    <p>${generateAIReply(userText)}</p>
  `;
  feed.prepend(ai);
}

function generateAIReply(text) {
  if (text.toLowerCase().includes("task")) {
    return "You can manage your tasks efficiently inside the Tasks section. Let me know if you'd like help creating your first one!";
  }

  if (text.toLowerCase().includes("money") || text.toLowerCase().includes("1m")) {
    return "Big financial goals require consistency and planning. Use TaskMaster daily and stay focused on income-generating tasks.";
  }

  return "Thanks for your question! I'm here to help you stay productive and focused.";
}
