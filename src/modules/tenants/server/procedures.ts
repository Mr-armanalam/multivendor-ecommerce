import { Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const tenantsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {

      const tenantsData = await ctx.db.find({
        collection: "tenants",
        depth: 1,
        where: {
          slug: {
            equals: input.slug,
          }
        },
        limit: 1,
        pagination: false,
      });

      const tenant = tenantsData.docs[0];

      if (!tenant) {
        throw new TRPCError({code: 'NOT_FOUND', message: `Tenant with slug ${input.slug} not found`});
      }

      // await new Promise(resolve => setTimeout(resolve, 1000)); // artificial time a delayl

      return tenant as Tenant & {image?: {url: string} | null};
    }),
});
