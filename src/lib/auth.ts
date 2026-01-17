
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma/client";
import { prisma } from "./prisma";
import { admin, twoFactor } from "better-auth/plugins";
// If your Prisma file is located elsewhere, you can change the path
import { Resend } from 'resend';
import { adminRole, userRole } from "./permissions";

const resend = new Resend('re_NnmhaRfH_QGNHCu4P6SB2Qn1oKSDeTKte');

export const auth = betterAuth({
    appName: "LabLog",
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),

    trustedOrigins: [process.env.FRONTEND_URL!],

    emailAndPassword:{
        enabled: true,
        minPasswordLength: 6,
    },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            redirectURI: `${process.env.FRONTEND_URL}/api/auth/callback/github`,
        }
    },

    plugins: [
        admin({
      adminRoles: ["admin", "user"],
      defaultRole: "user",
      roles: {
        admin: adminRole,
        user: userRole,
      },
    }),
        twoFactor({
      otpOptions: {
        period: 2,
        async sendOTP({ user, otp }, ctx) {
        //   console.log({ user, otp });

          await resend.emails.send({
            from: "LagLog <onboarding@resend.dev>",
            to: user.email,
            subject: "Two factor authentication",
            html: `<p>Your OTP is <b>${otp}</b></p>`,
          });
        },
      },
    }),
    ]

    
});