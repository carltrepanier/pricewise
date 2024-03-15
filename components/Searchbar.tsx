'use client';

import { FormEvent, useState } from 'react';

const isValidAmazonUrl = (url: string) => {
	try {
		const parsedUrl = new URL(url);
		const { hostname } = parsedUrl;

		// Check if the URL is an Amazon URL
		if (
			hostname.includes('amazon.com') ||
			hostname.includes('amazon.') ||
			hostname.endsWith('amazon')
		) {
			return true;
		}
	} catch (error) {
		return false;
	}

	return false;
};

export default function Searchbar() {
	const [searchPrompt, setSearchPrompt] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isValidUrl = isValidAmazonUrl(searchPrompt);

		if (!isValidUrl) {
			return alert('Please enter a valid Amazon URL');
		}

		try {
			setIsLoading(true);

			// Scrape the product page
		} catch (error) {
			console.error('Error searching for product:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
			<input
				type='text'
				value={searchPrompt}
				onChange={(e) => setSearchPrompt(e.target.value)}
				placeholder='Enter product link'
				className='searchbar-input'
			/>

			<button
				type='submit'
				className='searchbar-btn'
				disabled={searchPrompt === ''}
			>
				{isLoading ? 'Searching...' : 'Search'}
			</button>
		</form>
	);
}
