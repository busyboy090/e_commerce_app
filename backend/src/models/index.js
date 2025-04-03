import User from "./user.model.js";
import Otp from './otp.model.js';

User.hasOne(Otp, { foreignKey: 'userId' });
Otp.belongsTo(User, { foreignKey: 'userId' });
