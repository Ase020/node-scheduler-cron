// Job to check the status of invoices and if status is paid, it is archived.

import cron from "node-cron";
import fs from "fs";
import path from "path";

import invoices from "../data/invoice.json" assert { type: "json" };
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const archiveInvoicesTask = () => {
  console.log("Running archive invoices task: ", new Date());

  try {
    const paidInvoices = invoices.filter(
      (invoice) => invoice.status === "paid"
    );

    if (paidInvoices.length > 0) {
      paidInvoices.forEach((invoice) => {
        invoices.splice(
          invoices.findIndex((i) => i.status === invoice.status),
          1
        );
      });

      fs.writeFileSync(
        path.join(__dirname, "../data/invoice.json"),
        JSON.stringify(invoices, null, 2),
        "utf-8"
      );

      fs.writeFileSync(
        path.join(__dirname, "../data/archive.json"),
        JSON.stringify(paidInvoices, null, 2),
        "utf-8"
      );
    }
  } catch (error) {
    console.error("Error: ", error);
  }

  console.log("Archive invoices task ended");
};

cron.schedule("*/30 * * * * *", archiveInvoicesTask);
