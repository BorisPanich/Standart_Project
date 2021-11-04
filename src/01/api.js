
export const api = {
    loadItems(categoryId) {
        return axiosInstance.get('/items/ + categoryId')
    },
    deleteItem(id) {
        return axiosInstance.delete('/items/' + id)
    }
}