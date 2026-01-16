import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT;

async function server() {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

server();