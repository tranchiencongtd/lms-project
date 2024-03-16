import { log } from "console";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: "no-reply@tranchiencong.com",
    to: email,
    subject: "congtcdev | 2FA Code",
    html: `<p>Mã 2FA code của bạn: ${token}</p>`
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "no-reply@tranchiencong.com",
    to: email,
    subject: "congtcdev | Thay đổi mật khẩu ",
    html: `<p>Click <a href="${resetLink}">vào đây</a> để đặt lại mật khẩu của bạn.</p>`
  });
};

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "no-reply@tranchiencong.com",
    to: email,
    subject: "congtcdev | Xác nhận email",
    html: `<div>Click <a href="${confirmLink}">vào đây</a> để xác nhận email của bạn.</div>`
  });
};
