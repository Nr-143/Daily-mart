import WishlistCard from "../components/WishlistCard/WishlistCard";
import { useWishlist } from "../context/WishlistContext.jsx";
import { Link } from "react-router-dom";

const WishlistPage = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800">My Wishlist ❤️</h1>

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center mt-10">
                    <p className="text-gray-600 text-lg">Your wishlist is empty!</p>
                    <Link to="/products" className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {wishlist.map((product) => (
                        <WishlistCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
