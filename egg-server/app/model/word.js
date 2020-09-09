module.exports = app => {
    const mongoose = app.mongoose
    const WordSchema = new mongoose.Schema({
        common: { type: String,  required: true },
        special: { type: String, required: true },
        good: { type: Number, default:0},
        bad: { type: Number, default:0},
        author: { type: String, default:'系统管理员'},
        mobile: { type: Number, default:'11111111111'},
        createdAt: { type: Date, default: Date.now }
    })
    return mongoose.model('Word', WordSchema)
}