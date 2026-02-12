import cron from "node-cron";
import { checkExpiringAssets } from "../services/reminder.service";

export const startCronJobs = () => {
    cron.schedule("0 0 * * *", async () => {
        await checkExpiringAssets();
    });
};
