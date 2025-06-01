import Color from "../models/product/color.model.js";
import { faker } from "@faker-js/faker";
import { Op } from "sequelize";

const colorSeeder = async () => {

    try {

        for(let i = 0; i <=10; i++) {
            const name = faker.color.human()
            const hex_code = faker.color.rgb({ format: 'hex', casing: 'lower'})

            // check if the color exist already
            const color = await Color.findOne({ where: { 
                [Op.or]: [
                    {name},
                    {hex_code}
                ]
            }})


            // create if it does not exist
            if(!color) {
                await Color.create({
                    name,
                    hex_code
                })
            }
        }

    } catch (error) {
        console.log('Error creating color ',error);
    }

}

colorSeeder()