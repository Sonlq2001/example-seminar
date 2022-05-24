import { gql } from "@apollo/client";

export const SUB_CHAT = gql`
	subscription SubChat {
		createMessage {
			name
			content
		}
	}
`;
