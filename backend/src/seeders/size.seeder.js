import Size from "../models/product/size.model.js";
import Type from "../models/product/type.model.js";
import { faker } from "@faker-js/faker";

const sizeSeeder = async () => {
  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const types = [
    "clothing",
    "waist",
    "shoe_us",
    "shoe_eu",
    "accessory",
    "bedding",
  ];

  try {
    for (let i = 0; i <= 10; i++) {
      const size = faker.helpers.arrayElement(sizes);
      const type = faker.helpers.arrayElement(types);

      // check if the size exist
      const existingSize = await Size.findOne({ where: { size } });
      const existingType = await Type.findOne({ where: { type }});

      if (!existingSize && existingType) {
        await Size.create({ size, type_id: existingType.type_id});
      }
      
    }
  } catch (error) {
    console.log("Error seeding size", error);
  }
};

sizeSeeder();
