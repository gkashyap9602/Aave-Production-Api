import { Schema, model } from 'mongoose';

const AdminSchema = new Schema(
    {
        email: { type: String, required: true, minLength: 4, maxLength: 35, trim: true, unique: true },
        userName: { type: String, required: false, minLength: 4, maxLength: 20 },
        password: { type: String, required: true, minLength: 4, maxLength: 80, trim: true },
        profile: { type: String, required:false,default:null},
        isBlocked: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false }
    }, { timestamps: true, versionKey: false }
);

export default model('admins', AdminSchema)