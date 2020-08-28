// redo the filters into vanilla JS

// add 'allergens' icon-link under each card

// mansory to make the filters work

$(document).ready(function () {
    var $grid = $("main");
    $grid.imagesLoaded(function () {
        $grid.masonry({
            itemSelector: "article",
            columnWidth: 200
        });
    });
    $(".button").click(function () {
        $(this).addClass("selected");
        $(".button").not($(this)).removeClass("selected");
        var ssf = $(this).attr("filter");
        $("article." + ssf).show();
        $("article").not("." + ssf).hide();
        $grid.masonry();
    });
});

// end mansory


// fetch data

fetch("https://kea-alt-del.dk/t5/api/productlist")
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
    myClone.querySelector("h2").textContent = myProduct.name;
    myClone.querySelector(".price").textContent = myProduct.price + " " + "-,";
    myClone.querySelector(".description").textContent = myProduct.shortdescription;
    myClone.querySelector(".discount").textContent = myProduct.discount + " " + "-,";

    // myClone.querySelector("img").src = myProduct.image;

    // to change the new 'parent' element

    const parentEl = document.querySelector("#startTemplate");

    // append the clone to the DOM

    parentEl.appendChild(myClone);
}
