const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.get("/", (req, res) => {
  res.json({ status: "App4Match backend online" });
});

app.post("/ideas", async (req, res) => {
  const { title, text } = req.body;

  const { data, error } = await supabase
    .from("app4match_ideas")
    .insert([
      {
        title: title || "App4Match idee",
        raw_text: text,
        status: "nieuw"
      }
    ])
    .select();

  if (error) {
    return res.status(500).json({ error });
  }

  res.json({ success: true, data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App4Match backend draait op poort ${PORT}`);
});
