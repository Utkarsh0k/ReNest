const currentUser = JSON.parse(

    localStorage.getItem("currentUser")

);

const products = JSON.parse(

    localStorage.getItem("products")

) || [];

const container = document.getElementById("myProducts");

const myProducts = products.filter(

    product => product.seller === currentUser.name

);

function loadProducts(){

    container.innerHTML = "";

    if(myProducts.length === 0){

        container.innerHTML = `

        <div class="empty-message">

            <h2>No Listings Yet</h2>

            <p>Go to Sell Item and post your first product.</p>

        </div>

        `;

        return;

    }

    myProducts.forEach(product=>{

        container.innerHTML += `

        <div class="dashboard-card">

            <img src="${product.image}">

            <div class="dashboard-body">

                <h3>${product.title}</h3>

                <p>${product.category}</p>

                <div class="dashboard-price">

                    ₹${product.price}

                </div>

                <div class="dashboard-actions">

                    <button
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})">

                    Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

loadProducts();

function deleteProduct(id){

    const updated = products.filter(

        product => product.id !== id

    );

    localStorage.setItem(

        "products",

        JSON.stringify(updated)

    );

    showToast("Listing Removed");

    setTimeout(()=>{

        location.reload();

    },800);

}