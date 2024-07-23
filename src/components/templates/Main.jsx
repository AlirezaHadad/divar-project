import { sp } from "utils/replaceNumber";

import styles from './Main.module.css'

const Main = ({posts}) =>{
    console.log(posts);
    const BASEURL = import.meta.env.VITE_BASE_URL;
    return(
        <div className={styles.container}>
            {posts?.data.posts.map((post)=>(
                <div key={post._id} className={styles.card}>
                    <div className={styles.info}>
                        <p>{post.options?.title}</p>
                        <div>
                            <p>{sp(post.amount)}تومان</p>
                            <span>{post.options?.city}</span>
                        </div>
                    </div>
                    <img src={`${BASEURL}${post.images[0]}`} />
                </div>
            ))}
        </div>
    )
}
export default Main;