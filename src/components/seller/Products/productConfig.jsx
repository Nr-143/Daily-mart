export const categories = {
    fruits: {
        label: 'Fruits',
        icon: '🍎'
    },
    vegetables: {
        label: 'Vegetables',
        icon: '🥦'
    },
    dairy: {
        label: 'Dairy Products',
        icon: '🥛'
    },
    // Add more categories as needed
};

export const categorySpecs = {
    fruits: {
        defaultSpecs: {
            variety: '',
            origin: '',
            organic: false,
            weight_per_unit: ''
        },
        fields: [
            {
                name: 'variety',
                label: 'Variety',
                type: 'text',
                required: true,
                placeholder: 'e.g., Fuji, Gala'
            },
            {
                name: 'origin',
                label: 'Origin',
                type: 'text',
                required: false,
                placeholder: 'Country/Region of origin'
            },
            {
                name: 'organic',
                label: 'Organic',
                type: 'select',
                options: [
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' }
                ]
            },
            {
                name: 'weight_per_unit',
                label: 'Weight per Unit (g)',
                type: 'number',
                placeholder: 'Average weight per fruit'
            }
        ]
    },
    vegetables: {
        defaultSpecs: {
            type: '',
            freshness: '',
            organic: false,
            package_size: ''
        },
        fields: [
            // Similar field definitions for vegetables
        ]
    },
    // Add specifications for other categories
};