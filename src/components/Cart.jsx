export default function Cart({
  cart,
  updateQuantity,
  removeFromCart,
  totalPrice,
}) {
  return (
    <div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Amount</th>
            <th scope="col">Remove</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img src={item.image} width="50px"></img>
              </td>
              <td>{item.title.substring(0, 25)}</td>
              <td>{item.price.toFixed()}$</td>
              <td>{item.description.substring(0, 50)}</td>
              <td>{item.qty} </td>
              <td>{(item.price * item.qty).toFixed()}$</td>
              <td>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </td>
              <td>
                <button
                  onClick={() => updateQuantity(index, parseInt(item.qty) - 1)}
                  disabled={item.qty <= 1}
                >
                  -
                </button>
                <button
                  onClick={() => updateQuantity(index, parseInt(item.qty) + 1)}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
          <tr key="total">
            <td colSpan="6">Total Price:</td>
            <td colSpan="3">{totalPrice.toFixed()}$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
