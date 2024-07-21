import api from "configs/api"   

const getProfile = () => api.get("user/whoami").then(res => res || false)

const getposts = ()=> api.get("post/my");

const deletePost = (id)=> api.delete(`post/delete/${id}`);

const getAllposts = ()=> api.get("");

const getSlugposts = (slug)=> api.get(`option/by-category-slug/${slug}`);



export { getProfile , getposts , deletePost ,getAllposts,getSlugposts }