var Book = require('../models/book');
var Author = require('../models/author');


exports.book_list = function(req, res, next) {

  Book.find({}, 'title author')
    .populate('author')
    .exec(function (err, list_books) {
      if (err) { return next(err); }
      // Successful, so render
      res.json(list_books);
    });
  }

