import { faker } from '@faker-js/faker';
import Product from '../models/product/product.model.js';
import Category from '../models/product/category.model.js';
import Brand from '../models/product/brand.model.js';
import Type from '../models/product/type.model.js';
import Color from '../models/product/color.model.js';
import ProductColor from '../models/product/product-color.model.js';
import Size from '../models/product/size.model.js';
import ProductSize from '../models/product/product-size.model.js';
import ProductVariant from '../models/product/product-variant.model.js';

const productSeeder = async () => {
    try {
        let category = await Category.findAll();
        let brand = await Brand.findAll();
        let type = await Type.findAll();

        for(let i = 0; i <= 10; i++) {
            
            const name = faker.commerce.productName();
            const description = faker.commerce.productDescription();
            const category_id = faker.helpers.arrayElement(category).category_id;
            const brand_id = faker.helpers.arrayElement(brand).brand_id;
            const type_id = faker.helpers.arrayElement(type).type_id;

            let product = {
                name,
                description,
                category_id,
                brand_id,
                type_id,
            };

            product = await Product.create(product);

            const productColors = [];
            const productVariants = [];

            for(let i = 0; i <= 4; i++) {
                const colors = await Color.findAll();

                const color_id = faker.helpers.arrayElement(colors).color_id;

                const image = faker.image.url();
                const product_id = product.product_id;

                productColors.push({
                    product_id,
                    color_id,
                    image
                })

                const sizes = await Size.findAll();

                const price = faker.commerce.price();
                const stock = faker.number.int({max: 100});
                const sku = faker.word.words();
                const size_id = faker.helpers.arrayElement(sizes).size_id;

                productVariants.push({
                    product_id,
                    color_id,
                    size_id,
                    price,
                    stock,
                    sku,
                })

                await ProductSize.create({
                    size_id,
                    product_id
                })

            }

            await ProductColor.bulkCreate(productColors);
            await ProductVariant.bulkCreate(productVariants)
            
            console.log('Product created successfully');
        }


    } catch (error) {
        console.log('Error creating product', error)
    }
}

productSeeder()