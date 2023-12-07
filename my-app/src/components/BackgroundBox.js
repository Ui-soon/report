import React from 'react';

function BackgroundBox({ title, children }) {
	return (
			<div className="background-box">
				<h2 className="box-title">{title}</h2>
				<div className="box-content">{children}</div>
			</div>
	);
}

export default BackgroundBox;