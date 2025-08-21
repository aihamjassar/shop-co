const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const ApiError = require("../utils/apiError");
const Coupon = require("../models/coupon.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createCheckoutSession = asyncHandler(async (req, res, next) => {
  const { cartId, couponCode } = req.body;

  const cart = await Cart.findById(cartId).populate(
    "cartItems.product",
    "title imageCover"
  );

  if (!cart) return next(new ApiError("Cart not found", 404));

  const lineItems = cart.cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.title,
        images: [item.product.imageCover],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  let coupon;
  let totalAmount = cart.totalAmount;
  let stripeCoupon;
  if (couponCode) {
    coupon = await Coupon.findOne({
      code: couponCode,
      isActive: true,
      user: req.user._id,
    });
    if (coupon) {
      totalAmount -= Math.round(
        (cart.totalAmount * coupon.discountPercentage) / 100
      );
      stripeCoupon = await createStripeCoupon(coupon.discountPercentage);
    }
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    discounts: stripeCoupon ? [{ coupon: stripeCoupon }] : [],
    success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    customer_email: req.user.email,
    metadata: { cart: cart._id.toString() },
  });

  if (totalAmount > 200) await createNewCoupon(req.user._id);

  res.status(200).json({ data: session.id });
});

exports.webHookCheckout = asyncHandler(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed")
    await createOrder(event.data.object);
  res.sendStatus(200);
});

const createStripeCoupon = async (discountPercentage) => {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
};

const createNewCoupon = async (userId) => {
  await Coupon.findOneAndDelete({ user: userId });

  const newCoupon = await Coupon.create({
    code: "GIFT" + Math.random().toString(32).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    user: userId,
  });
  return newCoupon;
};

const createOrder = async (session) => {
  const cart = await Cart.findByIdAndDelete(session.metadata.cart);
  const order = await Order.create({
    user: cart.user,
    products: cart.cartItems,
    totalAmount: session.amount_total / 100,
    stripeSessionId: session.id,
  });
};
