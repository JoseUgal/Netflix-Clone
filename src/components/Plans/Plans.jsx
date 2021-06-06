import React, { useState, useEffect } from "react";

import "./Plans.css";

import Loading from "../../screens/Loading/Loading";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

import { db } from "../../firebase";

import { loadStripe } from "@stripe/stripe-js";

function Plans() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);

  const [subscription, setSubscription] = useState({});

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_start:
              subscription.data().current_period_start.seconds,
            current_period_end: subscription.data().current_period_end.seconds,
            status: subscription.data().status,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    setLoading(true);
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then(async (querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = productDoc.ref.collection("prices").get();
          (await priceSnap).docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
        setLoading(false);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    setLoading(true);
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        // Show an error to your customer and let
        // inspect your cloud Functions Logs in the firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        // We have a session, let's redirect to checkout
        // Init Stripe
        const stripe = await loadStripe(
          "pk_test_51Iz9QOIIOSfarzoq2NZ3PmlR5pijQc7wO3ilerEhsWlBOcCjKeAW6KtzYdOWzaeHvaf3LRnbFSnejruDBUNdydON001vActYMq"
        );
        stripe.redirectToCheckout({ sessionId });
        setLoading(false);
      }
    });
  };

  return (
    <div className="plansScreen">
      {loading ? <Loading /> : null}
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // TODO: add some logic to check if user's subscription is active...

        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div key={productId} className="plansScreen__plan">
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
              className={`plansScreen__button ${isCurrentPackage && "active"}`}
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
