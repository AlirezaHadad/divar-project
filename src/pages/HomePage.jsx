import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import Main from "components/templates/Main"
import Sidebar from "components/templates/Sidebar"
import Loader from "components/modules/Loader"

import { getAllposts, getSlugposts } from "services/user"
import { getCategory } from "src/services/admin"

const style = {display:"flex"}

const HomePage = ()=> {
    const [id , SetId] = useState("")
    const [postsData ,setPostsData] = useState([])
    console.log(id);
    
    // const { data: categoryPosts } = useQuery(['categoryPosts', id], () => getSlugposts(id));
    // console.log(categoryPosts);
    
    const {data : posts , isLoading : postLoading} = useQuery(["Post-List"],getAllposts)
    const {data : categories , isLoading : categoryLoading} = useQuery(["Get-Category"],getCategory)
    console.log(posts);
    
    useEffect(()=>{
        if(id){
            const filteredPosts = posts.data.posts.filter((item) => {
                return item.category === id; // فیلتر کردن بر اساس id
            });
            console.log(filteredPosts);
            setPostsData(filteredPosts)
        }else{
            setPostsData(posts?.data.posts) 
        }
    },[id,posts])
    console.log(3333,postsData);
    
    return(
        <>
        {postLoading || categoryLoading ? <Loader/> : (
        <div style={style}>
            <Sidebar categories={categories} SetId={SetId} />
            <Main posts={postsData} id={id}/>
        </div> 
        )}
        </>
    )
}
export default HomePage
