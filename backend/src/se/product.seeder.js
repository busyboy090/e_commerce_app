const { faker } = require('@faker-js/faker');
const { Category, Brand, Type, Size, Color } = require('../models/index.js');
const fs = require('fs');

const productSeeder = async () => {
    let category = await Category.findAll();
    let brand = await Brand.findAll();
    let type = await Type.findAll();
    const products = []


    for(let i = 0; i <= 10; i++) {
        const name = faker.commerce.productName();
        const description = faker.commerce.productDescription();
        const category_id = faker.helpers.arrayElement(category).category_id;
        const brand_id = faker.helpers.arrayElement(brand).brand_id;
        const type_id = faker.helpers.arrayElement(type).type_id;

        const productImages = [];
        const productVariants = [];

        for(let j = 0; j <= 4; j++) {
            const colors = await Color.findAll();

            const color_id = faker.helpers.arrayElement(colors).color_id;

            const image = faker.image.url();

            if(i === 2) {
                productImages.push({
                    image,
                    main_image: true
                })
            } else {
                productImages.push({
                    image,
                    main_image: false
                })
            }

            const sizes = await Size.findAll();

            const price = faker.commerce.price();
            const stock = faker.number.int({max: 100});
            const sku = faker.word.words();
            const size_id = faker.helpers.arrayElement(sizes).size_id;
            productVariants.push({
                color_id,
                size_id,
                price,
                stock,
                sku,
                disount_price: null,
                discount_percent: null,
                image
            })
        }

        const existingProduct = products.filter(p => p.name === name);

        if(existingProduct.length > 0) continue;

        products.push({
            name,
            description,
            category_id,
            brand_id,
            type_id,
            vendor_id: 1,
            is_approved: true,
            approved_by: 1,
            approved_at: new Date(),
            productVariants,
            productImages
        })
    }


    await fs.writeFileSync('src/data/products.json', JSON.stringify(products, null, 2), 'utf-8')

}

productSeeder()