const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Query {
		listBook: [Book]
		detailBook(id: ID!): Book
		listAuth: [Author]
		listMessage: [Message]
	}

	type Message {
		name: String!
		content: String!
	}

	type Book {
		_id: ID!
		name: String!
		author: Author!
	}

	type Author {
		_id: ID!
		name: String!
		books: [Book]
	}

	type Mutation {
		addBook(name: String!, authId: String!): Book
		addAuthor(name: String!): Author
		addMessage(name: String!, content: String!): Message
		deleteBook(id: ID!): Book
		updateBook(id: ID!, name: String!, authId: String!): Book
	}

	type Subscription {
		createMessage: Message
	}
`;

module.exports = typeDefs;
