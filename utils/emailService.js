import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

const sendRenewalEmail = async (
	userEmail,
	userName,
	subscriptionName,
	renewalDate,
	daysLeft,
	status
) => {
	const emailTemplate = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 30px; background-color: #ffffff; color: #333;">
    <h2 style="color: #007BFF; margin-top: 0;">📅 Subscription Renewal Reminder</h2>

    <p style="font-size: 16px;">Hi <strong>${userName}</strong>,</p>

    <p style="font-size: 16px;">Just a quick reminder that your <strong>${subscriptionName}</strong> subscription will renew in <strong>${daysLeft}</strong> days.</p>

    <div style="background-color: #f1f5ff; padding: 20px; border-left: 5px solid #007BFF; margin: 20px 0; border-radius: 5px;">
      <p style="margin: 0; font-size: 16px;"><strong>Renewal Date:</strong> ${renewalDate.toDateString()}</p>
      <p style="margin: 5px 0 0 0; font-size: 16px;"><strong>Status:</strong> ${status}</p>
    </div>

    <p style="font-size: 15px;">You can manage or cancel your subscription any time from your dashboard.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://your-subscription-site.com/manage" style="background-color: #007BFF; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-size: 16px; display: inline-block;">
        Manage Subscription
      </a>
    </div>

    <p style="font-size: 14px; color: #666;">If you have any questions or need help, feel free to reach out to our support team.</p>

    <p style="margin-top: 40px; font-size: 14px;">Best regards, <br/><strong>Your Subscription Team</strong></p>

    <hr style="margin-top: 40px; border: none; border-top: 1px solid #eee;" />
    <p style="font-size: 12px; color: #999; text-align: center;">
      You are receiving this email because you have an active subscription.
    </p>
  </div>
`;

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: userEmail,
		subject: "Upcoming Subscription Renewal Reminder",
		html: emailTemplate,
	};

	await transporter.sendMail(mailOptions);
	console.log(`Renewal email sent to ${userEmail}`);
};

export default sendRenewalEmail;
