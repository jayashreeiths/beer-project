const url = "https://api.punkapi.com/v2/beers/random";


function removeAllChildNodes(parent) {

    while (parent.firstChild) {

        parent.removeChild(parent.firstChild);
    }
}

//  function for retrieving and displaying a random beer
const grabRandomBeer = () => {
    // Fetching random beer data from API
    fetch(url)
        .then(response => response.json())
        .then(beers => {
            // API returns an array containg only one element: we get it
            const beer = beers[0];
            console.log(beer);

            // Creating DOM element for some beer properties
            const nameElement = document.createElement("h2");

            nameElement.textContent = beer.name;

            const imgElement = document.createElement("img");
            imgElement.src = beer.image_url
            if (beer.image_url == null) {
                beerImg.src = 'punkimage.png';
            }
            const seeElement = document.createElement("p");

            seeElement.innerHTML = "see more";
            seeElement.setAttribute('name', beer.id);
            // Clear previous beer data
            const beerElement = document.getElementById("beer");
            // beerElement.innerHTML = "";
            removeAllChildNodes(beerElement);
            // Add beer info to the page
            beerElement.appendChild(nameElement);
            beerElement.appendChild(imgElement);
            beerElement.appendChild(seeElement);


            seeElement.addEventListener('click', onseeClicked);

            //seeMore(beer);
        })
        .catch(err => {
            console.error(err.message);
        });
};





function onseeClicked(evt) {

    //seeMore();
    const id = evt.target.getAttribute('name');
    const url = `info.html?name=${id}`;
    document.location.href = url;
}


// Grab a new beer when clicking the button
document.getElementById("grabButton").addEventListener("click", grabRandomBeer);
//document.getElementById("seeMore").addEventListener("click", seeMore);

function search(evt) {

    window.location = "searchpage.html";;

}
const searchElement = document.getElementById("searchbutton");
searchElement.addEventListener('click', search)