import express from "express";
import userRoute from "./userRoute.js"
import bookingRoutes from "./bookingRoutes.js";
import carRoutes from "./carRoutes.js";
import cardRoutes from "./cardRoutes.js ";
import driverRoutes from "./driverRoutes.js"
import fuelingRoutes from "./fuelingRoutes.js";
import maintenanceRoutes from "./maintenanceRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import schedule from 'node-schedule';
import {sendPreDueDateReminder ,sendDueDateAlert } from "../Controller/notificationController.js";

const app = express.Router();

app.use("/user",userRoute)
app.use("/cars",carRoutes);
app.use("/bookings",bookingRoutes);
app.use("/cards",cardRoutes);
app.use("/drivers",driverRoutes);
app.use("/fuelings",fuelingRoutes);
app.use("/maintenances",maintenanceRoutes);
app.use("/notifications",notificationRoutes)

// Schedule due date alerts to run every day at 8 AM
schedule.scheduleJob('0 8 * * *', async () => {
    try {
      await sendPreDueDateReminder();
    } catch (error) {
      console.error('Error sending pre-due date reminders:', error);
    }
  });
  
  // Schedule due date alerts to run every day at 8 AM
  schedule.scheduleJob('0 8 * * *', async () => {
    try {
      await sendDueDateAlert();
    } catch (error) {
      console.error('Error sending due date alerts:', error);
    }
  });

export default app;