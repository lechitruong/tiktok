import removeOTPCron from './removeOTPCron';
import updateVideoUrlCron from './updateVideoUrlCron';
const startCron = () => {
    removeOTPCron();
    updateVideoUrlCron();
};

export default startCron;
