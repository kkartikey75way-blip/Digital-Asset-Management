import Asset from "../models/asset.model";
import User, { IUser } from "../models/user.model";
import { sendEmail } from "./email.service";

export const checkExpiringAssets = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(23, 59, 59, 999);

    const expiringAssets = await Asset.find({
        expiryDate: {
            $gte: today,
            $lte: nextWeek
        },
        isDeleted: false,
    }).populate("owner");

    for (const asset of expiringAssets) {
        const owner = asset.owner as unknown as IUser;
        if (!owner || !owner.email) continue;

        const expiry = new Date(asset.expiryDate);
        expiry.setHours(0, 0, 0, 0);

        const isToday = expiry.getTime() === today.getTime();
        const subject = isToday
            ? `🚨 URGENT: ${asset.name} Expires TODAY`
            : `⚠️ Reminder: ${asset.name} Expiring Soon`;

        const message = isToday
            ? `<h3>ACTION REQUIRED: ${asset.name} expires today.</h3>
               <p>The license/domain for <b>${asset.name}</b> reaching its expiration date today (${asset.expiryDate.toLocaleDateString()}). Please renew immediately to avoid service disruption.</p>`
            : `<h3>${asset.name} is expiring in the next 7 days.</h3>
               <p><b>Expiry Date:</b> ${asset.expiryDate.toLocaleDateString()}</p>
               <p>Please review and initiate the renewal process if needed.</p>`;

        await sendEmail(owner.email, subject, message);
    }
};
