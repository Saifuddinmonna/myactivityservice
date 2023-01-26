import React from "react";

const InformationDiv = () => {
	return (
		<div className="container text-wrap">
			<h3 className="container mt-5 m-2 p-3 border rounded-3 shadow">
				
			</h3>
			<div className="container m-2  p-3 border rounded-3 shadow">
				<h3>How does the React works?</h3>
				<p>
					{" "}
					React is a declarative, efficient, and flexible JavaScript
					library for building user interfaces. 'V' denotes the view
					in MVC. ReactJS is an open-source, component-based front end
					library responsible only for the view layer of the
					application. <br />
					In English ReactJS divides the UI into isolated reusable
					pieces of code known as components. React components work
					similarly to JavaScript functions as they accept arbitrary
					inputs called properties or props. It's possible to have as
					many components as necessary without cluttering your code.
				</p>
			</div>
			<div className="container m-2 p-3 border rounded-3 shadow">
				<h3>
					What is the difference between state and props in React?
				</h3>
				<p>
					{" "}
					Props are used to pass data from one component to another.
					The state is a local data storage that is local to the
					component only and cannot be passed to other components. The
					this.setState property is used to update the state values in
					the component.
				</p>
				<p>
					This is the 'functional' aspect of React. All data (almost)
					flows downwards. Since the prop is owned by the parent, only
					the parent should change it. Ideally, children should be
					stateless. That's not possible in practice (see forms
					documentation on the React site). 2. You can either feed it
					in at the top, which is a recommended practice, or you can
					store it in separate objects. One popular approach is Flux,
					which uses singleton objects called Stores. This is part of
					a larger architectural pattern. It is also open sourced from
					Facebook and designed to work with React.
				</p>
			</div>
			<div className="container m-2 p-3 border rounded-3 shadow">
				<h3 className="text-capitalize">
					{" "}
					what are the function of useEffeect exclude data loading?
				</h3>
				<p>
					Earlier, we looked at how to express side effects that don’t
					require any cleanup. However, some effects do. For example,
					we might want to set up a subscription to some external data
					source. In that case, it is important to clean up so that we
					don’t introduce a memory leak! Let’s compare how we can do
					it with classes and with Hooks. <br />
					In some cases, cleaning up or applying the effect after
					every render might create a performance problem. In class
					components, we can solve this by writing an extra comparison
					with prevProps or prevState inside componentDidUpdate:
				</p>
			</div>
		</div>
	);
};

export default InformationDiv;
