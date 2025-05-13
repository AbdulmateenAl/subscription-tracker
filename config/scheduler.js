import cron from "node-cron";
import { checkRenewalsAndSendEmails } from "../controllers/subscription.controller.js";

// Run the job every day at 8 AM
cron.schedule("0 8 * * *", checkRenewalsAndSendEmails);
console.log("Subscription renewal email scheduler started.");