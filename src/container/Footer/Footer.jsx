import React, { Fragment, useState } from 'react';

import AppWrap from '../../wrapper/AppWrap';
import MotionWrap from '../../wrapper/MotionWrap';
import { client } from '../../client';
import emailImg from '../../assets/email.png';
import mobile from '../../assets/mobile.png';
import './Footer.scss';

const Footer = () => {
	const [formData, setFormData] = useState({ name: '', email: '', message: '' });
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const { username, email, message } = formData;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
		setLoading(true);
	
		const contact = {
		  _type: 'contact',
		  name: username,
		  email: email,
		  message: message,
		};
	
		client.create(contact)
		.then(() => {
			setLoading(false);
			setIsFormSubmitted(true);
		})
		.catch((err) => console.log(err));
	};

	return (
		<Fragment>
			<h2 className="head-text">Interested in working together? We should queue up a chat.</h2>
			<div className="app__footer-cards">
				<div className="app__footer-card ">
					<img src={emailImg} alt="email" />
					<a href="mailto:keetbis@gmail.com" className="p-text">keetbis@gmail.com</a>
				</div>
				<div className="app__footer-card">
					<img src={mobile} alt="phone" />
					<a href="tel:+27 (82) 359-1540" className="p-text">+27 (82) 359-1540</a>
				</div>
			</div>

			{!isFormSubmitted ? (
				<div className="app__footer-form app__flex">
					<div className="app__flex">
						<input className="p-text" type="text" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
					</div>
					<div className="app__flex">
						<input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
					</div>
					<div>
						<textarea
							className="p-text"
							placeholder="Your Message"
							value={message}
							name="message"
							onChange={handleChangeInput}
						/>
					</div>
					<button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
				</div>
			) : (
				<div>
					<h3 className="head-text">
						Thank you for getting in touch!
					</h3>
				</div>
			)}
			<div className='copyright'>
				<p className='p-text'>@2023 KEET.B</p>
				<p className='p-text'>All rights reserved</p>
			</div>
		</Fragment>
	);
}

export default AppWrap(
	MotionWrap(Footer, 'app__footer'),
	'contact',
	'app__whitebg',
);