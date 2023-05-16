const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: '', required: true },
    description: { type: String, default: '', maxLength: 600 },
    image: { type: String, default: '', maxLength: 255 },
    videoId: { type: String, default: '', maxLength: 255, required: true },
    level: { type: String, default: '', maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true }
  }, {
    timestamps: true
  });
 
  mongoose.plugin(slug);
  Course.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true , 
  });

module.exports = mongoose.model('Course', Course);
