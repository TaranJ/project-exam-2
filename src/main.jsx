import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

/**
 * Entry point for the React application.
 * This file renders the root component of the application (App) into the DOM.
 * The root element is the <div id="root"> element in the HTML file.
 *
 * @function
 * @returns {void}
 */
createRoot(document.getElementById("root")).render(<App />);
