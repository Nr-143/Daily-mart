import React, { useState } from 'react';
import EditProductModal from './EditProductModal';
import ProductList from './ProductList';
import ProductActions from './ProductActions';

const mockProducts = [
    {
        id: 1,
        name: 'Organic Apples',
        price: 50,
        stock: 20,
        offer: 10,
        category: 'fruits',
        description: 'Fresh organic apples from local farms',
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb'
    },
    {
        id: 2,
        name: 'Fresh Milk',
        price: 30,
        stock: 5,
        offer: 0,
        category: 'dairy',
        description: 'Pure cow milk, pasteurized',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150'
    }
];

const AddedProductsList = () => {
    const [editingProduct, setEditingProduct] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [products, setProducts] = useState(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSave = (updatedProduct) => {
        if (editingProduct) {
            setProducts(products.map(p =>
                p.id === editingProduct.id ? { ...p, ...updatedProduct } : p
            ));
        } else {
            setProducts([...products, { ...updatedProduct, id: Date.now() }]);
        }
        setEditingProduct(null);
        setIsAdding(false);
    };

    const handleDelete = (productId) => {
        setProducts(products.filter(p => p.id !== productId));
    };

    return (
        <div className="mt-6">
            <ProductActions
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                onAddProduct={() => setIsAdding(true)}
            />

            <ProductList
                products={products}
                searchTerm={searchTerm}
                onEdit={setEditingProduct}
                onDelete={handleDelete}
            />

            {(editingProduct || isAdding) && (
                <EditProductModal
                    product={editingProduct || {}}
                    onClose={() => {
                        setEditingProduct(null);
                        setIsAdding(false);
                    }}
                    onSave={handleSave}
                    mode={isAdding ? 'add' : 'edit'}
                />
            )}
        </div>
    );
};

export default AddedProductsList;