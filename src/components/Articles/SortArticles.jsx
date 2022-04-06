import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SortArticles = ({ sort, setSort, order, setOrder }) => {
	const handleSort = (event) => {
		setSort(event.target.value);
	};

	const handleOrder = (event) => {
		setOrder(event.target.value);
	};

	return (
		<div className="sort-buttons" alt="sort options">
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="select-helper-label">Sort by</InputLabel>
				<Select
					labelId="select-helper-label"
					id="select-helper"
					value={sort}
					label="Sort by"
					onChange={handleSort}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={"created_at"} alt="created at">
						Created at
					</MenuItem>
					<MenuItem value={"title"} alt="title">
						Title
					</MenuItem>
					<MenuItem value={"comment_count"} alt="comment count">
						Comment count
					</MenuItem>
					<MenuItem value={"votes"} alt="votes">
						Votes
					</MenuItem>
					<MenuItem value={"author"} alt="author">
						author
					</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<InputLabel id="select-helper-label" alt="order by options">
					Sort by
				</InputLabel>
				<Select
					labelId="select-helper-label"
					id="select-helper"
					value={order}
					label="Order by"
					onChange={handleOrder}
				>
					<MenuItem value={"asc"} alt="ascending">
						Ascending
					</MenuItem>
					<MenuItem value={"desc"} alt="descending">
						Descending
					</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

export default SortArticles;
