import styles from "./Sidebar.module.css"

const Sidebar = ({categories,SetId}) => {

    const categoeyHandler = (id) =>{
        console.log(id);
        
        SetId(id)
    }

    return(
        <div className={styles.sidebar}>
            <h3>دسته بندی ها</h3>
            <ul>
                <li onClick={()=>SetId("")}>
                    <p>همه</p>
                </li>
                {categories?.data.map((category)=>(
                    <div onClick={()=>categoeyHandler(category._id)}>
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