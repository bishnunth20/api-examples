const searchFood = async () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // clear search input field
  searchField.value = '';

  if (searchText == '') {
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
  }
  else {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    // console.log(url);

    try {
      const res = await fetch(url);
      const data = await res.json();
      displaySearchResult(data.meals)
    }
    catch (error) {
      console.log(error);
    }
    
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => displaySearchResult(data.meals));
  }
}

const displaySearchResult = meals => {
  const searchResult = document.getElementById('search-result');
  // searchResult.innerHTML = '';
  searchResult.textContent = '';
  
  if (meals == null) {    // (meals.length == 0) showing error 
    // show no result found;
    const div = document.createElement('div');
    div.classList.add('card', 'mx-auto');
    div.innerHTML = `
      <div class="card-body text-center text-danger">
        <h5 class="card-title">No Result Found</h5>
      </div>
    `;
    searchResult.appendChild(div);
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

const loadMealDetail = async mealId => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  const res = await fetch(url);
  const data = await res.json();
  displayMealDetail(data.meals[0]);

  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
  console.log(meal);
  const mealDetails = document.getElementById('meal-details');
  mealDetails.textContent = '';
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