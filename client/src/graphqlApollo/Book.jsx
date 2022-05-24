import React from "react";
import { useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";
import { GET_BOOK } from "./../graphql/query";

const Book = () => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_BOOK, {
		variables: { id },
		// skip: id === null,
	});

	if (loading) {
		return <div>Loading book detail...</div>;
	}

	if (error) {
		return <div>Error book detail...</div>;
	}

	return (
		<div style={{ padding: "0 20px" }}>
			<h4>Chi tiết sách</h4>
			<div>
				<div>
					<mark>tên</mark>: <span>{data.detailBook.name}</span>
				</div>
				<div>
					<span>tác giả</span>: <i>{data.detailBook.author.name}</i>
				</div>
			</div>
		</div>
	);
};

export default Book;
