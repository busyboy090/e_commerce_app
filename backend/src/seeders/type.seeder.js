import Type from '../models/product/type.model.js';
import { faker } from '@faker-js/faker';

const Typeseeder = async () => {
    const types = [
        'clothing',
        'waist',
        'shoe_us',
        'shoe_eu',
        'accessory',
        'bedding'
    ];

    try {

        for(let i = 0; i <= 10; i++) {
            const type = faker.helpers.arrayElement(types);

            // check if the size exist 
            const existingType = await Type.findOne({ where: { type }});

            if(!existingType) {
                await Type.create({ type });
            }
        }

    } catch (error) {
        console.log('Error seeding size types', error);
    }

}

Typeseeder()