var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: String,
    }
);

UserSchema.statics.findAndValidate = async function (name) {
    const user = await this.findOne({ name });
    if (!user) {
        return false;
    }
    return true;
}

/* UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
}) */

//Export model
module.exports = mongoose.model('User', UserSchema);