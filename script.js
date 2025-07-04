const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "inspiration" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "life" },
  { text: "Your time is limited, so don't waste it living someone else's life.", category: "motivation" }
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const categorySelect = document.getElementById('categorySelect');

function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = '<option value="all">All</option>';
  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat[0].toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });
}

function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - (${quote.category})`;
}

function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim().toLowerCase();

  if (!newText || !newCategory) {
    alert("Both quote and category are required.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });

  populateCategories(); // Refresh the dropdown with new category if needed
  textInput.value = '';
  categoryInput.value = '';
  alert("Quote added successfully!");
}

newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);

// Initial population of categories on load
populateCategories();
