
const slide = document.getElementById("imagedisplay");
const addButton = document.querySelectorAll(".addtocart");
const hamburgers = document.querySelector(".fa-bars");
const navBars = document.querySelector(".navbar");
let position = 0;
let direction = 1;
setInterval(() => {
    position += direction * 2;

    if(position > slide.scrollHeight - slide.clientHeight ){
        direction = -1;
    }
    if( position < 0){
        direction = 1;
    }
    slide.scrollTop = position;
}, 50);

addButton.forEach(button =>{
    button.addEventListener("click", ()=>{
        const card = button.closest(".shop");
        const image = card.getAttribute("data-image");
        const name = card.querySelector("h5").textContent;
        const price = card.querySelector(".mainprice").textContent;
        const beforeprice = card.querySelector(".beforeprice").textContent;

        const products = {image, name, price, beforeprice, quantity: 1};
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        existingCart.push(products);
        localStorage.setItem("cart", JSON.stringify(existingCart));

        alert("Added to  Cart");
            
    });
    
});

//=Hamburgers
hamburgers.addEventListener("click", () =>{
    navBars.classList.toggle("open");

})

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCointainer = document.querySelector(".cartinfoone");
cart.forEach(products => {
    cartCointainer.innerHTML += `
     <div class="cartbox">
                <img src="${products.image}" class="imagecart"/>

                <div class="cartwords">
                    <h1>${products.name}</h1>
                    <p> ${products.price} <span style="text-decoration:line-through; font-size: 0.7rem>">${products.beforeprice}</span></p>
                    <div class="cartcontrol">
                    <button class="minus">-</button><p class="amount">1</p><button class="plus">+</button>
                    </div>
                </div>

                <div>

                </div>
            </div>
    `
    
}) 

const plusbutton = document.querySelectorAll(".plus");
const minusbutton = document.querySelectorAll(".minus");
const quantityofgoods = document.querySelectorAll(".amount");
const cartBox = document.querySelectorAll(".cartbox");

plusbutton.forEach( button => {
    button.addEventListener("click", ()=>{
        const card = button.closest(".cartbox");
        const amount = card.querySelector(".amount");
        amount.textContent = parseInt(amount.textContent) + 1;
        
    })

})

minusbutton.forEach( button => {
    button.addEventListener("click", ()=>{
        const card = button.closest(".cartbox");
        const amount = card.querySelector(".amount");
        amount.textContent = parseInt(amount.textContent) - 1;

        if(parseInt(amount.textContent) === 0){
            alert(" you are about to delete item");
            card.remove();
            
        }
        
    })

})

const cartitems = JSON.parse(localStorage.getItem("cart")) || [];
const totalContainer = document.querySelector(".carttotalcontainer");
    
    cartitems.forEach(products =>{
        totalContainer.innerHTML +=`
     <div class="cartvariable">
                <p>${products.name}</p>
            </div>

            <div class="cartvalues">
                 <p> ${products.price} <span style="text-decoration:line-through; font-size: 0.2rem>">${products.beforeprice}</span></p>
            </div>

`
    });


    
const cartit = JSON.parse(localStorage.getItem("cart")) || [];
const input = document.querySelector(".input");
let contain = 0;
cartit.forEach( product=>{
    contain += parseInt(product.price.replace(/[^0-9]/g, "")) * product.quantity;

});
contain += 1500;
input.value = contain;

