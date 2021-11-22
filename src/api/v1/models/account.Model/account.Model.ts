import { Schema, model } from "mongoose";

interface Account {
  Email: string;
  Name: string;
  Password: string;
  Phone?: string;
  MSSV?: string;
  Year?: string;
  Introduce?: string;
  Birth?: string;
  Gender?: string;
  Permission?: number;
  CodeClass?: string;
  Status?: boolean;
}

const AccountSchema = new Schema<Account>({
  Email: { type: String, require: true },
  Name: { type: String, require: true },
  Password: { type: String, require: true },
  Phone: String,
  MSSV: String,
  Year: String,
  Introduce: String,
  Birth: String,
  Gender: String,
  Permission: Number,
  CodeClass: String,
  Status: Boolean,
});

export const AccountModel = model<Account>("users", AccountSchema);
