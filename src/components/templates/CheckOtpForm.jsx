import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Toast from "components/toast/toast "

import { checkOtp } from "services/auth"
import { setCookie } from "utils/cookie"
import { getProfile } from "src/services/user"

import styles from "./CheckOtpForm.module.css"

const CheckOtpForm = ({code,setCode,mobile,setStep}) => {
    const { refetch } = useQuery(["profile"] , getProfile)
    const navigate = useNavigate()

    const submitHandler = async (e)=>{
        e.preventDefault()

        if(code.length !== 5) {
            Toast("error","کد تایید پنج رقم میباشد.")
            return;
        }
        const {response, error} = await checkOtp(mobile,code)
        if(response){
            setCookie(response.data)       
            navigate("/")    
            refetch()
        }      
        if(error) Toast("error", error.response.data.message)
    }

    return(
        <>
            <form onSubmit={submitHandler} className={styles.from}>
                <p>کد تایید</p>
                <span className={styles.textCode}>کد پیامک شده به شماره ( <span className={styles.phoneNumber}>{mobile}</span> ) را وارد کنید</span>
                <label htmlFor="input">کد تایید را وارد کنید.</label>
                <input id="input" type="text" placeholder="کد تایید را وارد کنید" value={code} onChange={e=> setCode(e.target.value)} />
                <button type="submit">ورود</button>
                <button onClick={()=>setStep(1)} className={styles.backButton}>تغییر شماره موبایل</button>
            </form>
            <ToastContainer/>
        </>
    )
}
export default CheckOtpForm;