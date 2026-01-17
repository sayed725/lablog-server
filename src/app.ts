import express from "express";
import cors from "cors";
import routes from "./routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

async function createAdmin() {
  await auth.api.createUser({
    body: {
      name: "Abu Sayed Khan",
      email: "abusayedkhan170299@gmail.com",
      password: "123456",
      role: "admin",
    },
  });
}
// createAdmin();

app.use("/api/v1", routes);

export default app;
