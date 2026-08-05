const container = document.getElementById("featuredProducts");

if(container){

    const products = JSON.parse(

        localStorage.getItem("products")

    ) || [];

    const featured = products.slice(0,4);

    featured.forEach(product=>{

        container.innerHTML+=`

        <div class="product-card">

            <img src="${product.image}">

            <div class="card-body">

                <span class="card-category">

                    ${product.category}

                </span>

                <h3 class="card-title">

                    ${product.title}

                </h3>
                <p class="product-meta">

📍 Campus Pickup

</p>

                <p class="card-price">

                    ${formatPrice(product.price)}

                </p>

                <button
                    class="primary"
                    onclick="viewProduct(${product.id})">

                    View Product

                </button>

            </div>

        </div>

        `;

    });

}

function viewProduct(id){

    localStorage.setItem(

        "selectedProduct",

        id

    );

    window.location.href="product.html";

}