
export const api = {
    loadItems(categoryId: any) {
        return axiosInstance.get('/items/ + categoryId')
    },
    deleteItem(id: any) {
        return axiosInstance.delete('/items/' + id)
    }
}