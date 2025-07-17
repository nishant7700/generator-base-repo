import dotenv from "dotenv";
console.log("Loading environment variables...", process.env.NODE_ENV);

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

export default dotenv;
