
const ProductCard = ({ product }) => {
    return (
        <>
            {/* <div>
                <div className="card w-72 lg:w-80 bg-base-100 shadow-xl">
                    <figure>
                        <img className="max-h-60 w-full object-cover"
                            src={product.image}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {product.title}
                        </h2>
                        <p className="mb-4">{product.description.split('?')[0]}</p>
                        <div className="flex justify-between">
                            <div className="badge">{product.category}</div>
                            <div className="badge">{product.company}</div>
                        </div>
                        <div className="card-actions">
                            <div className="flex-1">
                                <p className="text-lg font-semibold">
                                    {`₹${product.price}`}
                                </p>
                                <span className="text-sm text-gray-400">(excl. of taxes)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
  <a href="#" className="group relative block bg-black">
  <img
    alt=""
    src={product.image}
    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
  />

  <div className="relative p-4 sm:p-6 lg:p-8">
    <p className="text-sm font-medium uppercase tracking-widest text-teal-500">{product.category}</p>

    <p className="text-xl font-bold text-white sm:text-2xl">{product.title}</p>

    <div className="mt-32 sm:mt-48 lg:mt-64">
      <div
        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p className="text-sm text-white">
          {product.description}
        </p>
      </div>
    </div>
  </div>
</a>
        </>
    )
}

export default ProductCard;
