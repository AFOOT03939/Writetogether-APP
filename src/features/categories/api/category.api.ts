import axiosClient from "../../../api/axiosClient"

export async function getStories(status: string | null, categoryId?: number| null){
    const {data} = await axiosClient.get("/stories/filtered", {
        params: {
            status: status || undefined, 
            categoryId: categoryId || undefined
        }
    })
    return data
}