// redo the filters into vanilla JS

// add 'allergens' icon-link under each card

// mansory to make the filters work


// fetch data

fetch("https://kea-alt-del.dk/t5/api/productlist?category=starter")
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {

        dataReceived(data);
    })

function dataReceived(products) {
    products.forEach(showProduct)
}

function showProduct(myProduct) {
    console.log(myProduct)
    // to make a clone + the template needs this to be visible

    const elTemplate = document.querySelector("#myTemplate").content;

    // el clone

    const myClone = elTemplate.cloneNode(true);

    // to change the content
    //  myClone.querySelector(".discount").textContent = myProduct.id;
    myClone.querySelector("h3").textContent = myProduct.name;
    myClone.querySelector(".price").textContent = myProduct.price + " " + "-,";
    myClone.querySelector(".description").textContent = myProduct.shortdescription;
    myClone.querySelector(".discount").textContent = myProduct.discount + " " + "-,";
    //    myClone.querySelector(".soldOut").textContent = "product out of stock";

    // noStock();

    // myClone.querySelector("img").src = myProduct.image;

    // to change the new 'parent' element

    const parentEl = document.querySelector("section#starter");

    // append the clone to the DOM

    parentEl.appendChild(myClone);


    // done cloning above

    if (myProduct.soldout) {
        console.log("sold out indeed");
        document.querySelector(".course").style.opacity = 50;

    } else {
        console.log("not sold out");
        document.querySelector(".course").style.opacity = 100;
    }
}
