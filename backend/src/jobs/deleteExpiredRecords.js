const cron = require('node-cron');
const { Op } = require('sequelize');
const { Session, Otp } = require('../models/index.js');

const deleteExpiredRecords = () => {
    cron.schedule(' * * * * *', async () => {
        const now = new Date();

        await Session.destroy({
            where: {
                deleteAt: {
                    [Op.lte]: now
                }
            }
        })

        await Otp.destroy({
            where: {
                used: true
            }
        })
    })
}

module.exports = deleteExpiredRecords;