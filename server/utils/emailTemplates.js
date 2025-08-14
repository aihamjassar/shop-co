exports.resetPasswordTemplate = ({
  username,
  resetURL,
  expiresInMinutes = 10,
}) => {
  const subject = "Reset your password";
  const text = `Hi ${username || ""},
We received a request to reset your password.
Click the link below to set a new password (valid for ${expiresInMinutes} minutes):
${resetURL}

If you didn’t request this, please ignore this email.`;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;line-height:1.6;">
    <h2 style="margin:0 0 16px;color:#111;">Reset your password</h2>
    <p style="margin:0 0 12px;">Hi ${username || "there"},</p>
    <p style="margin:0 0 12px;">
      We received a request to reset your password. Click the button below to set a new password.
      This link is valid for <strong>${expiresInMinutes} minutes</strong>.
    </p>
    <p style="margin:20px 0;">
      <a href="${resetURL}" 
         style="display:inline-block;padding:12px 18px;text-decoration:none;border-radius:8px;
                background:#0d6efd;color:#fff;" target="_blank">
        Reset Password
      </a>
    </p>
    <p style="margin:0 0 12px;">Or copy and paste this URL in your browser:</p>
    <p style="word-break:break-all;color:#0d6efd;">${resetURL}</p>
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
    <p style="font-size:12px;color:#666;margin:0;">If you didn’t request this, you can safely ignore this email.</p>
  </div>`;

  return { subject, text, html };
};
