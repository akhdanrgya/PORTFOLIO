import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
  console.error("Gagal: NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diset di .env.local dengan benar.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Generating hash for password...");
  const hash = await bcrypt.hash("Ayahtoni74", 12);

  console.log("Inserting admin 'akhdanrgya' to Supabase...");
  const { error } = await supabase.from("admins").insert([
    {
      username: "akhdanrgya",
      password_hash: hash
    }
  ]);

  if (error) {
    if (error.code === '23505') {
      console.log("✅ Admin 'akhdanrgya' sudah ada di database.");
    } else {
      console.error("❌ Error Supabase:", error.message);
    }
  } else {
    console.log("✅ Admin berhasil dibuat!");
    console.log("Username: akhdanrya");
    console.log("Password: (sesuai request: Ayahtoni74)");
  }
}

run();
