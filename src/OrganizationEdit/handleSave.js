import { toast } from 'react-toastify';

function saveToDatabase(props) {
	//todo: salabot nosacījumu izpildi
	const { title,link, type, comment, toSaveData, data, callback, organization, username } = props;

	if (Object.keys(toSaveData).length === 0) {
		toast.info('Data was not changed');
		return;
	}

	let forSave = {};

	let reallyChanged = {};

	for (let key in toSaveData) {
		if (toSaveData[key] !== data[key]) {
			reallyChanged[key] = toSaveData[key];
		}
	}

	if (Object.keys(reallyChanged).length === 0) {
		toast.info('Data was not changed');
		return;
	}

	console.log('to save', reallyChanged);

	if (title.trim() === '') {
		toast.info('Please add title');
		return;
	}

	if (type === null) {
		toast.info('Please choose organization type');
		return;
	}
	
	const dataToSendAsDefaults = [
		'title',
		'link',
		'type',
		'comment'
	];

	let try2Final = {};

	for (let arrKey in dataToSendAsDefaults) {
		let theKey = dataToSendAsDefaults[arrKey];
		if (theKey in reallyChanged && typeof reallyChanged[theKey] !== 'undefined') {
			try2Final[theKey] = reallyChanged[theKey];
		} else {
			try2Final[theKey] = data[theKey];
		}
	}


	if (organization) {
		try2Final['org'] = organization;
	}
	try2Final = Object.assign({},try2Final, {username});
	
	console.log(try2Final);
	callback(try2Final);
}

export default saveToDatabase;