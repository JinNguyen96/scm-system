import { selector } from 'recoil';
import { atom } from 'recoil';


const route = { path: '', status: '' }

const routeState = atom({
    key: 'routeState',
    default: route
})

export const routePath = selector({
    key: 'routePath',
    get: ({ get }) => {
        const presentRoute = get(routeState)
        return presentRoute;
    },
    set: ({ get, set }, newRoute) => {
        const presentRoute = get(routeState);
        return set(routeState, newRoute)
    }
})