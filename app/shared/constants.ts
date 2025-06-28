import { env } from "~/env";

export const TARGET_URL = import.meta.env.DEV ? "/api" : env.VITE_API_URL;
