import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deletePost, getposts } from "services/user";
import { sp } from "utils/replaceNumber";

import Loader from "components/modules/Loader";
import styles from "./PostList.module.css"

const PostList = () => {
    const queryClient = useQueryClient()

    const {data,isFetching} = useQuery(["My_Post-List"],getposts)

    const {mutate , data : deletePostData , isLoading} = useMutation(deletePost,{
        onSuccess: ()=> queryClient.invalidateQueries("My_Post-List")
    }) 
    
    const deleteHandler = (id) =>{
        mutate(id)
    }

    return(
        <div className={styles.list}>
        {isLoading && <span className={styles.deleteLoading}>در حال حذف پست  ..</span>}
        {isFetching ? <Loader/> : (
            <>
                <h3>اگهی های شما</h3>
                {data.data.posts.map((post)=>(
                    <div className={styles.post} key={post._id}>
                        <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} alt="" />
                        <div>
                            <p>{post.options.title}</p>
                            <span>{post.options.content}</span>
                        </div>
                        <div className={styles.price}>
                            <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                            <span>{sp(post.amount)}تومان</span>
                        </div>
                        <button onClick={()=> deleteHandler(post._id)}>حذف</button>
                    </div>
                ))}
            </>
        )}
        </div>
    )
}
export default PostList;