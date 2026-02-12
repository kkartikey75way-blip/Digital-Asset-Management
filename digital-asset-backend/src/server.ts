import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { startCronJobs } from "./utils/cron";


const startServer = async () => {
    await connectDB();
    startCronJobs();

    app.listen(env.port, () => {
        console.log(`Server running on port ${env.port}`);
    });
};

startServer();
