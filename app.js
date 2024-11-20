

const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
document.getElementById("footerText").innerHTML = `Copyright &copy;${new Date().getFullYear()} &nbsp; Nidhi Chaukiyal`;

function toggleDarkMode() {
  if (darkModeToggle.checked) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}

darkModeToggle.addEventListener("change", toggleDarkMode);

function setInitialDarkMode() {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDarkMode) {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }
}
setInitialDarkMode();

// News API Configuration
const API_KEY = "5e79be94af9249a28ccf1154ea7250a7"; // Replace with a valid API key
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=technology&from=${getSevenDaysAgo()}&sortBy=publishedAt&apiKey=${API_KEY}`;

window.addEventListener('load', ()=> fetch("India"));

async function fetchNews() {
    try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = "<p>Unable to fetch news at the moment. Please try again later.</p>";
    }
}

// Get date for 7 days ago in YYYY-MM-DD format
function getSevenDaysAgo() {
  const today = new Date();
  today.setDate(today.getDate() - 7);
  return today.toISOString().split('T')[0];  // Returns 'YYYY-MM-DD'
}

// Display News
function displayNews(articles) {
  let newsHTML = "";

  articles.forEach((article) => {
    // Filter out articles with invalid content or removed links
    if (!article.title || !article.urlToImage || !article.url) {
      return; // Skip this article if it's missing key information
    }

    newsHTML += `
      <div class="newsCard">
        <div class="imageWrapper">
          <img src="${article.urlToImage || 'placeholder.jpg'}" class="thumbnail" alt="Image">
        </div>
        <div class="card-body">
          <div class="card-date">${new Date(article.publishedAt).toDateString()}</div>
          <h5 class="card-title">${article.title}</h5>
          <h5 class="card-author">Author: ${article.author || "Unknown"}</h5>
          <p class="card-text">${article.description || "No description available."}</p>
          <a target="_blank" href="${article.url}" class="btn btn-primary">Read more..</a>
        </div>
      </div>
    `;
  });

  spinner.style.visibility = "hidden";
  newsBox.style.visibility = "visible";
  newsBox.innerHTML = newsHTML;
}

fetchNews();


// Toggle Chatbot Visibility
function toggleChatbot() {
  const chatbotContainer = document.getElementById("chatbot-container");
  if (chatbotContainer.style.display === "none" || !chatbotContainer.style.display) {
      chatbotContainer.style.display = "flex";
      document.getElementById("chatbot-user-input").focus();
  } else {
      chatbotContainer.style.display = "none";
  }
}

// Close Chatbot (triggered by close button)
document.getElementById("close-chatbot").addEventListener("click", () => {
  const chatbotContainer = document.getElementById("chatbot-container");
  chatbotContainer.style.display = "none"; // Close the chatbot
});

// Send User Message
function sendMessage() {
  const inputField = document.getElementById("chatbot-user-input");
  const userMessage = inputField.value.trim();

  if (userMessage) {
      appendMessage("user", userMessage); // Append user message to chat
      inputField.value = ""; // Clear input field
      getBotResponse(userMessage); // Generate bot response
  }
}

// Append Message to Chat
function appendMessage(sender, message) {
  const messagesDiv = document.getElementById("chatbot-messages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  messageDiv.textContent = message;

  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to bottom
}

// Generate Bot Response
function getBotResponse(userMessage) {
  setTimeout(() => {
      const botReply = `You said: "${userMessage}". How can I assist you further?`;
      appendMessage("bot", botReply);
  }, 1000);
}

// Ensure the chatbot starts hidden
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("chatbot-container").style.display = "none";
});



// Modal for News
const modal = document.getElementById("newsModal");
const closeModal = document.getElementById("closeModal");

window.onload = function () {
  modal.style.display = "block";
  fetchNews();
};

closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
  const query = searchText.value;
  if(!query) return;
  fetchNews(query);

})



