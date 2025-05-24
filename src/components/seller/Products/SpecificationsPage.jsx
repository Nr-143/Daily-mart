import React from 'react';
import { categorySpecs } from './productConfig';

const SpecificationsPage = ({ formData, setFormData }) => {
    const handleSpecChange = (specName, value) => {
        setFormData(prev => ({
            ...prev,
            specifications: {
                ...prev.specifications,
                [specName]: value
            }
        }));
    };

    return (
        <>
            <h4 className="text-md font-medium mb-4">Specifications</h4>
            <div className="space-y-4">
                {categorySpecs[formData.category]?.fields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && '*'}
                        </label>
                        {field.type === 'select' ? (
                            <select
                                value={formData.specifications[field.name] || ''}
                                onChange={(e) => handleSpecChange(field.name, e.target.value)}
                                className="w-full border p-2 rounded"
                                required={field.required}
                            >
                                <option value="">Select {field.label}</option>
                                {field.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                value={formData.specifications[field.name] || ''}
                                onChange={(e) => handleSpecChange(field.name, e.target.value)}
                                className="w-full border p-2 rounded"
                                required={field.required}
                                placeholder={field.placeholder}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default SpecificationsPage;