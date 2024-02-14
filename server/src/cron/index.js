import removeOTPCron from './removeOTPCron';

const startCron = () => {
    console.log('Run cron');
    removeOTPCron();
};

export default startCron;
