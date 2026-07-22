const age = document.getElementById("age");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const activity = document.getElementById("activity");
const goal = document.getElementById("goal");

const calculateBtn = document.getElementById("calculate");
const clearBtn = document.getElementById("clear");

const resultBox = document.getElementById("resultBox");
const darkModeBtn = document.getElementById("darkBtn");

darkModeBtn.addEventListener("click",() =>{
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeBtn.innerHTML = isDark ? "&#127770; Light Mode" : "&#127772; Dark Mode";
} )

calculateBtn.addEventListener("click", async()=>{
    const ageVal = +age.value;
    const weightVal = +weight.value;
    const heightVal = +height.value;
    const activityVal = +activity.value;
    const goalVal = goal.value;

    const gender = document.querySelector("input[name ='gender']:checked");


  if (!ageVal || !weightVal || !heightVal || !activityVal || !goalVal || !gender) {
    resultBox.style.display = "block";
    resultBox.innerHTML = "<p style='color:red;'>Please fill all fields!</p>";
    return;
  }


  let bmr;
  if(gender.value == "male"){
    bmr = 10* weightVal + 6.25 * heightVal - 5 * ageVal +5;
  }else{
    bmr = 10 * weightVal + 6.25 * heightVal -5 * ageVal - 161;
  }
  
  let tdee = bmr * activityVal;


  if (goalVal === "lose") tdee -= 500;
  if (goalVal === "gain") tdee += 500;

  
  const carbs = (tdee * 0.4) / 4;
  const protein = (tdee * 0.3) / 4;
  const fat = (tdee * 0.3) / 9;

 
  resultBox.style.display = "block";
  resultBox.innerHTML = `
  <h2>Results</h2>
  <p>Calories: ${tdee.toFixed(0)}kcal </p>
  <p>Carbs: ${carbs.toFixed(1)} g </p>
  <p>Protein: ${protein.toFixed(1)} g </p>
  <p>Fat: ${fat.toFixed(1)}g </p>`;
  await fetchRecipe();
});

async function fetchRecipe() {
  const recipeSection = document.getElementById("recipeSection");

  try {
    const response = await fetch("https://dummyjson.com/recipes");

    if (!response.ok) throw new Error("Network error");

    const data = await response.json();

    const recipe = data.recipes[
      Math.floor(Math.random() * data.recipes.length)
    ];

    recipeSection.innerHTML = `
      <h3>🍽 ${recipe.name}</h3>
      <img src="${recipe.image}" width="100%" />
      <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.slice(0,5).join(", ")}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions[0]}</p>
    `;

  } catch (error) {
    recipeSection.innerHTML = "<p style='color:red;'>Failed to load recipe</p>";
    console.error(error);
  }
}

clearBtn.addEventListener("click", () => {
  age.value = "";
  weight.value = "";
  height.value = "";
  activity.value = "";
  goal.value = "";

  document.querySelectorAll("input[name='gender']")
    .forEach(r => r.checked = false);

  resultBox.style.display = "none";
   const recipeSection = document.getElementById("recipeSection");
  recipeSection.innerHTML = "";

});