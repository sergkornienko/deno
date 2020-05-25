import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const PORT = 8000;
const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

router.get('/api/v1/user', (ctx: any) => {
  ctx.response.body = 'Hello';
});
console.log('Server running on port:', PORT);

await app.listen({ port: PORT });