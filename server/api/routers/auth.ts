import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { auth } from "@/utils/auth";
const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const authRouter = createTRPCRouter({
  oauth: publicProcedure
    .input(z.object({ provider: z.enum(["google", "github"]) }))
    .mutation(async ({ input, ctx }) => {
      const { provider } = input;
      await auth.api.signInSocial({
        body: {
          provider,
        },
      });
     
    
      return {
        status: 201,
        message: "Account created successfully",
      
      };
    }),

  // Register new user with email/password
  register: publicProcedure
    .input(userAuthSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password, name } = input;

      const exists = await ctx.db.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }


      return {
        status: 201,
        message: "Account created successfully",
      
      };
    }),

  // Login with email/password
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const user = await ctx.db.user.findFirst({
        where: { email },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      if (!user.password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please login with your OAuth provider",
        });
      }

     

      return {
        status: 200,
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }),

 
  // Get user profile
  getProfile: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          accounts: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return {
        ...user,
        hasPassword: !!user.password,
        providers: user.accounts.map((account: any) => account.provider),
      };
    }),

  // Update user profile
  updateProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().optional(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, ...data } = input;

      const user = await ctx.db.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      });

      return {
        status: 200,
        message: "Profile updated successfully",
        user,
      };
    }),

  // Change or set password
  updatePassword: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        currentPassword: z.string().optional(),
        newPassword: z.string().min(8),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, currentPassword, newPassword } = input;

      const user = await ctx.db.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // If user has password, verify current password
    


      return {
        status: 200,
        message: "Password updated successfully",
      };
    }),
});
