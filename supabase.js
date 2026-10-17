
const SUPABASE_URL = "https://cfiyifjfofjcundilvzs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_XrJVfFWn4NLR-JAUnvYVtQ_-z4nnPRN";

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

window.db = db;

console.log("Supabase client initialized");
