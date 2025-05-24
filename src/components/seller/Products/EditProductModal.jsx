import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import BasicInfoPage from './BasicInfoPage';
import ImagesPage from './ImagesPage';
import ShippingWarrantyPage from './ShippingWarrantyPage';
import SpecificationsPage from './SpecificationsPage';
import ReviewPage from './ReviewPage';
import { categorySpecs } from './productConfig';

const EditProductModal = ({ product, onClose, onSave, mode = 'edit' }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        price: product?.price || '',
        stock: product?.stock || '',
        offer: product?.offer || 0,
        offerEndDate: product?.offerEndDate || '',
        category: product?.category || 'fruits',
        description: product?.description || '',
        images: product?.images || [],
        warranty: product?.warranty || {
            type: 'none',
            duration: 0,
            period: 'months'
        },
        shipping: {
            freeDelivery: product?.shipping?.freeDelivery || false,
            cashOnDelivery: product?.shipping?.cashOnDelivery || true,
            replacementPolicy: product?.shipping?.replacementPolicy || '7-days'
        },
        specifications: product?.specifications || {},
        highlights: product?.highlights || []
    });

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5; // Increased to 5 to include preview page

    useEffect(() => {
        if (formData.category && categorySpecs[formData.category]) {
            setFormData(prev => ({
                ...prev,
                specifications: {
                    ...categorySpecs[formData.category].defaultSpecs,
                    ...prev.specifications
                }
            }));
        }
    }, [formData.category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        } else {
            onSave(formData);
            onClose();
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 1:
                return <BasicInfoPage formData={formData} setFormData={setFormData} />;
            case 2:
                return <ImagesPage formData={formData} setFormData={setFormData} />;
            case 3:
                return <ShippingWarrantyPage formData={formData} setFormData={setFormData} />;
            case 4:
                return (
                    <SpecificationsPage
                        formData={formData}
                        setFormData={setFormData}
                        specsConfig={categorySpecs[formData.category]?.fields || []}
                    />
                );
            case 5:
                return <ReviewPage formData={formData} />;
            default:
                return <ReviewPage formData={formData} />;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {mode === 'add' ? 'Add New Product' : `Edit ${product.name}`}
                        </h3>
                        <div className="flex items-center mt-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <React.Fragment key={i}>
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs 
                                            ${currentPage > i + 1 ? 'bg-green-500 text-white' :
                                                currentPage === i + 1 ? 'bg-blue-500 text-white' :
                                                    'bg-gray-200 text-gray-600'}`}
                                    >
                                        {i + 1}
                                    </div>
                                    {i < totalPages - 1 && (
                                        <div className={`w-8 h-0.5 mx-1 ${currentPage > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {renderPage()}

                    <div className="flex justify-between pt-6 border-t">
                        <button
                            type="button"
                            onClick={() => currentPage > 1 ? setCurrentPage(prev => prev - 1) : onClose()}
                            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            {currentPage > 1 ? 'Back' : 'Cancel'}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {currentPage < totalPages - 1 ? 'Next' :
                                currentPage === totalPages - 1 ? 'Review Order' :
                                    mode === 'add' ? 'Add Product' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;