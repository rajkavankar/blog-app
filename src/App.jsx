import React from "react"
import { Outlet } from "react-router-dom"
import { Header, Footer } from "./components"

const App = () => {
	return (
		<div className="min-h-screen flex flex-wrap content-between bg-slate-800 text-slate-100">
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default App
