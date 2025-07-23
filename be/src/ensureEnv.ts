import dotenv from "dotenv";

let dotenvConfigCalled = false;

// Ensure dotenv.config() is only called once;
// this module is needed because build process can change the order of modules in the output file
// and we have to call this method in several files but dotenv.config() should be called once.
export function ensureEnvLoaded() {
  if (dotenvConfigCalled) {
    return;
  }

  dotenv.config();
  dotenvConfigCalled = true;

  if (!process.env.MONGODB_URI || !process.env.SESSION_SECRET) {
    console.error("❌ MONGODB_URI and SESSION_SECRET must be set in the environment variables.");
    process.exit(1);
  }
}
