export default function Card({
  id,
  title,
  price,
  description,
  image,
  addProduct,
  qty,
}) {
  return (
    <div>
      <div className="card h-100">
        <img
          className="card-img-top"
          src={image}
          alt="..."
          style={{ height: "15rem" }}
        />
        <div className="card-body p-4">
          <div className="text-center hmm">
            <h5 className="fw-bolder">{title.substring(0, 15)}</h5>
            <p>{description.substring(0, 80)}</p>
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <p>Price: {price}$</p>
          <p>Minimum Quantity: {qty}</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            addProduct({ id, title, price, description, image, qty })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
