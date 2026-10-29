import singUpImage from '../assets/Images/signup.webp'
import frameImg from '../assets/Images/frame.png';
import Template from '../component/core/Auth/Template';

const SingUp = () => {
  return (
    <div className='h-full'>
        <Template 
        title='Join the millions learning to
              code with StudyNotion for
              free'
        discription1='Build skills for today, tomorrow, and beyond.'
        discription2=' Educationto future-proof your career.'
        Image1={frameImg}
        Image={singUpImage}
        formType="singup"
        />
    </div>
  )
}

export default SingUp

