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

    if (myProduct.soldout) {
        console.log("sold out indeed");
        document.querySelector(".course").style.opacity = 0;

    } else {
        console.log("not sold out");
        document.querySelector(".course").style.opacity = 100;
    }
    if (myProduct.vegetarian) {
        console.log("vegeterian indeed");
    } else {
        console.log("not vegetarian appropriate");
    }

    // modal box

    let modalBtn = document.getElementById("modal-btn")
    let modal = document.querySelector(".modal")
    let closeBtn = document.querySelector(".close-btn")

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
