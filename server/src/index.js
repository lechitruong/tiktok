startCron();
dotenv.config();
require('./config/oauth/passport');
import client from './config/db/redis';
global._basedir = __dirname;
const { Server } = require('socket.io');
const handleSocket = require('./socket');
getConnection();
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
const io = new Server(server, {
    allowEIO3: true,
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

route(app);

handleSocket(io);
