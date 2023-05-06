import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { getCookie } from "../shared/Cookies"

const useUpdateDetail = (id) => {
    const token = getCookie('token')
    const queryClient = useQueryClient();
    const UpdatePost = useMutation({
        mutationKey : ['UpdatePost'],
        mutationFn : async(payload) => {
          console.log(payload,'이건데?')
          return await axios.patch(`${process.env.REACT_APP_SERVER_URL}products/${id}`,payload,{
            headers : {
              Authorization : `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }
          })
        },
        onSuccess:(response)=>{
            queryClient.invalidateQueries(['GET_DETAIL'])
          window.alert(response.data.message)
        },
        onError : (error)=> {
          alert('수정내역을 모두 작성해주세요.')
        }
      })

    return {
        UpdatePost
    }
}

export default useUpdateDetail;