import { api } from "../01/api"

const initialState = {
    items: [],
    status: 'idle',
    error: null
}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'status-changed':
            return { ...state, status: action.status }
        case 'error-changed':
            return { ...state, status: action.error }
        case 'items-loaded':
            return { ...state, status: action.items }
        case 'items-deleted':
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.id)
            }
        default:
            return state
    }
}


// ActionCreator
export const itemsLoadedAC = (items) => ({ type: 'items-loaded', items })
export const itemsDeletedAC = (itemsId) => ({ type: 'items-deleted', itemsId })
export const changeStatusdAC = (status) => ({ type: 'status-changed', status })
export const setErrorAC = (error) => ({ type: 'error-changed', error })


// ThunkCreator
export const loadItemsTC = (categoryId) => (dispatch) => {
    dispatch(changeStatusdAC('loading'))
    dispatch(setErrorAC(null))
    api.loadItems(categoryId)
        .then((res) => {
            dispatch(changeStatusdAC('success'))
            dispatch(itemsLoadedAC(res.data))
        })
        .catch(err => {
            dispatch(changeStatusdAC('error'))
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(changeStatusdAC('idle')))
}

export const deleteItemTC = (id) => (dispatch) => {
    dispatch(changeStatusdAC('loading'))
    api.deleteItem(id)
        .then((res) => {
            dispatch(changeStatusdAC('success'))
            dispatch(itemsDeletedAC(id))
        })
        .catch(err => {
            dispatch(changeStatusdAC('error'))
            dispatch(setErrorAC(err))
        })
        .finally(() => dispatch(changeStatusdAC('idle')))
}