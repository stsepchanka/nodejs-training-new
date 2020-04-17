const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number,
        id: {
          type: String,
          default: uuid
        }
      }
    ],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return {
    id,
    title,
    columns: columns.map(column => ({
      id: column.id,
      title: column.title,
      order: column.order
    }))
  };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
