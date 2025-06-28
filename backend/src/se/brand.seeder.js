import Brand from "../models/product/brand.model.js";
import { faker } from "@faker-js/faker";

const brandSeeder = async () => {

    try {

        for(let i = 0; i <= 10; i++) {
            const name = faker.company.name();

            const brand = await Brand.findOne({ where: { name }})

            if(!brand) {
                await Brand.create({ name });
            }
        }

    } catch (error) {
        console.error('Error creating Brand', error)
    }

}

brandSeeder();