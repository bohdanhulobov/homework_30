document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "iPhone 13",
      price: 999,
      description:
        "The latest iPhone with A15 Bionic chip, 5G speed, and improved camera system.",
      images: [
        "media/iphone13/iphone13_1.webp",
        "media/iphone13/iphone13_2.webp",
        "media/iphone13/iphone13_3.webp",
      ],
    },
    {
      id: 2,
      name: "Samsung Galaxy S21",
      price: 799,
      description:
        "Experience the new Samsung Galaxy S21 with its stunning display and powerful performance.",
      images: [
        "media/galaxy_s21/galaxy_s21_1.jpg",
        "media/galaxy_s21/galaxy_s21_2.jpg",
        "media/galaxy_s21/galaxy_s21_3.jpg",
      ],
    },
    {
      id: 3,
      name: "Google Pixel 6",
      price: 599,
      description:
        "Google's newest Pixel with Tensor chip, advanced camera features, and pure Android experience.",
      images: [
        "media/pixel6/pixel6_1.webp",
        "media/pixel6/pixel6_2.webp",
        "media/pixel6/pixel6_3.webp",
      ],
    },
  ];

  const storeContainer = document.querySelector(".store");
  const productDetails = document.querySelector(".product-details");
  const backToStoreButton = document.querySelector(".back-to-store");
  const productDescription = document.querySelector(".product-description");

  function createStore() {
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const productName = document.createElement("h3");
      productName.textContent = product.name;

      const productPrice = document.createElement("p");
      productPrice.textContent = `$${product.price}`;

      const viewDetailsButton = document.createElement("button");
      viewDetailsButton.classList.add("btn");
      viewDetailsButton.textContent = "View Details";
      viewDetailsButton.addEventListener("click", () =>
        viewProductDetails(product),
      );

      productDiv.appendChild(productName);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(viewDetailsButton);

      storeContainer.appendChild(productDiv);
    });
  }

  function viewProductDetails(product) {
    storeContainer.classList.add("hidden");
    productDetails.classList.remove("hidden");
    productDescription.textContent = product.description;
    initSlider(product.images);
  }

  function backToStore() {
    storeContainer.classList.remove("hidden");
    productDetails.classList.add("hidden");
  }

  backToStoreButton.addEventListener("click", backToStore);

  const orderButton = document.getElementById("orderButton");
  const orderFormContainer = document.getElementById("orderFormContainer");
  const orderForm = document.getElementById("orderForm");

  orderButton.addEventListener("click", () => {
    orderFormContainer.classList.toggle("hidden");
  });

  function getOrderData() {
    return {
      name: document.getElementById("orderName").value,
      email: document.getElementById("orderEmail").value,
      phone: document.getElementById("orderPhone").value,
      address: document.getElementById("orderAddress").value,
      quantity: document.getElementById("orderQuantity").value,
      contactMethod: document.querySelector(
        'input[name="contactMethod"]:checked',
      ).value,
      additionalServices: Array.from(
        document.querySelectorAll('input[name="additionalServices"]:checked'),
      ).map((el) => el.value),
    };
  }

  function validateOrderData(data) {
    const errors = {};
    const nameRegExp = /^[A-Za-z\s]+$/;
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegExp = /^\+?\d{10,15}$/;

    if (!nameRegExp.test(data.name)) {
      errors.name = "Name can only contain letters and spaces.";
    }

    if (!emailRegExp.test(data.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!phoneRegExp.test(data.phone)) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (data.address.length < 5) {
      errors.address = "Address must be at least 5 characters long.";
    }

    if (data.quantity <= 0) {
      errors.quantity = "Quantity must be at least 1.";
    }

    return errors;
  }

  function displayErrors(errors) {
    document.querySelectorAll(".error").forEach((el) => el.remove());
    for (const [field, message] of Object.entries(errors)) {
      const input = document.getElementById(
        `order${field.charAt(0).toUpperCase() + field.slice(1)}`,
      );
      const errorElement = document.createElement("p");
      errorElement.textContent = message;
      errorElement.classList.add("error");
      input.insertAdjacentElement("afterend", errorElement);
    }
  }

  function handleOrderSubmit(event) {
    event.preventDefault();
    const orderData = getOrderData();
    const errors = validateOrderData(orderData);

    if (Object.keys(errors).length > 0) {
      displayErrors(errors);
      return;
    }

    console.log("Order submitted:", orderData);
    alert("Order submitted successfully!");

    orderForm.reset();
    orderFormContainer.classList.add("hidden");
  }

  orderForm.addEventListener("submit", handleOrderSubmit);

  createStore();
});
