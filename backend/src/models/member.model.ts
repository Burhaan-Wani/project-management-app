import mongoose, { Document } from "mongoose";
import { RoleDocument } from "./rolesPermission.model";

export interface MemberDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  workspaceId: mongoose.Schema.Types.ObjectId;
  role: RoleDocument;
  joinedAt: Date;
}

const memberSchema = new mongoose.Schema<MemberDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
});

const MemberModel = mongoose.model<MemberDocument>("Member", memberSchema);

export default MemberModel;
