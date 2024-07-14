
let row = document.querySelector('.row');

async function getCategoriesData() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let data = await response.json();
    return data.categories || [];
}

async function displayCategoriesData() {
    let categories = await getCategoriesData();
    let cartona = ``;
    for (let i = 0; i < categories.length; i++) {
        cartona += `
            <div class="col-md-3 text-center mt-4 position-relative item overflow-hidden category-item" data-category="${categories[i].strCategory}">
                <img src="${categories[i].strCategoryThumb}" class="w-100" alt="${categories[i].strCategory}">
                <div class="overlay w-100 text-center fs-6 text-black">${categories[i].strCategory}</div>
            </div>
        `;
    }
    row.innerHTML = cartona;

    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', async function() {
            let category = this.getAttribute('data-category');
            await getCategoryMeals(category);
        });
    });
}

async function getCategoryMeals(category) {
    row.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await response.json();
    displayMeals(data.meals.slice(0, 20));
}

function displayMeals(meals) {
    let cartona = ``;
    for (let i = 0; i < meals.length; i++) {
        cartona += `
            <div class="col-md-3 mb-4 px-2">
                <div class="item position-relative rounded-3 overflow-hidden meal-item" data-meal-id="${meals[i].idMeal}">
                    <img src="${meals[i].strMealThumb}" class="w-100 rounded-4" alt="${meals[i].strMeal}">
                    <div class="text-center main-item fs-4 fw-medium rounded-4 overlay">${meals[i].strMeal}</div>
                </div>
            </div>
        `;
    }
    row.innerHTML = cartona;


    document.querySelectorAll('.meal-item').forEach(item => {
        item.addEventListener('click', async function() {
            let mealID = this.getAttribute('data-meal-id');
            await getMealDetails(mealID);
        });
    });
}

async function getMealDetails(mealID) {
    row.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let data = await response.json();
    displayMealDetails(data.meals[0]);
}

function displayMealDetails(meal) {
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",") || [];
    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    let box = `
    <div class="col-md-4 text-white">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;

    row.innerHTML = box;
}


document.addEventListener('DOMContentLoaded', displayCategoriesData);
