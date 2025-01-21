import mongoose, { Document } from "mongoose";
import { ProviderEnum, ProviderEnumType } from "../enums/accountProviderEnum";

export interface AccountDocument extends Document {
  provider: ProviderEnumType;
  providerId: string; // stores email, googleId, facebookId as the providerId
  userId: mongoose.Schema.Types.ObjectId;
  refreshToken: string | null;
  tokenExpiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema = new mongoose.Schema<AccountDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    tokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.refreshToken;
      },
    },
  }
);

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);
export default AccountModel;
