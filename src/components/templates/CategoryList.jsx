import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { deleteCategory, getCategory } from "services/admin";

import styles from "./CategoryList.module.css"

import Loader from "components/modules/Loader";
import { useState } from "react";

const CategoryList = () => {
    const queryClient = useQueryClient()

    const {data , isFetching} = useQuery(["Get-Category"],getCategory)
    console.log(data);
    const {mutate , data : deleteCategoryData , isLoading} = useMutation(deleteCategory,{
        onSuccess: ()=> queryClient.invalidateQueries("Get-Category")
    })  

    const deleteHandler = (id) => {
        mutate(id)
    }
    return(
        <>
        <div className={styles.list}>
            {isLoading && <span className={styles.deleteLoading}>در حال حذف دسته بندی ..</span>}
            {isFetching ? <Loader/> : data.data.map((item)=>(
                <div key={item._id}>
                    <img src={`${item.icon}.svg`} />
                    <h5>{item.name}</h5>
                    <p>slug : {item.slug}</p>
                    <button onClick={()=> deleteHandler(item._id)}>حذف</button>
                </div>
            ))}
        </div>
        </>
    )
}
export default CategoryList;