
$(document).ready(function(){
    $('body').css('overflow', 'auto');
    $('.loading-screen').fadeOut(1000);
});

let loader = document.querySelector('.loading-screen');
let body = document.querySelector('body');

async function getAllMeals() {
    try {
        loader.style.display = 'flex';  
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
        let data = await response.json();
        loader.style.display = 'none';  

        return data.meals || [];
    } catch (error) {
        console.error('Error fetching meals:', error);
        return [];
    }
}

function getRandomMeals(meals, count) {
    let selectedMeals = [];
    let mealIndices = new Set();
    
    while (mealIndices.size < count && mealIndices.size < meals.length) {
        let randomIndex = Math.floor(Math.random() * meals.length);
        if (!mealIndices.has(randomIndex)) {
            mealIndices.add(randomIndex);
            selectedMeals.push(meals[randomIndex]);
        }
    }
    
    return selectedMeals;
}

function displayMealDetails(meal) {
    loader.style.display = 'flex';  
    $('.loading-screen').fadeOut(1000)
    let ingredients = '';

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",") || [];
    let tagsStr = '';
    for (let tag of tags) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tag}</li>`;
    }

    let cartona = `
    <div class="col-md-4 text-white">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
        <h3>Recipes:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>
        <h3>Tags:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;

    let row = document.querySelector('.row');
    row.innerHTML = cartona;
}

async function displayData() {
    let allMeals = await getAllMeals();
    if (allMeals && allMeals.length > 0) {
        let meals = getRandomMeals(allMeals, 20);
        let mealsContainer = document.querySelector('.row');
        mealsContainer.innerHTML = '';

        meals.forEach(meal => {
            let colDiv = document.createElement('div');
            colDiv.classList.add('col-md-3', 'mb-4', 'px-2');

            let itemDiv = document.createElement('div');
            itemDiv.classList.add('item', 'position-relative', 'rounded-3', 'overflow-hidden');
            
            let mealImage = document.createElement('img');
            mealImage.setAttribute('src', meal.strMealThumb);
            mealImage.setAttribute('alt', meal.strMeal);
            mealImage.classList.add('w-100', 'rounded-4');

            let mealName = document.createElement('div');
            mealName.textContent = meal.strMeal;
            mealName.classList.add('text-center', 'main-item', 'fs-4', 'fw-medium', 'rounded-4', 'overlay');
            
            itemDiv.appendChild(mealImage);
            itemDiv.appendChild(mealName);
            colDiv.appendChild(itemDiv);
            mealsContainer.appendChild(colDiv);

            itemDiv.addEventListener('click', () => displayMealDetails(meal));
        });
    } else {
        console.log('No meals found');
    }
    loader.style.display = 'none';  
}

document.addEventListener('DOMContentLoaded', displayData);
