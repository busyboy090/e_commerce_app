import Review from "../models/product/review.model.js";
import User from "../models/user.model.js";
import Product from "../models/product/product.model.js";
import { faker } from "@faker-js/faker";

const reviewSeeder = async () => {
    try {
        const users = await User.findAll({ attributes: ['user_id'] });
        const products = await Product.findAll({ attributes: ['product_id'] });

        const reviews = [];
        // Create 100 reviews

        for (let i = 0; i <= 100; i++) {
            const review = faker.lorem.paragraph(3);
            const rating = faker.number.int({ min: 1, max: 5 });
            const user_id = faker.helpers.arrayElement(users).user_id;
            const product_id = faker.helpers.arrayElement(products).product_id;

            reviews.push({
                review,
                rating,
                user_id,
                product_id
            });
        }

        await Review.bulkCreate(reviews,{ validate: true });

    } catch (error) {
        console.error('Error creating Review', error)
    }
}


// for(let i = 1; i <=63; i++) {
//     console.log(`drop index name_${i} on categories;`);
// }

console.log( ('20.0').split('.')[1] )
