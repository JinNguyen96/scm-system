import { materialService } from './../services/materialService';
import { selector } from 'recoil';
import { atom } from 'recoil';
import { ModalType } from '../../constain/ModalType';


const materialEdit = {
    type: "",
    data: {
        name: "",
        no: 0,
        type_id: 0,
        rawMaterial: 0,
        quantity: "",
        group: "",
        price: 0,
        subtotal: "",
        stat: "",
        status: "",
        note: "",
    }
}
const materialEditState = atom({
    key: 'materialEditState',
    default: materialEdit
})

export const setEditMaterialState = selector({
    key: 'setEditMaterialState',
    get: ({ get }) => {
        return get(materialEditState)
    },
    set: ({ set, get }, newData) => {
        const detail = get(materialEditState)
        const { type, data }: any = newData
        switch (type) {
            case ModalType.VIEW_MATERIAL:
                return set(materialEditState, newData)
            case ModalType.EDIT_MATERIAL:
                return set(materialEditState, { ...detail.data, data: data, type: "" })
            case ModalType.DELETE_MATERIAL:
                return materialService.deleteMaterial({ id: data.id })
            default:
                break;
        }
        return set(materialEditState, newData)
    }
})