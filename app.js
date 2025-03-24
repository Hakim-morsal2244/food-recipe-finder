const apiKey = '1b9624d497944d67932d930e9c9bb570'; // Your API key

// Function to fetch recipes from Spoonacular
const getRecipes = async (query) => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results) {
      displayRecipes(data.results);
    } else {
      console.log('No recipes found');
    }
  } catch (error) {
    console.log('Error fetching data:', error);
  }
};

// Function to display the recipes on the page
const displayRecipes = (recipes) => {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  recipes.forEach(recipe => {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');
    
    recipeElement.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="https://spoonacular.com/recipeImages/${recipe.image}" alt="${recipe.title}">
      <p>Ready in: ${recipe.readyInMinutes} minutes</p>
      <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a>
    `;
    
    resultsContainer.appendChild(recipeElement);
  });
};

// Search event handler
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  if (query) {
    getRecipes(query);
  } else {
    alert('Please enter a search term');
  }
});