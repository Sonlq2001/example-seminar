import { gql } from "@apollo/client";

export const GET_QUERY_BOOKS = gql`
	query GetQueryBooks {
		listBook {
			_id
			name
			author {
				_id
				name
			}
		}
	}
`;

export const GET_AUTH = gql`
	query GetAuth {
		listAuth {
			_id
			name
		}
	}
`;

export const GET_MESSAGES = gql`
	query GetMessage {
		listMessage {
			name
			content
		}
	}
`;

export const GET_BOOK = gql`
	query GetBook($id: ID!) {
		detailBook(id: $id) {
			name
			author {
				name
			}
		}
	}
`;
