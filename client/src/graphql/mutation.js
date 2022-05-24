import { gql } from "@apollo/client";

export const POST_BOOK = gql`
	mutation PostBook($name: String!, $authId: String!) {
		addBook(name: $name, authId: $authId) {
			name
		}
	}
`;

export const POST_CHAT = gql`
	mutation PostChat($name: String!, $content: String!) {
		addMessage(name: $name, content: $content) {
			name
			content
		}
	}
`;

export const DELETE_BOOK = gql`
	mutation DeleteBook($id: ID!) {
		deleteBook(id: $id) {
			name
		}
	}
`;

export const UPDATE_BOOK = gql`
	mutation UpdateBook($id: ID!, $name: String!, $authId: String!) {
		updateBook(id: $id, name: $name, authId: $authId) {
			name
		}
	}
`;
