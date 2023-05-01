import { RtlProvider } from "components/rtlProvider/RtlProvider.js"
import React, { useEffect, useState } from "react"
import Success from "components/result/Result"
import UserApi from "api/user"
import { useAuthContext } from "hooks/useAuthContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

// Custom Chakra theme
export default function Home(props) {
    let history = useHistory()
    let [role, setRole] = useState("admin")
    let { user } = useAuthContext()
    if (!user) {
        user = localStorage.getItem("user")
        user = JSON.parse(user)
    }
    useEffect(() => {
        const getRole = async () => {
            try {
                let userData = await UserApi.GetRole(user._id)
                setRole(userData.data.users.role)
            } catch (err) {
                if (err.response.request.status === 401)
                    localStorage.removeItem("user")
                history.push("/home")
            }
        }
        getRole()
    }, [history, user._id])
    const successType = window.location.pathname.split("/")[2]
    document.documentElement.dir = "rtl"
    return (
        <RtlProvider>
            {successType === "createduser" ? (
                <Success
                    heading="تم تسجيل الموظف بنجاح"
                    text="سيتم تحويلك تلقائيا للوحة القيادة"
                    role={role}
                />
            ) : (
                <Success
                    heading="تم تسجيل المهمة بنجاح"
                    text="سيتم تحويلك تلقائيا للوحة القيادة"
                    role={role}
                />
            )}
        </RtlProvider>
    )
}
