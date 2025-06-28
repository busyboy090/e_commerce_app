import User from "../models/user.model.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const userSeeder = async () => {
    const users = [];

    for (let i = 0; i <= 10; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email(firstName, lastName).toLowerCase();
        let password = faker.internet.password(10, true);
        // Hash the password using bcrypt
        password = await bcrypt.hash(password, 10);
        const phone = faker.phone.number({ style: 'national' });
        const picture = faker.image.avatar();
        const email_verified = true;
        const role = 'customer'
        const country_id = 164

        users.push({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            phone,
            picture,
            email_verified,
            role,
            country_id
        });
    }

    await User.bulkCreate(users, { validate: true });
}

userSeeder()