import React, { Fragment } from 'react';
import { motion } from 'framer-motion';

import about01 from '../../assets/about01.png';
import about02 from '../../assets/about02.png';
import about03 from '../../assets/about03.png';
import about04 from '../../assets/about04.png';
import './About.scss';

const abouts = [
	{ title: 'Web Development', description: 'Full Stack for over 3 years.', imgUrl: about01 },
	{ title: 'Front-End', description: 'I like to code things from scratch, and enjoy bringing ideas to life in the browser.', imgUrl: about02 },
	{ title: 'Back-End', description: 'I love server-side functionality and building the brain of applications.', imgUrl: about03 },
	{ title: 'WordPress', description: 'I enjoy the WP community and the process of block-first native plugin development.', imgUrl: about04 },
]


const About = () => {
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
						<img src={about.imgUrl} alt={about.title} />
						<h2 className='bold-text' style={{ marginTop: 20 }}>{about.title}</h2>
						<p className='p-text' style={{ marginTop: 10 }}>{about.description}</p>
					</motion.div>
				))}
			</div>
		</Fragment>
	)
}

export default About;