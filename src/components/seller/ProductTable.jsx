import React from 'react';

const ProductTable = ({ products }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Product Details</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="text-gray-600 border-b">
                        <tr>
                            <th className="p-2">Product</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Sold</th>
                            <th className="p-2">In Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-2">{prod.name}</td>
                                <td className="p-2">₹{prod.price}</td>
                                <td className="p-2">{prod.sold}</td>
                                <td className="p-2">{prod.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;
