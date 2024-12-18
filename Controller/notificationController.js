import db from "../Config/db.js";
import catchAsync from '../utils/catchAsync.js';
import { sendEmail } from "../Config/email.js";
export const sendPreDueDateReminder = catchAsync(async (req, res, next) => {
    const upcomingDueDate = new Date();
    upcomingDueDate.setDate(upcomingDueDate.getDate() + 2);
  
    const cards = await db('cards')
      .where('due_date', '<=', upcomingDueDate)
      .where('status', 'pending');
  
    for (const card of cards) {
      await sendEmail(
        'user@example.com',
        'Upcoming Payment Due Reminder',
        `Dear ${card.holder_name}, your payment for ${card.bank_name} card is due on ${card.due_date}. Please ensure timely payment to avoid penalties.`
      );
    }
  
    res.status(200).json({
      status: 'success',
      message: 'Pre-due date reminders sent successfully',
    });
  });
  
  export const sendDueDateAlert = catchAsync(async (req, res, next) => {
    const today = new Date();
  
    const cards = await db('cards')
      .where('due_date', today)
      .where('status', 'pending');
  
    for (const card of cards) {
      await sendEmail(
        'user@example.com', 
        'Payment Due Alert',
        `Dear ${card.holder_name}, today is the due date for your ${card.bank_name} card payment. Please make your payment to avoid late fees.`
      );
    }
  
    res.status(200).json({
      status: 'success',
      message: 'Due date alerts sent successfully',
    });
  });