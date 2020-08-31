const productlistLink = "https://kea-alt-del.dk/t5/api/productlist";
const categoriesLink = "https://kea-alt-del.dk/t5/api/categories";
const productsLinkid = "https://kea-alt-del.dk/t5/api/product?id=";

const template = document.querySelector("#myTemplate").content;
const section = document.querySelector("section");

let image_path = "http://kea-alt-del.dk/t5/site/imgs/";
let mediumImg = image_path + "medium/";



// fetch data

fetch(productlistLink)
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        dataReceived(data);
    })

function dataReceived(products) {
    products.forEach(showProduct);
}

function showProduct(myProduct) {
    console.log(myProduct);

    // to make a clone + the template needs this to be visible
    const elTemplate = document.querySelector("#myTemplate").content;

    // el clone
    const myClone = elTemplate.cloneNode(true);

    // if statements

    if (myProduct.soldout) {
        console.log("sold out indeed");
        myClone.querySelector(".soldOut").classList.remove("hidden");

    } else {
        console.log("not sold out");
        myClone.querySelector(".soldOut").classList.add("hidden");

    }

    if (myProduct.vegetarian) {
        console.log("vegeterian indeed");
        myClone.querySelector(".vegeterian").classList.add("hidden");

    } else {
        console.log("not vegetarian appropriate");
        myClone.querySelector(".vegeterian").classList.remove("hidden");
    }

    if (myProduct.discount) {
        console.log("on discount");
        myClone.querySelector(".price").classList.add("strike");
    } else {
        console.log("not on discount");
        myClone.querySelector(".discount").classList.add("hidden");
    }

    // to change the content
    myClone.querySelector("h3").textContent = myProduct.name;
    myClone.querySelector(".price").textContent = myProduct.price + " " + "-,";
    myClone.querySelector(".description p").textContent = myProduct.shortdescription;
    myClone.querySelector(".discount").textContent = myProduct.discount + " " + "-,";

    myClone.querySelector("img").src = mediumImg + myProduct.image + "-md.jpg";



    let link = productsLinkid + myClone.id;


    // to change the new 'parent' element
    const parentEl = document.querySelector("section#starter");

    // append the clone to the DOM
    parentEl.appendChild(myClone);


    // done cloning above


    // modal box

    let modalBtn = document.getElementById("modal-btn");
    let modal = document.querySelector(".modal");
    let closeBtn = document.querySelector(".close-btn");

    modalBtn.onclick = function () {
        modal.style.display = "block";
    }
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }
}
