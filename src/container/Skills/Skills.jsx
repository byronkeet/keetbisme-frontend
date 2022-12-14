import React, { useState, useEffect, Fragment } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import AppWrap from '../../wrapper/AppWrap';
import MotionWrap from '../../wrapper/MotionWrap';
import { urlFor, client } from '../../client';

import './Skills.scss';

const Skills = () => {
	const [experiences, setExperiences] = useState([]);
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		const query = '*[_type == "experiences"]';
		const skillsQuery = '*[_type == "skills"]';
	
		client.fetch(query).then((data) => {
		  setExperiences(data);
		});
	
		client.fetch(skillsQuery).then((data) => {
		  setSkills(data);
		});
	}, []);
	
	return (
		<Fragment>
			<h2 className='head-text'>Skills & Experiences</h2>

			<div className='app__skills-container'>
				<div className='app__skills-list'>
					{skills.map((skill) => (
						<motion.div
							whileInView={{ opacity: [0, 1] }}
							transition={{ duration: 0.5 }}
							className='app__skills-item app__flex'
							key={skill.name}
						>
							<div
								className='app__flex'
								style={{ backgroundColor: skill.bgColor }}
							>
								<img src={urlFor(skill.icon)} alt={skill.name} />
							</div>
							<p className='p-text'>{skill.name}</p>
						</motion.div>
					))}
				</div>
				<div className='app__skills-exp'>
					
					{experiences.sort((a, b) => {
						const keyA = Math.floor(a.year);
						const keyB = Math.floor(b.year);
						// Compare the 2 years
						if (keyA < keyB) return 1;
						if (keyA > keyB) return -1;
						return 0;
					  }).map((experience) => (
						
					<motion.div
						className='app__skills-exp-item'
						key={experience.year}
					>
						<div className='app__skills-exp-year'>
							<p className='bold-text'>{experience.year}</p>
						</div>
						<motion.div className='app__skills-exp-works'>
							{experience.works.map((work, i) => (
							<Fragment key={work.name}>
								<motion.div
									whileInView={{ opacity: [0, 1] }}
									transition={{ duration: 0.5 }}
									className='app__skills-exp-work'
									data-tip
									data-for={work.name}

								>
									<h4 className='bold-text'>{work.name}</h4>
									<p className='p-text'>{work.company}</p>
								</motion.div>
								<ReactTooltip
									id={work.name}
									effect='solid'
									arrowColor='#fff'
									className='skills-tooltip'
								>
									{work.desc}
								</ReactTooltip>
							</Fragment>
							))}
						</motion.div>
					</motion.div>
				))}
				</div>
			</div>
		</Fragment>
	);
}

export default AppWrap(
	MotionWrap(Skills, 'app__skills'),
	'skills',
	'app__whitebg'
);