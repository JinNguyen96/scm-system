import { userService } from './../services/userService';
import { selector } from 'recoil';
import { atom } from 'recoil';
const user = {
    type: "",
    data: {
        id: 0,
        userType: [""],
        userEmail: "",
        userPassword: "",
        userRole: [""],
        userPhoneNumber: "",
        userFirstName: "",
        userLastName: "",
        userDob: "",
        userAdress: "",
        relatedUser: "",
        relatedType: "",
    }
}

const userState = atom({
    key: 'userState',
    default: user,
})
export const setUserState = selector({
    key: 'setUserState',
    get: ({ get }) => {
        return get(userState)
    },
    set: ({ set }, newUserData) => {
        console.log(newUserData)
        const { type, data }: any = newUserData
        switch (type) {
            case "VIEW_USER":
                return set(userState, newUserData)
            case "SET_USER":
                return set(userState, newUserData)
            case "DELETE_USER":

                return userService.deleteUser({ id: data.id })
            default:
                break;
        }
        return set(userState, newUserData)
    }
})