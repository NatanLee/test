import * as $ from 'jquery';
import Post from '@models/Post.js';
import json from './assets/json.json';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import WebpackLogo from '@/assets/social-network.png';
import '@/styles/styles.css';

const post = new Post('Webpack Post Title', WebpackLogo);

$('pre').addClass('code').html(post.toString());

console.log(post.toString());
console.log('JSON:', json);
console.log('xml:', xml);
console.log('csv:', csv);