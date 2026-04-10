import axiosClient from "../../../api/axiosClient"

export async function getUsers(){
    const {data} = await axiosClient.get(`/users`)
    return data
}

export async function getStoryByUser(){
    const {data} = await axiosClient.get(`/stories/user`)
    return data
}

export async function getFragments(){
    const {data} = await axiosClient.get(`/fragments/user`)
    return data
}

export async function changePhoto(file: File) {
  // Creamos una instancia de FormData
  const formData = new FormData();

  formData.append("file", file); 

  const { data } = await axiosClient.post("/users/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return data;
}

export async function editCharacter(status: string | null, categoryId?: number| null){
    const {data} = await axiosClient.get("/stories/filtered", {
        params: {
            status: status || undefined, 
            categoryId: categoryId || undefined
        }
    })
    return data
}