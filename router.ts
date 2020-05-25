import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get('/api/v1/user', (ctx: any) => {
  ctx.response.body = 'Hello';
});

export default router;