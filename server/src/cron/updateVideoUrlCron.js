import cron from 'node-cron';
import { Op } from 'sequelize';
import * as tmpPostServices from '../services/tmpPost';
import * as postServices from '../services/post';
const updateVideoUrlCron = () => {
    cron.schedule('0 0 * * * *', async function () {
        console.log('Update video url cron');
        let postOlder1Hour = await tmpPostServices.getTmpPostOver1Hour();
        postOlder1Hour = postOlder1Hour.postOlderThan1Hour;
        while (postOlder1Hour.length > 0) {
            for (const tmpPost of postOlder1Hour) {
                await postServices.updatePost(tmpPost.postId, {
                    videoId: tmpPost.videoId,
                    videoUrl: tmpPost.videoUrl,
                });
                await tmpPostServices.remove(tmpPost.id);
            }
            postOlder1Hour = await tmpPostServices.getTmpPostOver1Hour();
            postOlder1Hour = postOlder1Hour.postOlderThan1Hour;
        }
    });
};

export default updateVideoUrlCron;
