import cron from 'node-cron';
import { Op } from 'sequelize';
import * as otpServices from '../services/otp';

const removeOTPCron = () => {
    cron.schedule('* * * * * *', async function () {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        await otpServices.deleteOTP({
            createdAt: {
                [Op.lt]: today,
            },
        });
    });
    console.log('Remove otp expired');
};

export default removeOTPCron;
