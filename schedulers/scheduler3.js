// Job to housekeep records older than 180 days

import cron from "node-cron";
import fs from "fs";
import path from "path";

import archive from "../data/archive.json" assert { type: "json" };
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const housekeepingTask = () => {
  console.log("Running housekeeping invoices task: ", new Date());

  try {
    archive.map((item, index) => {
      const presentDate = new Date().getTime();
      const recordDate = new Date(item.date).getTime();
      console.log(
        "The number of days: ",
        Math.floor(presentDate - recordDate) / (1000 * 60 * 60 * 24)
      );

      if (Math.floor(presentDate - recordDate) / (1000 * 60 * 60 * 24) > 180) {
        archive.splice(index, 1);
        fs.writeFileSync(
          path.join(__dirname, "../data/archive.json"),
          JSON.stringify(archive, null, 2),
          "utf-8"
        );
      }
    });
  } catch (error) {
    console.log("Error: ", error);
  }
  console.log("Housekeeping invoices task ended");
};

cron.schedule("* * * * * *", housekeepingTask);
