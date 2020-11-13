const mainElement = document.querySelector('main');
const searchParams = new URLSearchParams(window.location.search);
// const api = 'https://api.punkapi.com/v2/beers/1'; this is hard coded to get only the first beer (1) in the api
const api = 'https://api.punkapi.com/v2/beers';
const id = searchParams.get('name');
const url = `${api}/${id}`;
//const url = api + "/" + id;
//calling the function
getData(url, render);

//function to fetch the data from api
function getData(url, callback) {

    fetch(url)
        .then(res => res.json())
        .then(data => {

            callback(data);

        })
        .catch(error => console.log(error));
}

function render(data) {
    console.log(data);

    const beer = data[0];
    const name = beer.name;
    const description = beer.description;
    const image = beer.image_url;
    const brewers_tips = beer.brewers_tips;
    const ingredients = beer.ingredients.malt;
    const hops = beer.ingredients.hops;
    const food_pairing = beer.food_pairing;

    ulElemnet = document.getElementById("beer-info");
    //creating li elements
    const h1Tag = document.createElement('h1');
    const liDescr = document.createElement('li');
    const liImg = document.createElement('img');
    const liBrew = document.createElement('li');
    const liAbv = document.createElement('li');
    const liVol = document.createElement('li');
    const liIng = document.createElement('li');
    const liHops = document.createElement('li');
    const liFood = document.createElement('li');
    //assigning values
    h1Tag.textContent = name;
    liDescr.textContent = `Descrption:${description}`;
    liImg.src = image
    liAbv.textContent = `Alcohol by volume :${beer.abv}%`;
    liBrew.textContent = `Brewing tips:${brewers_tips}`;
    liVol.textContent = `volume:${Object.values(beer.volume)}`;

    // appending the values
    ulElemnet.appendChild(h1Tag);
    ulElemnet.appendChild(liImg);
    ulElemnet.appendChild(liAbv);
    ulElemnet.appendChild(liDescr);

    ulElemnet.appendChild(liVol);
    ingredients.forEach(element => {

        liIng.textContent = `Ingredients: Name :${element.name} Amount :${Object.values(element.amount)}`;

        ulElemnet.appendChild(liIng);
    });
    hops.forEach(element => {

        liHops.textContent = `Hops: Name :${element.name} Amount :${Object.values(element.amount)}`;

        ulElemnet.appendChild(liHops);


    });
    food_pairing.forEach(element => {

        liFood.textContent = `Food Pairing: ${element}`;

        ulElemnet.appendChild(liFood);


    });


    ulElemnet.appendChild(liBrew);

}