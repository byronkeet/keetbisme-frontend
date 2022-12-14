import React, { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { client, urlFor } from '../../client';
import AppWrap from '../../wrapper/AppWrap';
import MotionWrap from '../../wrapper/MotionWrap';

import './About.scss';

const About = () => {
	const [abouts, setAbouts] = useState([]);

	useEffect(() => {
		const query = '*[_type == "abouts"]';

    	client.fetch(query).then((data) => setAbouts(data));
	}, [])
	
	return (
		<Fragment>
			<h2 className='head-text' style={{ marginTop: '4rem' }}>I know that <span>Good Apps</span> <br />mean <span>Good Business</span></h2>
			<div className='app__profiles'>
				{abouts.map((about, i) => (
					<motion.div
						whileInView={{ opacity: 1 }}
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.5, type: 'tween' }}
						className='app__profile-item'
						key={about.title + i}
					>
						<img src={urlFor(about.imgUrl)} alt={about.title} />
						<h2 className='bold-text' style={{ marginTop: 20 }}>{about.title}</h2>
						<p className='p-text' style={{ marginTop: 10 }}>{about.description}</p>
					</motion.div>
				))}
			</div>
		</Fragment>
	)
}

export default AppWrap(
	MotionWrap(About, 'app__about'),
	'about',
	'app__whitebg'
);