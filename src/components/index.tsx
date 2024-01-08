import React from "react";
import Piggie from "./Home";

import "./main.css";

export default class Main extends React.Component {
	render() {
		console.log("Rendering Main component");
		return (
			<div>
				<Piggie />
			</div>
		);
	}
}
