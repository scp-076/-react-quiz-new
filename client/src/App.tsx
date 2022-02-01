import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./Store/Reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";


declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</Provider>
	);
};

export default App;
