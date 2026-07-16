const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

let products = JSON.parse(
    localStorage.getItem("products")
) || [];

const container = document.getElementById("myProducts");

function getMyProducts() {

    return products.filter(product =>

        product.sellerEmail === currentUser.email

    );

}

function loadProducts() {

    products = JSON.parse(

        localStorage.getItem("products")

    ) || [];

    const myProducts = getMyProducts();

    container.innerHTML = "";

    if (myProducts.length === 0) {

        container.innerHTML = `

        <div class="empty-message">

            <h2>No Listings Yet</h2>

            <p>

                Start selling your unused items.

            </p>

            <br>

            <a href="sell.html" class="primary">

                Sell Your First Item

            </a>

        </div>

        `;

        return;

    }

    const totalValue = myProducts.reduce(

        (sum, product) => sum + product.price,

        0

    );

    container.innerHTML += `

        <div class="dashboard-summary">

            <h2>

                ${myProducts.length} Listings

            </h2>

            <h3>

                Total Value ${formatPrice(totalValue)}

            </h3>

        </div>

    `;

    myProducts.forEach(product => {

        container.innerHTML += `

        <div class="dashboard-card">

            <img

                src="${product.image}"

                alt="${product.title}"

            >

            <div class="dashboard-body">

                <h3>

                    ${product.title}

                </h3>

                <p>

                    ${product.category}

                </p>

                <p>

                    Posted:

                    ${product.postedOn}

                </p>

                <div class="dashboard-price">

                   ${formatPrice(product.price)}

                </div>

                <p>

                    Status:

                    <strong>

                        ${product.status}

                    </strong>

                </p>

                <div class="dashboard-actions">

                    <button

                        class="primary"

                        onclick="markSold(${product.id})"

                    >

                        Mark Sold

                    </button>

                    <button

                        class="delete-btn"

                        onclick="deleteProduct(${product.id})"

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

function markSold(id) {

    products = products.map(product => {

        if (product.id === id) {

            product.status = "Sold";

        }

        return product;

    });

    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );

    showToast(

        "Listing marked as Sold",

        "success"

    );

    loadProducts();

}

function deleteProduct(id) {

    const confirmDelete = confirm(

        "Delete this listing?"

    );

    if (!confirmDelete) return;

    products = products.filter(

        product => product.id !== id

    );

    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );

    showToast(

        "Listing Deleted",

        "success"

    );

    loadProducts();

}

loadProducts();