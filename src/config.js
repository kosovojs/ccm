const API_URL_ACTIONS = '//tools.wmflabs.org/edgars/api.php?';
const API_URL = '//tools.wmflabs.org/edgars/ccm/api/index.php?';

const capacities = {
	0: 'N/A',
	1: 'none',
	2: 'low',
	3: 'medium',
	4: 'high'
};

const robustnesses = {
	0: 'N/A',
	1: 'none',
	2: 'low',
	3: 'medium',
	4: 'high'
};


const organizations = {
	0:'wiki community',
	1:'Wikimedia affiliate (user group, thematic organization, chapter)'
};

const DRAWER_WIDTH = 250;

export {
	capacities,
	robustnesses,
	organizations,
	DRAWER_WIDTH,
	API_URL_ACTIONS,
	API_URL
}
