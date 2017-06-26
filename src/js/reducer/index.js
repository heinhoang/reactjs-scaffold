import { combineReducers } from 'redux';
import resourceReducer from './resource';

export default (resources) => {
    const resourceReducers = {};
    resources.forEach((resource) => {
        resourceReducers[resource.name] = resourceReducer(resource.name, resource.options);
    });

    return combineReducers({
        ...resourceReducers,
    });
};
