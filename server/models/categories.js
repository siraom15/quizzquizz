const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String
    }
})
mongoose.model("Categories", CategoriesSchema);
