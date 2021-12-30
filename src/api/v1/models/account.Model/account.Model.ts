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
  Permission?: string;
  CodeClass?: string;
  Status?: boolean;
  Image?: string;
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
  Permission: String,
  CodeClass: String,
  Status: Boolean,
  Image: String,
});

export const AccountModel = model<Account>("users", AccountSchema);
