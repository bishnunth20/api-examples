document.getElementById('error-message').style.display = 'none';

const searchFood = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // clear search input field
  searchField.value = '';
  document.getElementById('error-message').style.display = 'none';

  if (searchText == '') {
    // please write something to display (H.W)
    
    /* 
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card', 'mx-auto');
    div.innerHTML = `
      <div class="card-body text-center text-danger">
        <h5 class="card-title">please write something to display</h5>
      </div>
    `;
    searchResult.appendChild(div);
    */
  }
  else {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    // console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(data => displaySearchResult(data.meals))
      .catch(error => displayError(error));
  }
}

const displayError = error => {
  document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = meals => {
  const searchResult = document.getElementById('search-result');
  // searchResult.innerHTML = '';
  searchResult.textContent = '';
  
  if (meals == null) {    // (meals.length == 0) showing error 
    // show no result found; (H.W)
    
    /** 
    const div = document.createElement('div');
    div.classList.add('card', 'mx-auto');
    div.innerHTML = `
      <div class="card-body text-center text-danger">
        <h5 class="card-title">No Result Found</h5>
      </div>
    `;
    searchResult.appendChild(div);
    */
  }
  else {
    meals.forEach(meal => {
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
        <div onclick='loadMealDetail(${meal.idMeal})' class="card">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
          </div>
        </div>
      `;
      searchResult.appendChild(div);
    });
  }
}

const loadMealDetail = mealId => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
  console.log(meal);
  const mealDetails = document.getElementById('meal-details');
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
  `;
  mealDetails.appendChild(div);
}