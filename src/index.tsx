import { createRoot } from "react-dom/client";

import Main from "./components/index";
import "assets/style.css";

const root = createRoot(document.getElementById("root")!);

root.render(
	<>
		<Main />
	</>
);
