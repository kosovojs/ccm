import { toast } from 'react-toastify';


function saveToDatabase(props) {
	const { toSaveData, data, capacity, robustness, comment, irrelevant, username, callback } = props;

	if (Object.keys(toSaveData).length === 0) {
		toast.info('Data was not changed');
		return;
	}

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

	//console.log('to save', reallyChanged);

	if (('irrelevant' in reallyChanged && reallyChanged['irrelevant'] === true) && ('capacity' in reallyChanged || 'robustness' in reallyChanged)) {
		//console.log('here');
		reallyChanged = Object.assign({}, { irrelevant: reallyChanged.irrelevant });
	}
	//console.log('here2', reallyChanged);

	if ('capacity' in reallyChanged || 'robustness' in reallyChanged) {
		const isInvalid = [capacity, robustness].some(x => x === 0);

		if (isInvalid && (capacity + robustness > 0)) {
			toast.info('Have to fill both capacity and robustness');//šis nav ok, ja abi ir N/A
			return;
		}
	}

	const dataToSendAsDefaults = [
		'capacity',
		'robustness',
		'irrelevant',
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

	//console.info('LOGGING',isInvalid1,try2Final, )

	const isInvalid1 = ['capacity', 'robustness'].some(x => try2Final[x] === null);

	if (try2Final.irrelevant !== true && isInvalid1) {
		toast.info('Have to fill both capacity and robustness');//šis nav ok, ja abi ir N/A
		return;
	}
	
	try2Final = Object.assign({},try2Final, {username});

	// if (isInvalid1 && (capacity + robustness > 0)) {
	// 	toast.info('Have to fill both capacity and robustness-1');//šis nav ok, ja abi ir N/A
	// 	return;
	// }

	//console.log('try2Final :', try2Final);
	callback(try2Final);
}

export default saveToDatabase;