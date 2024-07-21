import styles from "./Sidebar.module.css"

const Sidebar = ({categories,SetSlug,slug}) => {

    const categoeyHandler = (slug) =>{
        const slugcategory = slug
        SetSlug(slugcategory)
    }

    return(
        <div className={styles.sidebar}>
            <h3>دسته بندی ها</h3>
            <ul>
                <li>
                    <p>همه</p>
                </li>
                {categories?.data.map((category)=>(
                    <div onClick={()=>categoeyHandler(category.slug)}>
                        <li key={category._id}>
                            <img src={`${category.icon}.svg`} />
                            <p>{category.name}</p>
                        </li>
                    </div>
                    ))
                }
            </ul>
        </div>
    )
}
export default Sidebar