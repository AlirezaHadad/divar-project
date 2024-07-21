import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import Main from "components/templates/Main"
import Sidebar from "components/templates/Sidebar"
import Loader from "components/modules/Loader"

import { getAllposts, getSlugposts } from "services/user"
import { getCategory } from "src/services/admin"

const style = {display:"flex"}

const HomePage = ()=> {
    const [slug , SetSlug] = useState("")
    console.log(slug);
    const { data: categoryPosts } = useQuery(['categoryPosts', slug], () => getSlugposts(slug));
    console.log(categoryPosts);
    const {data : posts , isLoading : postLoading} = useQuery(["Post-List"],getAllposts)
    const {data : categories , isLoading : categoryLoading} = useQuery(["Get-Category"],getCategory)
    console.log(posts);
    return(
        <>
        {postLoading || categoryLoading ? <Loader/> : (
        <div style={style}>
            <Sidebar categories={categories} SetSlug={SetSlug} slug={slug} />
            <Main posts={posts}/>
        </div> 
        )}
        </>
    )
}
export default HomePage
