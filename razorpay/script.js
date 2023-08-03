// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

function getPrice() {
  let orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  if (orderDetails) {
    document.getElementById(
      "amount"
    ).innerHTML = `Price To Pay: $${orderDetails.amount}`;
    return orderDetails.amount;
  } else {
    alert("Invalid request");
    location.href = "../shop";
  }
}

function getOrderId() {
  let orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  if (orderDetails) {
    return orderDetails.orderId;
  } else {
    alert("Invalid request");
    location.href = "../shop";
  }
}

let amount = getPrice();

let orderId = getOrderId();

document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: [amount] * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "USD",
    name: "MeShop.",
    description: `Order Id: ${orderId}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image: "",
    handler: function (response) {
      transaction(response);
    },
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.on("payment.failed", function (response) {
    alert(response.error.code);
  });
  rzpy1.open();
  // clear mycart - localStorage
  e.preventDefault();
};

function transaction(response) {
  let paymentId = response.razorpay_payment_id;
  alert(`Payment Successfull ID : ${paymentId}`);
  localStorage.removeItem("orderDetails");
  localStorage.removeItem("cartItems");
  location.href = "../shop";
}
