import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const threadsRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				title: z.string().min(1),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { title } = input;
			const userId = ctx.session.user.id;

			const thread = await ctx.db.thread.create({
				data: {
					title,
					userId,
				},
			});

			return thread;
		}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const threads = await ctx.db.thread.findMany({
			where: {
				userId: ctx.session.user.id,
			},
			select: {
				id: true,
				title: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return threads;
	}),

	getById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const thread = await ctx.db.thread.findUnique({
				where: {
					id: input.id,
					userId: ctx.session.user.id,
				},
			});

			if (!thread) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Thread not found',
				});
			}

			return thread;
		}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().min(1),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { id, title } = input;

			const thread = await ctx.db.thread.findUnique({
				where: {
					id,
					userId: ctx.session.user.id,
				},
			});

			if (!thread) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Thread not found',
				});
			}

			const updatedThread = await ctx.db.thread.update({
				where: { id },
				data: {
					title,
				},
			});

			return updatedThread;
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const thread = await ctx.db.thread.findUnique({
				where: {
					id: input.id,
					userId: ctx.session.user.id,
				},
			});

			if (!thread) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Thread not found',
				});
			}

			await ctx.db.thread.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),
});
