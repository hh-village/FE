import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getCookie } from "../shared/Cookies"

const useDeleteDetail = (id) => {
    const token = getCookie('token')
    const navigate = useNavigate();
    const DeletePost = useMutation({
        mutationKey:['DeletePost'],
        mutationFn: async(id) => {
          return await axios.delete(`${process.env.REACT_APP_SERVER_URL}/products/${id}`,{
            headers : {
              Authorization : `Bearer ${token}`
            }
          })
        },
        onSuccess : (response) => {
          window.alert(response.data.message)
          navigate('/search')
          window.location.reload();
        }
      })

    return {
        DeletePost
    }
}

export default useDeleteDetail;