import { useEffect } from 'react';
import axios from "axios";
import { Data } from "react-csv/components/CommonPropTypes";
import { atom, RecoilValue, selector } from "recoil"
import { notifiError, notifiSuccess } from "../../components/toastify-noti/notifi";
import { userService } from "../services/userService";
import _ from 'lodash';

const modalAttributesData = {
    open: false,
    dimmer: "blurring",
    type: "CLOSE_MODAL"
}

const userDefaultData =
    { id: 0 }

const listModalAttributes = atom({
    key: 'listModal',
    default: modalAttributesData
})
const listUserData = atom({
    key: "listUser",
    default: [],
})
export const getUserDefaultData = selector({
    key: 'getUserDefaultDataS',
    get: async ({ get }) => {
        // let data = await userService.getAllUser()
        const list = get(listUserData);
        // console.log(data, 'data')
        return list
    },
    set: ({ set, get }, newData: any) => {
        // Update state w/ new appended values
        const list = get(listUserData);

        console.log(newData)
        return set(listUserData, newData);
    },
})


// console.log(listUserData, 'listUserData')




export const newActionModal = selector({
    key: "newModalAction",
    get: ({ get }) => {
        const list = get(listModalAttributes);
        return list
    },
    set: ({ get, set }, action: any) => {
        const list = get(listModalAttributes);
        switch (action) {
            case "MODAL_CLOSE":
                return set(listModalAttributes, { ...list, open: false })
            case "MODAL_OPEN":
                return set(listModalAttributes, { ...list, open: true })
            default:
                break;
        }
    }
})


const userId = atom({
    key: 'userId',
    default: {
        id: 0
    }
})

export const modalSetIdAction = selector({
    key: "modalDeleteUser",
    get: ({ get }) => {
        const id = get(userId);
        return id;
    },
    set: ({ get, set }, id: any) => {
        const list = get(userId);
        console.log(id)
        return set(userId, { ...list, id: id })
    }
})

export const modalDeleteUserAction = selector({
    key: "deleteUserAction",
    get: ({ get }) => {
        const id = get(listUserData)
    },
    set: async ({ get, set }, id) => {
        const data = get(listUserData);
        const result = userService.deleteUser(id)
        console.log(result)
        // .then((result: any) => {
        //     notifiSuccess({ message: "Delete User success!!" });
        //     console.log(result)
        //     // return set(listUserData, [...id, result])
        // })
        // .catch((err) => {
        //     notifiError({ message: "Delete User Failed!!!" });
        // });
    }
})

const modalState = {
    typeModal: '',

}
const currentModalState = atom({
    key: 'currentModalState',
    default: modalState,
})

export const setCurrentModalState = selector({
    key: "setCurrentModalState",
    get: ({ get }) => get(currentModalState),
    set: ({ set }, newValue) => set(currentModalState, newValue)
})