import { ToastContainer } from "react-toastify";
import Toast from "components/toast/toast ";
import { SendOtp } from "services/auth";
import styles from "./SendOtpForm.module.css"


const SendOtpForm = ({mobile,setMobile,setStep}) => {

    const submitHandler = async (e) => {
        e.preventDefault()

        if(mobile.length !== 11){
            Toast("error","شماره وارد شده صحیح نمیباشد.");
            return;
        } 
        const { response , error } = await SendOtp(mobile)
        if(response) setStep(2)                   
        if(error) console.log(error.response.data.message)
    }

    return(
        <>
            <form onSubmit={submitHandler} className={styles.from}>
                <p>ورود به حساب کاربری</p>
                <span>برای استفاده از امکانات دیوار ، لطفا شماره موبایل خود را وارد کنید. کد تایید به این شماره پیامک خواهد شد.</span>
                <span>*برای دریافت رمز و ورود به پنل ادمین - کاربر باید بک اندی که در گیت هاب گذاشته شده استفاده کنید</span>
                <label htmlFor="input">شماره موبایل خود را وارد بکنید.</label>
                <input type="text" id="input" placeholder="شماره موبایل" value={mobile} onChange={e => setMobile(e.target.value)} />
                <button type="submit">ارسال کد تایید</button>
            </form>
            <ToastContainer />
        </>
    )
}
export default SendOtpForm