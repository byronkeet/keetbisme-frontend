import React from 'react';
import { motion } from 'framer-motion';

import avatar from '../../assets/avatar.png'
import circle from '../../assets/circle.svg';
import reactpng from '../../assets/react.png';
import node from '../../assets/node.png';
import redux from '../../assets/redux.png';
import AppWrap from '../../wrapper/AppWrap';

import './Header.scss';

const scaleVariants = {
	whileInView: {
		scale: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 1,
			ease: 'easeInOut',
		},
	},
};

const Header = () => {
	return (
		<div className='app__header app__flex'>
			<motion.div
				whileInView={{ x: [-100, 0], opacity: [0, 1] }}
				transition={{ duration: 0.5 }}
				className='app__header-info'
			>
				<div className='app__header-badge'>
					<div className='badge-cmp app__flex'>
						<span>👋</span>
						<div style={{ marginLeft: 20 }}>
							<p className='p-text'>Hi, I'm</p>
							<h1 className='head-text'>Keet B</h1>
						</div>
					</div>

					<div className='tag-cmp app__flex'>
						<p className='p-text'>Web Developer</p>
						<p className='p-text'>Freelancer</p>
					</div>
				</div>
			</motion.div>

			<motion.div
				whileInView={{ opacity: [0, 1] }}
				transition={{ duration: 0.5, delayChildren: 0.5 }}
				className='app__header-img'
			>
				<img src={avatar} alt='profile background' className='avatar' />
				<motion.img
					whileInView={{ scale: [0, 1] }}
					transition={{ duration: 1, ease: 'easeInOut' }}
					src={circle}
					alt='profile circle'
					className='overlay_circle'
				/>
			</motion.div>

			<motion.div
				variants={scaleVariants}
				whileInView={scaleVariants.whileInView}
				className='app__header-circles'
			>
				{[node, reactpng, redux].map((circle, i) => (
					<div className='circle-cmp app__flex' key={`circle-${i}`}>
						<img src={circle} alt='profile badge' />
					</div>
				))}
			</motion.div>
		</div>
	)
}

export default AppWrap(Header, 'home');