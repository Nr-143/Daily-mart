import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ProductList = ({ products, onEdit, onDelete, searchTerm }) => {
    const [expandedProduct, setExpandedProduct] = useState(null);

    const toggleExpand = (productId) => {
        setExpandedProduct(expandedProduct === productId ? null : productId);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        return (
            <div className="bg-white rounded-xl p-8 text-center shadow">
                <p className="text-gray-500">No products found</p>
            </div>
        );
    }

    return (
        <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {product.image && (
                                            <div className="flex-shrink-0 h-10 w-10 mr-3">
                                                <img className="h-10 w-10 rounded object-cover" src={product.image} alt={product.name} />
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium">{product.name}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1">{product.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap capitalize">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹{product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 10 ? 'bg-green-100 text-green-800' :
                                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {product.stock} {product.stock > 0 ? 'in stock' : 'out of stock'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {product.offer > 0 ? (
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                            {product.offer}% off
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">No offer</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <FiEdit2 />
                                    </button>
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-3">
                                {product.image && (
                                    <div className="flex-shrink-0 h-12 w-12">
                                        <img className="h-12 w-12 rounded object-cover" src={product.image} alt={product.name} />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                                    <div className="flex space-x-2 mt-1">
                                        <span className="text-sm font-medium">₹{product.price}</span>
                                        {product.offer > 0 && (
                                            <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                                                {product.offer}% off
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleExpand(product.id)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                {expandedProduct === product.id ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                        </div>

                        {expandedProduct === product.id && (
                            <div className="mt-3 pt-3 border-t space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Stock</span>
                                    <span className={`text-sm ${product.stock > 10 ? 'text-green-600' :
                                        product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {product.stock} {product.stock > 0 ? 'in stock' : 'out of stock'}
                                    </span>
                                </div>
                                {product.description && (
                                    <div className="text-sm text-gray-600">
                                        <p className="font-medium text-gray-500">Description</p>
                                        <p>{product.description}</p>
                                    </div>
                                )}
                                <div className="flex space-x-3 pt-2">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                        <FiEdit2 className="mr-1" /> Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        className="text-sm text-red-600 hover:text-red-800 flex items-center"
                                    >
                                        <FiTrash2 className="mr-1" /> Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductList;