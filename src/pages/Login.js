import loginImg from "../assets/Images/login.webp"
import frameImg from '../assets/Images/frame.png';
import Template from "../component/core/Auth/Template";

const Login = () => {
  return (
    <div>
      <Template
      title="Welcome Back"
      discription1="Build skills for today , tomorrrow and beyond."
      discription2="Education to future-proof your career."
      Image1={frameImg}
      Image={loginImg}
      formType="login"/>
    </div>
  )
}

export default Login
