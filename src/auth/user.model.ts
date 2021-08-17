import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });

UserSchema.pre('save', function (next) {
    let user = this as any;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.checkPassword = async function (attempt) {
    let user = this;
    const match = await bcrypt.compare(attempt, user.password);
    return match;
};

export interface User extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
}
