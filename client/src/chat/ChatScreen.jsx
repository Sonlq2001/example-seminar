import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { POST_CHAT } from "./../graphql/mutation";
import { GET_MESSAGES } from "../graphql/query";
import { SUB_CHAT } from "../graphql/subscription";

const ChatScreen = () => {
	const [initChat, setInitChat] = useState({ name: "", content: "" });
	const { loading, data, subscribeToMore } = useQuery(GET_MESSAGES);
	const [addMessage] = useMutation(POST_CHAT);

	const handleChat = () => {
		addMessage({
			variables: initChat,
			refetchQueries: [{ query: GET_MESSAGES }],
		});
		setInitChat({
			...initChat,
			content: "",
		});
	};

	useEffect(() => {
		subscribeToMore({
			document: SUB_CHAT,
			updateQuery(prevData, { subscriptionData }) {
				if (!subscriptionData.data) return prevData;
				const newChat = subscriptionData.data.createMessage;
				return {
					listMessage: [...prevData.listMessage, newChat],
				};
			},
		});
	}, [subscribeToMore]);

	return (
		<div>
			<div>
				{loading && <div>Loading...</div>}
				{!loading &&
					data.listMessage &&
					data.listMessage.length > 0 &&
					data.listMessage.map((item, index) => (
						<div key={index}>
							<mark>{item.name}</mark>: <span>{item.content}</span>
						</div>
					))}
			</div>
			<input
				placeholder="name"
				type="text"
				onChange={(e) => setInitChat({ ...initChat, name: e.target.value })}
				value={initChat.name}
			/>
			<input
				type="text"
				placeholder="content"
				value={initChat.content}
				onChange={(e) => setInitChat({ ...initChat, content: e.target.value })}
			/>
			<button onClick={handleChat}>chat</button>
		</div>
	);
};

export default ChatScreen;
