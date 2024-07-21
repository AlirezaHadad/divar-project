import { useState } from "react";
import { useMutation , useQueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import { addCategory } from "services/admin";

import styles from "./CategoryForm.module.css"
import Toast from "../toast/toast ";

const CategoryForm = () => {
    const queryClient = useQueryClient()

    const [from , setFrom] = useState({name : "" , slug : "" , icon : ""})
    const {mutate , isLoading , error ,data} = useMutation(addCategory,{
        onSuccess: ()=> queryClient.invalidateQueries("Get-Category")
    })

    const changeHandler = (e) => {
        setFrom({...from,[e.target.name]:e.target.value})
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        if(!from.name || !from.slug || !from.icon){
            Toast("error","اطلاعات را کامل کنید.")
            return;
        }
        mutate(from)
    }

    return(
        <>
        <form onChange={changeHandler} onSubmit={submitHandler} className={styles.from}>
            <h3>دسته بندی جدید</h3>
            {!!error && <p>مشکلی پیش امده است</p>}
            {data?.status === 201 && <p>دسته بندی با موفیقت ثبت شد</p>}
            <div className={styles.container}>
                <label htmlFor="name">اسم دسته بندی</label>
                <input type="text" name="name" id="name" />
                <label htmlFor="slug">اسلاگ</label>
                <input type="text" name="slug" id="slug"/>
                <label htmlFor="icon">ایکون</label>
                <input type="text" name="icon" id="icon" />
            </div>
            <button type="submit" disabled={isLoading}>ایجاد</button>
        </form>
        <ToastContainer/>
        </>
    )
}
export default CategoryForm;