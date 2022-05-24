const Book = require("./models/bookModel");
const Auth = require("./models/authModel");
const Message = require("./models/messageModel");

const postBook = async (data) => {
	const newBook = new Book(data);
	return await newBook.save();
};

const postAuth = async (data) => {
	const newAuth = new Auth(data);
	return await newAuth.save();
};

const getBooks = async () => {
	return await Book.find();
};

const getAuthBook = async (_id) => {
	const authBook = await Auth.findById(_id);
	return authBook;
};

const getBooksMadeAuth = async (_id) => {
	const listBookMadeAuth = await Book.find({ authId: _id });
	return listBookMadeAuth;
};

const getDetailBook = async (_id) => {
	const detailBook = await Book.findById({ _id });
	return detailBook;
};

const getListAuth = async () => {
	const listAuth = await Auth.find();
	return listAuth;
};

const postMessage = async (data) => {
	const newMessage = new Message(data);
	return await newMessage.save();
};

const getMessages = async () => {
	return await Message.find();
};

const removeBook = async ({ id }) => {
	return await Book.findOneAndDelete({ _id: id }, { new: true });
};

const updateBook = async ({ id, ...rest }) => {
	return await Book.findOneAndUpdate({ _id: id }, rest, { new: true });
};

module.exports = {
	postBook,
	postAuth,
	getBooks,
	getAuthBook,
	getBooksMadeAuth,
	getDetailBook,
	getListAuth,
	postMessage,
	getMessages,
	removeBook,
	updateBook,
};
