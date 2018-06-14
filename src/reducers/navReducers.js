import SwitchRouters from '../routers/SwitchRouters';

const recentlyVisitedRoutes = new Set();
const navReducers = (state, action) => { //防止连点，多次navigate，增加此判断
    if (action.type === 'Navigation/NAVIGATE') {
        if (recentlyVisitedRoutes.has(action.routeName)) {
            return state;
        }
        recentlyVisitedRoutes.add(action.routeName);
        setTimeout(() => {
            recentlyVisitedRoutes.delete(action.routeName);
        }, 400);
    }
    const newState = SwitchRouters.router.getStateForAction(action, state);
    return newState || state;
};

export default navReducers;