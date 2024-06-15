import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Cart from "./Cart";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === existingItemIndex ? { ...item, qty: item.qty + 1 } : item
      );
      setCart(updatedCart);
      setTotalPrice((prevPrice) => prevPrice + product.price);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, qty: 1 }]);
      setTotalPrice((prevPrice) => prevPrice + product.price);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    const removedItem = updatedCart.splice(index, 1)[0];
    setCart(updatedCart);
    setTotalPrice(
      (prevPrice) => prevPrice - removedItem.price * removedItem.qty
    );
  };

  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].qty = quantity;
    setCart(updatedCart);
    setTotalPrice(calculatedTotalPrice(updatedCart));
  };

  const calculatedTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const saveCartItems = (cart) => {
    const saveapi = "http://localhost:8000/api/saveorder";
    axios
      .post(saveapi, { cart })
      .then((res) => {
        console.log(res);
        alert("Order Confirmed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [products, setProducts] = useState([]);

  function getProducts() {
    var api_url = "https://fakestoreapi.com/products";

    axios
      .get(api_url)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1 style={{ fontFamily: "Brush Script MT" }}>HOME PAGE</h1> <hr />
      <div>
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          totalPrice={totalPrice}
        />
      </div>
      <button className="btn btn-primary" onClick={saveCartItems}>
        Confirm Order
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button className="btn btn-danger">Close Cart Window</button>
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {products.map((content, index) => (
            <div className="col mb-5" key={index}>
              <Card
                id={content.id}
                title={content.title}
                price={content.price}
                description={content.description}
                image={content.image}
                addProduct={addToCart}
                qty="1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
