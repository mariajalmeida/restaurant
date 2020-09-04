const modal = document.querySelector(".modal-background");

const productlistLink = "https://kea-alt-del.dk/t5/api/productlist";
const categoriesLink = "https://kea-alt-del.dk/t5/api/categories";
const productsLinkid = "https://kea-alt-del.dk/t5/api/product?id=";

const template = document.querySelector("#myTemplate").content;
const section = document.querySelector("section");

let image_path = "http://kea-alt-del.dk/t5/site/imgs/";
let mediumImg = image_path + "medium/";



// fetch products by category
function init() {
    fetch(categoriesLink)
        .then(r => r.json())
        .then(
            function (data) {
                categoriesReceived(data);
            })
}

init();


// categories
function categoriesReceived(cats) {
    createNavigation(cats);
    createSections(cats);
    fetchProducts();
}

// create our sections via script rather than on the dom/html
function createSections(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category);
        const h2 = document.createElement("h2");
        h2.textContent = category;
        section.appendChild(h2);
        document.querySelector(".theproducts").appendChild(section);
    })
}

// our categories navigation so the user can jump to the desired location
function createNavigation(categories) {
    categories.forEach(cat => {
        console.log("nav");
        const a = document.createElement("a");
        a.textContent = cat;
        a.setAttribute("href", `#${cat}`);
        document.querySelector("nav").appendChild(a);
    })
}


// fetch data - courses
function fetchProducts() {

    fetch(productlistLink)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            dataReceived(data);
        })
}


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

    if (myProduct.alcohol) {
        console.log("alcoholic drink");

    } else {
        console.log("no alcohol here");
    }
    if (myProduct.soldout) {
        console.log("sold out indeed");
        myClone.querySelector(".soldOut").classList.remove("hidden");
        myClone.querySelector("article").style.opacity = "0.5";

    } else {
        console.log("not sold out");
        myClone.querySelector(".soldOut").classList.add("hidden");

    }

    if (myProduct.discount) {
        console.log("on discount");
        myClone.querySelector(".price").classList.add("strike");
    } else {
        console.log("not on discount");
        myClone.querySelector(".discount").classList.add("hidden");
    }

    if (myProduct.vegetarian) {
        console.log("vegeterian indeed");
        myClone.querySelector(".vegeterian-approved img").classList.remove("hidden");

    } else {
        console.log("not vegeterian approved");
        myClone.querySelector(".vegeterian-approved img").classList.add("hidden");
    }

    discountedItem();

    // to change the content
    myClone.querySelector("h3").textContent = myProduct.name;
    myClone.querySelector(".price").textContent = myProduct.price + " " + "-,";
    // myClone.querySelector(".description p").textContent = myProduct.shortdescription;
    myClone.querySelector(".discount").textContent = discountedItem() + " " + "-,";

    // math
    function discountedItem() {
        const originalPrice = myProduct.price;
        const discountPercent = myProduct.discount;
        const result = originalPrice * discountPercent / 100;
        return result;
    }

    myClone.querySelector("img").src = mediumImg + myProduct.image + "-md.jpg";

    // discount
    // modal
    myClone.querySelector("button").addEventListener("click", () => {
        fetch(productsLinkid + myProduct.id)
            .then(res => res.json())
            .then(showDetails);
    });

    // filters's classes
    const article = myClone.querySelector("article");

    if (myProduct.vegetarian) {
        article.classList.add("vegeterian");
    }

    if (myProduct.discount) {
        article.classList.add("discount");
    }

    if (myProduct.alcohol) {
        article.classList.add("alcohol");
    }


    // to change the new 'parent' element - left at the bottom so the rest works
    const parentEl = document.querySelector("section#" + myProduct.category);


    // append the clone to the DOM
    parentEl.appendChild(myClone);

    // done cloning above

}
// modal
function showDetails(data) {
    console.log(data);
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-image").src = mediumImg + data.image + "-md.jpg"
    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.querySelector(".modal-price").textContent = data.price + " " + ",-";

    if (data.vegetarian) {
        console.log("vegeterian indeed modal");
        modal.querySelector(".vegeterian-approved img").classList.remove("hidden");

    } else {
        console.log("not vegeterian approved modal");
        modal.querySelector(".vegeterian-approved img").classList.add("hidden");
    }
    // stars in the modal
    if (data.stars == 1) {
        console.log("i have one star");
        modal.querySelector(".rating-inner").style.width = "20%";
        modal.querySelector(".rating-inner").style.color = "#ffffff";
    } else if (data.stars == 2) {
        console.log("i have two stars");
        modal.querySelector(".rating-inner").style.width = "40%";
    } else if (data.stars == 3) {
        console.log("three stars");
        modal.querySelector(".rating-inner").style.width = "60%";
    } else if (data.stars == 4) {
        console.log("four stars");
        modal.querySelector(".rating-inner").style.width = "80%";
    } else if (data.stars == 5) {
        console.log("five stars");
        modal.querySelector(".rating-inner").style.width = "100%";
    }

    if (data.allergens["0"]) {
        console.log("no bueno lactose");
        modal.querySelector(".lactose").classList.add("hidden");

    } else {
        console.log("muy bueno uden lactose");
        modal.querySelector(".lactose").classList.remove("hidden");
    }

    modal.classList.remove("hide");
}


// veggie filter part ii
const veggieFilter = document.querySelector("#veggiefilter");
veggieFilter.addEventListener("click", filterVeggieClicked);

function filterVeggieClicked() {
    const articles = document.querySelectorAll("article:not(.vegeterian)");

    articles.forEach(elem => {
        elem.classList.toggle("hidden");
    })
}

// discount filter part ii
const discountFilter = document.querySelector("#discount");
discountFilter.addEventListener("click", filterDiscountClicked);

function filterDiscountClicked() {
    const articles = document.querySelectorAll("article:not(.discount)");

    articles.forEach(elem => {
        elem.classList.toggle("hidden");
    })
}

// alcohol filter part ii
const nonalcoholicFilter = document.querySelector("#nonalcoholic");
nonalcoholicFilter.addEventListener("click", filteralcoholClicked);

function filteralcoholClicked() {
    const articles = document.querySelectorAll("article.alcohol");

    articles.forEach(elem => {
        elem.classList.toggle("hidden");
    })
}


// our modal
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});
