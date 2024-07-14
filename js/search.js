// let loader = document.querySelector('.loading-screen');


// $(document).ready(function () {
//     $('body').css('overflow', 'auto');
//     $('.loading-screen').fadeOut(1000);
// });
// let searchByName = document.getElementById('searchByName');
// let searchByLetter = document.getElementById('searchByLetter');


// async function getMealsByName(name) {
//     try {
//         let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
//         let data = await response.json();
//         return data.meals || [];
//     } catch (error) {
//         console.error('Error fetching meals by name:', error);
//         return [];
//     }
// }

// async function getMealsByLetter(letter) {
//     try {
//         let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
//         let data = await response.json();
//         return data.meals || [];
//     } catch (error) {
//         console.error('Error fetching meals by letter:', error);
//         return [];
//     }
// }

// function displayProducts(products) {
//     let cartona = ``;
//     for (let i = 0; i < products.length; i++) {
//         cartona += `
//             <div class="col-md-3 text-center mt-4 position-relative item overflow-hidden">
//                 <img src="${products[i].strMealThumb}" class="w-100" alt="${products[i].strCategory}">
//                 <div class="overlay w-100 text-center fs-6 text-black">${products[i].strMeal}</div>
//             </div>
//         `;
//     }
//     document.querySelector('.row').innerHTML = cartona;
// }

// async function searchProductsByName() {
//     loader.style.display = 'flex';  
//     let term = searchByName.value.trim();
//     if (term) {
//         let meals = await getMealsByName(term);
//         displayProducts(meals);
//     }
//     $('.loading-screen').fadeOut(1000);  

// }

// async function searchProductsByLetter() {
//     loader.style.display = 'flex';  
//     let term = searchByLetter.value.trim();
//     if (term) {
//         let meals = await getMealsByLetter(term);
//         displayProducts(meals);
//     }
//     $('.loading-screen').fadeOut(1000);  

// }

// searchByName.addEventListener('input', function () {
//     searchProductsByName();
// });

// searchByLetter.addEventListener('input', function () {
//     searchProductsByLetter();
// });

// async function displayInitialMeals() {
//     loader.style.display = 'flex';  

//     let meals = await getMealsByLetter('a');
//     displayProducts(meals);
//     $('.loading-screen').fadeOut(1000);  

// }

// displayInitialMeals();
// async function getMealDetails(mealID) {
//     closeSideNav()
//     rowData.innerHTML = ""
    
  
   
//     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
//     response = await response.json();
  
//     displayMealDetails(response.meals[0])
   
  
//   }
//   function displayMealDetails(meal) {
      
//     let ingredients = ``
  
//     for (let i = 1; i <= 20; i++) {
//         if (meal[`strIngredient${i}`]) {
//             ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
//         }
//     }
  
//     let tags = meal.strTags?.split(",")
    
//     if (!tags) tags = []
  
//     let tagsStr = ''
//     for (let i = 0; i < tags.length; i++) {
//         tagsStr += `
//         <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
//     }
  
  
  
//     let box = `
//     <div class="col-md-4">
//                 <img class="w-100 rounded-3" src="${meal.strMealThumb}"
//                     alt="">
//                     <h2>${meal.strMeal}</h2>
//             </div>
//             <div class="col-md-8">
//                 <h2>Instructions</h2>
//                 <p>${meal.strInstructions}</p>
//                 <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
//                 <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
//                 <h3>Recipes :</h3>
//                 <ul class="list-unstyled d-flex g-3 flex-wrap">
//                     ${ingredients}
//                 </ul>
  
//                 <h3>Tags :</h3>
//                 <ul class="list-unstyled d-flex g-3 flex-wrap">
//                     ${tagsStr}
//                 </ul>
  
//                 <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
//                 <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
//             </div>`
  
//     rowData.innerHTML = box
//   }
  
let loader = document.querySelector('.loading-screen');
let searchByName = document.getElementById('searchByName');
let searchByLetter = document.getElementById('searchByLetter');
let rowData = document.getElementById("rowData");

$(document).ready(function () {
    $('body').css('overflow', 'auto');
    $('.loading-screen').fadeOut(1000);
});

async function getMealsByName(name) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let data = await response.json();
    return data.meals || [];
}

async function getMealsByLetter(letter) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let data = await response.json();
    return data.meals || [];
}

function displayProducts(products) {
    let cartona = ``;
    for (let i = 0; i < products.length; i++) {
        cartona += `
            <div class="col-md-3 text-center mt-4 position-relative item overflow-hidden">
                <img src="${products[i].strMealThumb}" class="w-100" alt="${products[i].strCategory}">
                <div class="overlay w-100 text-center fs-6 text-black" onclick="getMealDetails('${products[i].idMeal}')">${products[i].strMeal}</div>
            </div>
        `;
    }
    document.querySelector('.row').innerHTML = cartona;
}

async function searchProductsByName() {
    loader.style.display = 'flex';  
    let term = searchByName.value.trim();
    if (term) {
        let meals = await getMealsByName(term);
        displayProducts(meals);
    }
    $('.loading-screen').fadeOut(1000);  
}

async function searchProductsByLetter() {
    loader.style.display = 'flex';  
    let term = searchByLetter.value.trim();
    if (term) {
        let meals = await getMealsByLetter(term);
        displayProducts(meals);
    }
    $('.loading-screen').fadeOut(1000);  
}

searchByName.addEventListener('input', function () {
    searchProductsByName();
});

searchByLetter.addEventListener('input', function () {
    searchProductsByLetter();
});

async function displayInitialMeals() {
    loader.style.display = 'flex';  
    let meals = await getMealsByLetter('a');
    displayProducts(meals);
    $('.loading-screen').fadeOut(1000);  
}

displayInitialMeals();

async function getMealDetails(mealID) {
    closeSideNav();
    rowData.innerHTML = "";
  
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
    let tagsStr = tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join('');

    let cartona = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
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
    rowData.innerHTML = cartona;
}
