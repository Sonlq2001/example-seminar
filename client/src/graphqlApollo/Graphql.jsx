import React, { useState } from "react";
import { useQuery, useMutation, NetworkStatus } from "@apollo/client";
import { Link } from "react-router-dom";

import { GET_QUERY_BOOKS, GET_AUTH } from "../graphql/query";
import { POST_BOOK, DELETE_BOOK, UPDATE_BOOK } from "../graphql/mutation";

const Graphql = () => {
	const [initData, setInitData] = useState({
		name: "",
		authId: "",
	});
	const [isEdit, setIsEdit] = useState(false);

	const { loading, error, data, refetch, networkStatus } = useQuery(
		GET_QUERY_BOOKS,
		{
			pollInterval: 3000,
			notifyOnNetworkStatusChange: true,
		}
	);

	const { loading: loadingAuth, data: dataAuth } = useQuery(GET_AUTH);

	const [actionBook] = useMutation(isEdit ? UPDATE_BOOK : POST_BOOK);

	const handleActionBook = () => {
		actionBook({
			variables: initData,
			refetchQueries: [{ query: GET_QUERY_BOOKS }],
		});

		setInitData({
			name: "",
			authId: "",
		});
		setIsEdit(false);
	};

	const [deleteBook] = useMutation(DELETE_BOOK);

	if (networkStatus === NetworkStatus.refetch) return "Refetching!";

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error...</div>;
	}

	return (
		<div style={{ padding: "0 20px" }}>
			<h3>Graphql</h3>
			<div className="group-book">
				{data.listBook &&
					data.listBook.length > 0 &&
					data.listBook.map((item) => (
						<div
							key={item._id}
							className="book-item"
							onClick={() => {
								setInitData({
									id: item._id,
									name: item.name,
									authId: item.author._id,
								});
								setIsEdit(true);
							}}
						>
							<div>
								<div>
									<mark>tên sách</mark>:{" "}
									<Link to={`/book/${item._id}`}>{item.name}</Link>
								</div>
								<div>
									'<i>{item.author.name}</i>'
								</div>
							</div>
							<button
								onClick={(e) => {
									e.stopPropagation();
									deleteBook({
										variables: { id: item._id },
										refetchQueries: [{ query: GET_QUERY_BOOKS }],
									});
								}}
							>
								Xóa
							</button>
							<div>------</div>
						</div>
					))}
			</div>
			<br />
			<div>
				<div>
					<div>Thêm sách</div>
					<select
						name="authId"
						onChange={(e) =>
							setInitData({ ...initData, authId: e.target.value })
						}
						value={initData.authId}
					>
						<option value="0">-- Chọn tác giả --</option>
						{!loadingAuth &&
							dataAuth.listAuth?.length > 0 &&
							dataAuth.listAuth?.map((auth) => (
								<option value={auth._id} key={auth._id}>
									{auth.name}
								</option>
							))}
					</select>
				</div>
				<input
					type="text"
					placeholder="name"
					value={initData.name}
					onChange={(e) => setInitData({ ...initData, name: e.target.value })}
				/>
				<button onClick={handleActionBook}>{isEdit ? "Sửa" : "Thêm"}</button>
			</div>
			<button onClick={() => refetch()}>Refetch data</button>
			<button
				onClick={() => {
					setInitData({
						name: "",
						authId: "",
					});
					setIsEdit(false);
				}}
			>
				Clear
			</button>
			<br />
			<br />
			<hr />
			<Link to="/subscription">Subscriptions</Link>
		</div>
	);
};

export default Graphql;
