let cart = [];

let total = 0;


function addToCart(name, price){


    cart.push({
        name:name,
        price:price
    });


    total += price;


    displayCart();


}




function displayCart(){


    let cartItems = document.getElementById("cartItems");

    let totalText = document.getElementById("total");


    if(cart.length === 0){

        cartItems.innerHTML = "Your cart is empty";

    }

    else{


        cartItems.innerHTML = "";


        cart.forEach((item,index)=>{


            cartItems.innerHTML += `

            <p>
            ${item.name} - $${item.price}

            <button onclick="removeCart(${index})">
            Remove
            </button>

            </p>

            `;


        });


    }



    totalText.innerHTML = 
    "Total: $" + total;



}





function removeCart(index){


    total -= cart[index].price;


    cart.splice(index,1);


    displayCart();


}function sendWhatsApp(){

let name = document.getElementById("name").value;

let phone = document.getElementById("phone").value;

let message = document.getElementById("message").value;


let order =
"New Tesla Order\n\n" +
"Name: " + name + "\n" +
"Phone: " + phone + "\n" +
"Order: " + message;


window.open(
"https://wa.me/2348128745721?text=" + encodeURIComponent(order)
);

}emailjs.init("SMIll1sq8cBbCzskR");

function sendEmail(){

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("phone").value;
let message = document.getElementById("message").value;


emailjs.send(
"service_hq3uofs",
"template_ixlmcgg",
{
customer_name:name,
customer_email:email,
customer_phone:phone,
message:message
}
)

.then(function(){

alert("Order sent successfully!");

});

}