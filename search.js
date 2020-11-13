const api = "https://api.punkapi.com/v2/beers?";
const lengthOf = 'https://api.punkapi.com/v2/beers?page=1&per_page=10';
const mainElement = document.querySelector('main')
const formElement = document.querySelector('form')
const prevBtnElement = document.querySelector('button.btn-prev')
const nextBtnElement = document.querySelector('button.btn-next')
prevBtnElement.addEventListener('click', previous);
nextBtnElement.addEventListener('click', next);
let beers;
let searchStr;
let page_num = 1;
const ulElement = document.querySelector('ul');
var values = ["&beer_name=", "&hops=", "&malt="];


formElement.addEventListener('submit', evt => {
    //let userInput = (evt.target[0].value)
    

    let tarAdd = "";

    for (i = 0; i < evt.target.length - 1; i++) {
        if (evt.target[i].value == "") {
            continue;
        } else {

            tarAdd = tarAdd + values[i] + evt.target[i].value;
        }

    }
    searchStr = api + tarAdd + '&per_page=10&page=' + page_num;
    //getData(url, render);
    


    fetch(searchStr)
        .then(response => response.json())
        .then(data => {
            //console.log(data)


            beers = data;
            render(beers);

        })
    evt.preventDefault();

})

function render(data) {

    ulElement.addEventListener('click', onUlClicked);


    for (let i = 0; i < data.length; i++) {
        const beer = data[i];

        const liElement = document.createElement('li');
        liElement.setAttribute('name', beer.name);
        liElement.textContent = beer.name;

        ulElement.appendChild(liElement);
    }

    mainElement.appendChild(ulElement);

}



function onUlClicked(evt) {
    //removeAllChildNodes(mainElement);
    const next = addEventListener('click', evt => {
        ;
        const id = evt.target.getAttribute('name');
        const url = `info.html?name=${id}`;
        document.location.href = url;
        //console.log(evt)
    })
}

function next(evt) {
    const searchStr2 = document.querySelector('.text').value;
    page_num++;

    url = `${api}?beer_name=${searchStr2}&page=${page_num}&per_page=10`;
    getDataForList(url, render);
    evt.preventDefault();
}


function previous(evt) {
    const searchStr2 = document.querySelector('.text').value;
    if (page_num !== 1) {
        page_num--;
        url = `${api}?beer_name=${searchStr2}&page=${page_num}&per_page=10`;
        getDataForList(url, render)
        evt.preventDefault();
    } else {
        alert('Previous page, not existing');
    }

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



function getDataForList(url, callback) {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            removeAllChildNodes(ulElement);
            callback(data);


        })
}

function onSubmit(evt) {
    let tarAdd = "";

    for (i = 0; i < evt.target.length - 1; i++) {
        if (evt.target[i].value == "") {
            continue;
        } else {

            tarAdd = tarAdd + values[i] + evt.target[i].value;
        }

    }
    url = `${api}?${tarAdd}${page}${page_num}${per_page}`;
    //getData(url, render);
    console.log(url);
    evt.preventDefault();
}