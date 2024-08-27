import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import getUser from "../utils/getUser.js";
import { googleBooks } from "../utils/getMetadata.js";

export async function getBooks(req, res, next) {
  if (req.session && req.session.passport) {
    try {
      const user = await getUser(req);
      await user.populate("books");
      res.json(user.books);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).end();
  }
}

export async function postBook(req, res, next) {
  if (req.)
  try {
    const user = await getUser(req);

    const book = new Book(req.body);
    const savedBook = await book.save();

    const books = [...user.books, savedBook];
    const savedUser = await User.findByIdAndUpdate(user.id, { books: books });

    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const user = await getUser(req);


  } catch (err) {
    next(err);
  }
}

export async function getBooksByUser(req, res, next) {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      "books"
    );
    if (user) {
      res.json(user.books);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

export async function getMetadataFromIsbn(req, res, next) {
  try {
    const data = await googleBooks(req.params.isbn);
    if (!data) {
      res.status(404).json({
        error: "Metadata could not be located for provided ISBN",
      });
    } else {
      res.json(data);
    }
  } catch (err) {
    next(err);
  }
}
