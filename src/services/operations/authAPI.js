import { setLoading, setToken } from "../../slice/authSlice";
import { endpoints } from "../api";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slice/profileSlice";
import { resetCart} from "../../slice/cartSlice"

const { 
    SENDOTP_API,
    LOGIN_API ,
    SIGNUP_API,
    VERIFY_OTP_API,
    RESETPASSTOKEN_API ,
    RESETPASSWORD_API  } = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("OTP response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || "OTP request failed");
      }

      toast.success("OTP Sent Successfully");
      navigate("/verifyotp");
    } catch (error) {
      console.log(
        "SendOTP error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Could Not Send OTP");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function verifyOTP(email, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Verifying OTP...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        VERIFY_OTP_API,
        { email, otp }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "OTP verification failed");
      }

      toast.success("OTP verified successfully");

      // OTP verification ke baad signup page par jao
      navigate("/signup", {
        state: { email, otp },
      });

    } catch (error) {
      console.log(
        "Verify OTP error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || "Invalid OTP"
      );
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function signup(
  signupData,navigate
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType:signupData.accountType,
                firstName:signupData.firstName,
                lastName:signupData.lastName,
                email:signupData.email,
                password:signupData.password,
                confirmPassword :signupData.confirmPassword,
                phone:signupData.phone,
            })

            console.log("SIGNUP API RESPONSE.........", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            
            toast.success("Signup Successfull")
            navigate("/login")
        } catch (error) {
            console.log("Signup error:", error.response?.status);
            console.log("Backend message:", error.response?.data);
        

        toast.error( error.response?.data?.message || error.message || "Signup failed" )
        }
        finally{
        dispatch(setLoading(false))
        toast.dismiss(toastId)}
    }
}

// export function login(email ,password ,navigate){
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading...")
//         dispatch(setLoading(true))
//         try {
//             const response = await apiConnector("POST", LOGIN_API , {
//                 email,
//                 password,
//             })

//             console.log("LOGIN API RESPONSE.........", response)

//             if(!response.data.success){
//                 throw new Error(response.data.message)
//             }

//             toast.success("Login Successful")
//             dispatch(setToken(response.data.token))
//             dispatch(setUser(response.data.user))

//             // const userImage = response.data?.user?.image
//             //     ? response.data.user.image
//             //     : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
//             // dispatch(setUser({ ...response.data.user, image: userImage}))
//             // localStorage.setItem("token", JSON.stringify(response.data.token))

//             localStorage.setItem("token",response.data.toke)

//             navigate("/dashboard/my-profile")
//         } catch (error) {
//             console.log("Login API ERROR...........", error)
//             toast.error("Login Failed")
//         }   finally {
//               dispatch(setLoading(false));
//               toast.dismiss(toastId);
//             }
//     }
// }


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        LOGIN_API,
        {
          email,
          password,
        }
      );

      console.log("LOGIN API RESPONSE.........", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Success message
      toast.success("Login Successful");

      // Save token and user in Redux
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);

      // Navigate to profile page
      navigate("/dashboard/my-profile");

    } catch (error) {
      console.log("Login API ERROR...........", error);

      toast.error(
        error?.response?.data?.message || "Login Failed"
      );
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export function logout(navigate){
    return(dispatch) => {
        dispatch(setLoading(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out")
        navigate("/")
    }
}

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) =>{
        dispatch(setLoading(true))
        try {
           const response = await apiConnector("POST" ,RESETPASSTOKEN_API , {email,}) 

           console.log("RESET PASSWORD TOKEN RESPONSE.....",response)

           if(!response.data.success){
            throw new Error(response.data.message);
           }

           toast.success("Reset Email Sent");
           setEmailSent(true);
        } catch (error) {
            console.log("RESET PASSWORD TOKEN ERROR", error)
            toast.error("Failed to send email for resetting password")
        }
        dispatch(setLoading(false));
    }
}


export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            // Check data before sending request
            console.log("Reset password request:", {
                passwordReceived: !!password,
                confirmPasswordReceived: !!confirmPassword,
                tokenReceived: !!token,
            });

            const response = await apiConnector(
                "POST",
                RESETPASSWORD_API,
                {
                    password,
                    confirmPassword,
                    token,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");

            // Navigate to login after successful reset
            navigate("/login");

        } catch (error) {
            console.error(
                "RESET PASSWORD ERROR:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Unable to reset password"
            );
        } finally {
            dispatch(setLoading(false));
        }
    };
}
 