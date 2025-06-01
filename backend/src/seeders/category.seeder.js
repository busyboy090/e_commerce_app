import Category from "../models/product/category.model.js";
import { faker } from "@faker-js/faker";

const categorySeeder = async () => {
    try {
        for(let i = 0; i <= 10; i++) {
            const category = faker.commerce.department();

            // Check if the category already exists
            const existingCategory = await Category.findOne( { where: { name: category } } );
            
            // If it doesn't exist, create it
            if (!existingCategory) {
                await Category.create({ name: category });
            }
        }

    } catch (error) {
        console.error("Error seeding categories:", error);
    }
}

categorySeeder();