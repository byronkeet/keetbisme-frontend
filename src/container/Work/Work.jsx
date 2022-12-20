import React, { useState, useEffect, Fragment } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import AppWrap from '../../wrapper/AppWrap';
import MotionWrap from '../../wrapper/MotionWrap';
import { urlFor, client } from '../../client';

import './Work.scss';

const Work = () => {
	const [works, setWorks] = useState([]);
	const [filterWork, setFilterWork] = useState([]);
	const [activeFilter, setActiveFilter] = useState('All');
	const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

	useEffect(() => {
		const query = '*[_type == "works"]';

		client.fetch(query).then((data) => {
			const alphabetical = data.sort((a, b) => {
				const keyA = a.tags[0];
				const keyB = b.tags[0];
				// Compare the 2 years
				if (keyA < keyB) return -1;
				if (keyA > keyB) return 1;
				return 0;
			  });
			setWorks(alphabetical);
			setFilterWork(alphabetical);
		});
	}, []);

	const handleWorkFilter = (item) => {
		setActiveFilter(item);
		setAnimateCard([{ y: 100, opacity: 0 }]);

		setTimeout(() => {
			setAnimateCard([{ y: 0, opacity: 1 }]);

			if (item === 'All') {
				setFilterWork(works);
			} else {
				setFilterWork(works.filter((work) => work.tags.includes(item)));
			}
		}, 500);
	}

	return (
		<Fragment>
			<h2 className='head-text'>My Creative <span>Portfolio</span> of Work</h2>
			<div className='app__work-filter'>
				{['React JS', 'Next JS', 'WordPress', 'Frontend', 'Backend', 'All'].map((item, i) => (
					<div
						key={i}
						onClick={() => handleWorkFilter(item)}
						className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
					>
						{item}
					</div>
				))}
			</div>

			<motion.div
				animate={animateCard}
				transition={{ duration: 0.5, delayChildren: 0.5 }}
				className='app__work-portfolio'
			>
				{filterWork.map((work, i) => (
					<div className='app__work-item app__flex' key={i}>
						<div className='app__work-img app__flex'>
							<img src={urlFor(work.imgUrl)} alt={work.name} />
							<motion.div
								initial={{ opacity: 0 }}
								whileHover={{ opacity: [0, 1] }}
								transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
								className='app__work-hover app__flex'
							>
								<a href={work.projectLink} target='_blank' rel='noreferrer'>
									<motion.div
										whileInView={{ scale: [0, 1] }}
										whileHover={{ scale: [1, 0.90] }}
										transition={{ duration: 0.25 }}
										className='app__flex'
									>
										<AiFillEye />
									</motion.div>
								</a>
								<a href={work.codeLink} target='_blank' rel='noreferrer'>
									<motion.div
										whileInView={{ scale: [0, 1] }}
										whileHover={{ scale: [1, 0.90] }}
										transition={{ duration: 0.25 }}
										className='app__flex'
									>
										<AiFillGithub />
									</motion.div>
								</a>
							</motion.div>
						</div>

						<div className='app__work-content app__flex'>
							<h4 className='bold-text'>{work.title}</h4>
							<p className='p-text' style={{ marginTop: 10 }}>{work.description}</p>

							<div className='app__work-tag app__flex'>
								<p className='p-text'>{work.tags[0]}</p>
							</div>
						</div>
					</div>
				))}
			</motion.div>
		</Fragment>
	)
}

export default AppWrap(
	MotionWrap(Work, 'app__works'),
	'work',
	'app__primarybg'
);