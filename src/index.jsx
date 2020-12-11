import * as $ from 'jquery';
import Post from '@models/Post.js';
import json from './assets/json.json';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import WebpackLogo from '@/assets/social-network.png';
import React from 'react';
import {render} from 'react-dom';
import './babel.js';
import '@/styles/styles.css';
import '@/styles/less.less';
import '@/styles/sass.sass';

const post = new Post('Webpack Post Title', WebpackLogo);

$('pre').addClass('code').html(post.toString());

const App = () => (
	<div>
		<hr />
		<h2>React</h2>
		<h3>is working</h3>
		<hr />
	</div>

);

render(<App />, document.getElementById('app'));

console.log(post.toString());
console.log('JSON:', json);
console.log('xml:', xml);
console.log('csv:', csv);