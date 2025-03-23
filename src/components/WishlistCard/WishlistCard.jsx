import { FaTrash } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";

const WishlistCard = ({ product }) => {
    const { removeFromWishlist } = useWishlist();

    return (
        <div className="flex items-center bg-white shadow-md rounded-lg p-4">
            {/* Product Image */}
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />

            {/* Product Details */}
            <div className="flex flex-col flex-grow px-4">
                <Link to={`/product/${product.id}`} className="text-lg font-semibold text-gray-800 hover:text-orange-600">
                    {product.name}
                </Link>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <p className="text-md font-semibold text-green-600">${product.price}</p>
            </div>

            {/* Remove Button */}
            <button onClick={() => removeFromWishlist(product.id)} className="text-red-500 hover:text-red-700">
                <FaTrash size={18} />
            </button>
        </div>
    );
};

export default WishlistCard;
