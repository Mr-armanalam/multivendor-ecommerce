import { authRouter } from "@/app/modules/auth/server/procedures";
import { createTRPCRouter } from "../init";
import { categoriesRouter } from "@/app/modules/categories/server/procedure";
export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
