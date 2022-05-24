const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
	Query: {
		listBook(parent, args, context) {
			return context.getBooks();
		},
		detailBook(parent, args, context) {
			return context.getDetailBook(args.id);
		},
		async listAuth(parent, args, context) {
			return await context.getListAuth();
		},
		async listMessage(parent, args, context) {
			return await context.getMessages();
		},
	},
	Mutation: {
		async addBook(parent, args, context) {
			return await context.postBook(args);
		},
		async addAuthor(parent, args, context) {
			return await context.postAuth(args);
		},
		async addMessage(parent, args, context) {
			const dataChat = await context.postMessage(args);
			pubsub.publish("CHAT_MESSAGE", {
				createMessage: dataChat,
			});
			return dataChat;
		},
		async deleteBook(parent, args, context) {
			return context.removeBook(args);
		},
		async updateBook(parent, args, context) {
			return context.updateBook(args);
		},
	},
	Book: {
		author(parent, args, context) {
			return context.getAuthBook(parent.authId);
		},
	},
	Author: {
		books(parent, args, context) {
			return context.getBooksMadeAuth(parent._id);
		},
	},

	Subscription: {
		createMessage: {
			subscribe(parent, args) {
				return pubsub.asyncIterator("CHAT_MESSAGE");
			},
		},
	},
};

module.exports = resolvers;
