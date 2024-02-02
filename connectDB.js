import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fflsbybjerkkmwxntznk.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbHNieWJqZXJra213eG50em5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NDQwNjgsImV4cCI6MjAyMjQyMDA2OH0.mKy3AMz3O9TFsNvc3fbDmN9x4eGBhmCxhlOYkVgf0RI";
const supabase = createClient(supabaseUrl, supabaseKey);
