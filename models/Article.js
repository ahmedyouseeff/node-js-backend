const mongoose = require('mongoose');

/* Building Schema */
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    body: String
});

// Create Model -> Name of the table and data formate
// So in mongo database you will have a collection called articles (It ends with s)
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;