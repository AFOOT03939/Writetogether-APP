import axiosClient from "../../../api/axiosClient"

export async function getStories(){
    const {data} = await axiosClient.get("/stories")
    return data
}