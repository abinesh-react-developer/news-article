import instance from "../../../interceptor"
import ToastMessage from "../../utility/Toast"


export const NewsArticleApi = async (setPostList,query) => {
    try {
        const result = await instance.get(`everything?q=${query}&page=1&pageSize=10`)
        if (result?.data?.status === "ok") {
            setPostList(result?.data?.articles)
        } else {
            ToastMessage({ type: 'error', message: 'error getting from data fetching' })
        }
    } catch (error) {
        ToastMessage({ type: 'error', message: error.message })
    }

}