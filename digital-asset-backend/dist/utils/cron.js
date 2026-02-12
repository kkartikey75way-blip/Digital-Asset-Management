"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCronJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const reminder_service_1 = require("../services/reminder.service");
const startCronJobs = () => {
    node_cron_1.default.schedule("0 0 * * *", async () => {
        await (0, reminder_service_1.checkExpiringAssets)();
    });
};
exports.startCronJobs = startCronJobs;
