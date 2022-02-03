import React from 'react';

export default function Invoices({ children }) {
	return (
		<section className='invoices-section'>
			<article className='invoices-section-container'>
				<div className='title-container'>
					<h1 className='invoice-title'>Invoices</h1>
					<h2 className='filter'>Filter</h2>
				</div>
				{children}
			</article>
		</section>
	);
}
