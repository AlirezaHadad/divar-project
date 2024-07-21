import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import axios from "axios"

import { getCategory } from "services/admin"
import { getCookie } from "utils/cookie"

import styles from "./AddPost.module.css"
import Toast from "components/toast/toast "
import { getposts } from "services/user"

const AddPost = () => {
    const [form,setForm] = useState({
        title : "" ,content: "",amount : null,city : "",category : "",images : null
    })

    const {data} = useQuery(["Get-Category"],getCategory)
    const { refetch } = useQuery(["My_Post-List"],getposts)

    const changeHandler = (e) => {
        const name = e.target.name;
        if(name !== "images"){
            setForm({...form,[name] : e.target.value})
        }else{
            setForm({...form,[name] : e.target.files[0]})
        }
    }

    const addHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        for(let i in form){
            formData.append(i,form[i]);
        }
        const token = getCookie("accessToken");
        axios.post(`${import.meta.env.VITE_BASE_URL}post/create`,formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${token}`
            } 
        }).then((res)=> {
            refetch(),
            Toast("success","پست با موفیقت اضافه شد.")
        }).
        catch((error)=>Toast("error","مشکلی پیش امده لطفا دوباره امتحان کنید"))
    }

    return(
        <>
            <form onSubmit={addHandler} onChange={changeHandler} className={styles.form}>
                <h3>افزودن اگهی </h3>
                <label htmlFor="title">عنوان</label>
                <input type="text" name="title" id="title" />
                <label htmlFor="content">توضیحات</label>
                <textarea name="content" id="content" cols="30"  rows="5"/>
                <label htmlFor="amount">قیمت</label>
                <input type="number" name="amount" id="amount" />
                <label htmlFor="city">شهر</label>
                <input type="text" name="city" id="city" />
                <label htmlFor="category">دسته بندی</label>
                <section>
                    <select name="category" id="category">
                        {data?.data.map((item)=>(
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </section>
                <label htmlFor="images">عکس</label>
                <input type="file" name="images" id="images" />
                <button>ایجاد</button>
            </form>
            <ToastContainer/>
        </>
    )
}
export default AddPost