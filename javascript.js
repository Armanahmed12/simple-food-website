// ===================== js for "Food display" Section ===========================

loadData();

function loadData(foodsCategory = 'Seafood') {

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodsCategory}`)
        .then(res => res.json())
        .then(data => displayData(data.meals));

}
// all food data container(variable)
let foodsDataContainer;
// will six foods data be render Or not?
let showSixFoodsData = false;
const xx = 33;
const displayData = (foodsData) => {

    foodsDataContainer = foodsData;
    // cleare the foods container before appending data to that
    document.getElementById('foods-container').innerHTML = '';
    let foodItemsContainer = document.getElementById('foods-container');

    if (!foodsData) {
        document.getElementById('show-all-foods-btn').style.display = 'none';
        foodItemsContainer.setAttribute('class', 'text-center text-red-500 font-bold mx-auto text-3xl mb-6');
        foodItemsContainer.innerText = "There is No data based on you food category!"
        return;
    } else {
        foodItemsContainer.setAttribute('class', "grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-12");
        document.getElementById('show-all-foods-btn').style.display = 'block';
    }
    //  how many data will be renderd
    const foodsDataForDisplaying = showSixFoodsData ? foodsData : foodsData.slice(0, 6);

    foodsDataForDisplaying.forEach((eachFoodItem) => {
          
           const x = eachFoodItem;  
        const div = document.createElement('div');
        div.setAttribute('class', 'grid grid-cols-1 md:grid-cols-2')
        div.innerHTML = `
                    <img src=${eachFoodItem.strMealThumb} alt="" />
               <div class="text-md-start text-center mb-6 pr-1 md:mb-0">
               <h2 >${eachFoodItem.strMeal}</h2>
               <p>There are many variations of passages of available, but the majority have suffered</p>

                <button onclick=getSpecificFoodId(${eachFoodItem.idMeal})
                 type="button" class="btn btn-link p-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                View Details </button>
               </div> `;
        foodItemsContainer.appendChild(div);
        

    });

}

//=============== show all food after clicking the "Show-All" button ============

document.getElementById('show-all-foods-btn').addEventListener('click', function (event) {

    showSixFoodsData = true;
    displayData(foodsDataContainer);
    event.target.style.display = "none"
});

// ================= showing data based on user desire Category ====================

document.getElementById('search-btn').addEventListener('click', (event) => {

    alert("Hello")
    const userGivenCategory = event.target.parentNode.childNodes[3].value;
    loadData(userGivenCategory);
    event.target.parentNode.childNodes[3].value = '';
})


function getSpecificFoodId(specificFoodId){

    
         fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${specificFoodId}`)
         .then(res => res.json())
         .then(meal => showMealDetails(meal.meals[0]))
        console.log(specificFoodId);
        
}


// show meal details

const showMealDetails = (meal) =>{
   
       console.log(meal);
      
     const mealDetailsModalContainer = document.getElementById('modal-container');
     document.getElementById('staticBackdropLabel').innerText = meal.strMeal;
     document.getElementById('modal-body').innerHTML = `
     <img src='${meal.strMealThumb}' class='h-[200px] w-full mb-3'/>
     <p class='text-xl'> <b>Category :</b> ${meal.strCategory} </p>
     <p class='my-2'> <b>MealArea :</b> ${meal.strArea}</p>
     <p> <b>Instruction :</b> ${meal.strInstructions}</p>
     <p class='my-2'> <b>YouTube :</b> ${meal.strYoutube}</p>
     
     `
     
}









