import {post, get} from './api';
import {API_URL_ACTIONS} from '../config';

const api = {
	user_info: () => fetch(`${API_URL_ACTIONS}action=userinfo`).then(resp => resp.json()),

	saveItem: (saveData) => post(`action=save_item`, saveData),
	
	saveOrganization: (saveData) => post(`action=save_organization`, saveData),

	getOrganization: (id) => get(`action=organization&org=${id}`),

	orgOverview: (id) => get(`action=org_overview&org=${id}`),

	overview: () => get('action=overview'),
	
	getSpecific: (org, item) => get(`action=rating&org=${org}&rating=${item}`),

	saveData: (org, item, saveData) => post(`action=save_item&org=${org}&rating=${item}`, saveData)
};

export default api;
