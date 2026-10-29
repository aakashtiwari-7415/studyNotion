// import logo from '../../assets/Logo/Logo-Full-Light.png';
// import { IoIosArrowDown } from "react-icons/io";
// import { CiSearch } from "react-icons/ci";
// import { IoCartOutline } from "react-icons/io5";
// import { NavbarLinks } from '../../data/navbar-links';
// import{useSelector} from 'react-redux'
// import ProfileDropDown from '../core/Auth/ProfileDropDown';
// import { useEffect ,useState } from 'react';
// import { apiConnector } from '../../services/apiConnector';
// import { categories } from "../../services/api";
// import { Link } from 'react-router-dom';
// import { useLocation , useNavigate } from 'react-router-dom';
// import Login from "../../pages/Login";
// import { Route , Routes } from 'react-router-dom';



// const subLinks = [
//     {
//         title:"python",
//         link:"/catalog/python"
//     },
//     {
//         title:"web dev",
//         link:"/catalog/web-development"
//     }
// ]




// const Navbar = () => {
//     const navigate = useNavigate();
//     const {token} = useSelector( (state) => state.auth)
//     const {user} = useSelector((state) => state.profile)
//     const {totalItem} = useSelector((state) => state.cart)

//     const location = useLocation();
//    // const [subLinks, setSubLinks] = useState([]);
//     // const fetchSubLinks = async() => {
//     //      try {
//     //             const result = await apiConnector("GET", categories.CATAGORIES_API);
//     //             console.log("Printing subLinks result:",result)
//     //             setSubLinks(result.data.data)
//     //         } catch (error) {
//     //             console.log("Could not getch the category list ");
//     //         }
//     // }

//     // useEffect( () =>  {
//     //   //  fetchSubLinks()
//     // },[])

//   return (
//     <div className='bg-richblack-800 mx-auto  '>
//       <div className='w-11/12 flex flex-row justify-around py-4 items-center '>
//         <Link to={"/"}>
//             <img src={logo}/>
//         </Link>

//         <nav>
//             <ul className='flex gap-6 text-richblack-25'>
//                 {NavbarLinks.map((link ,index) => (
//                     <li key={index}>
//                         {link.title ==="Catalog" ?
//                         (<div className='relative flex items-center gap-2 group'>
//                             <p>{link.title}</p>
//                             <IoIosArrowDown />

//                             <div className='invisible absolute left-[-80%] top-[40px] rounded-md text-richblack-900
//                                 flex flex-col bg-richblack-5 opacity-0 transition-all duration-200 group-hover:visible 
//                                 group-hover:opacity-100 h-[100px] w-[200px]'>
//                                 <div className='absolute left-[50%] top-[-8px] rotate-45 h-6 w-6 rounded-md bg-richblack-5 '></div>

//                                 {
//                                   subLinks.map((subLinks, index) =>{
//                                     return (
//                                         <div className='text-richblack-900 p-3' key={subLinks.link}>
//                                             <Link to={subLinks.link}>
//                                                 {subLinks.title}
//                                             </Link>
//                                         </div>
//                                     )
//                                   }) 
//                                 } 
//                             </div>
//                         </div>)
//                         : 
//                         (

//                         <Link
//                             to={link.path}
//                             className={
//                                 location.pathname === link.path
//                                 ? "text-yellow-25"
//                                 : "text-richblack-25"
//                             }
//                             >
//                             {link.title}
//                             </Link>
                                                    
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </nav>

//         {/* dashboard cart ProfileDropDown aur serch singup login  */}

//         <div> 
//             {
//                 user && user.accountType !="Instructor" && (
//                     <Link to="/dashbord/cart" className='relative'>
//                         <IoCartOutline />
//                         {
//                             totalItem > 0 && (
//                                 <span>
//                                     {totalItem}
//                                 </span>
//                             )
//                         }
//                     </Link>
//                 )
//             }

//             {
//                 token === null && (
//                     <Link to="/sendotp">
//                         <button className='border-[0.5px] border-richblack-500  text-richblack-100 border-solid p-3 rounded-md font-medium text-[20px]'>
//                             Log in
//                         </button>
//                     </Link>
//                 )
//             }

//             {
//                 token === null && (
//                     <Link to="/signup">
//                         <button className='border-[0.5px] border-richblack-500  text-richblack-100 border-solid p-3 rounded-md font-medium text-[20px]'>
//                             Sign up
//                         </button>
//                     </Link>
//                 )
//             }
//             {
//                 token !== null && <ProfileDropDown/>
//             }
//         </div>
  
//       </div>
//     </div>
//   )
// }

// export default Navbar











import logo from "../../assets/Logo/Logo-Full-Light.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { Link, useLocation } from "react-router-dom";

const subLinks = [
  {
    title: "Python",
    link: "/catalog/python",
  },
  {
    title: "Web Development",
    link: "/catalog/web-development",
  },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);

  const location = useLocation();

  return (
    <div className="bg-richblack-800 mx-auto">
      <div className="w-11/12 mx-auto flex flex-row justify-around py-4 items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="StudyNotion logo" />
        </Link>

        {/* Navigation links */}
        <nav>
          <ul className="flex gap-6 text-richblack-25">
            {NavbarLinks.map((link) => (
              <li key={link.path || link.title}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <button
                      type="button"
                      className="flex items-center gap-2"
                    >
                      {link.title}
                      <IoIosArrowDown />
                    </button>

                    <div
                      className="invisible absolute left-[-80%] top-[40px] z-50
                      flex flex-col bg-richblack-5 text-richblack-900
                      rounded-md opacity-0 transition-all duration-200
                      group-hover:visible group-hover:opacity-100
                      h-auto min-w-[200px]"
                    >
                      <div
                        className="absolute left-[50%] top-[-8px]
                        rotate-45 h-6 w-6 bg-richblack-5"
                      />

                      {subLinks.map((subLink) => (
                        <Link
                          key={subLink.link}
                          to={subLink.link}
                          className="relative z-10 p-3 hover:bg-richblack-25"
                        >
                          {subLink.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={
                      location.pathname === link.path
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Cart and Authentication */}
        <div className="flex items-center gap-4">
          {token && user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <IoCartOutline size={24}  className="text-richblack-5"/>

              {totalItem > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-yellow-25 text-richblack-900 px-2 text-xs">
                  {totalItem}
                </span>
              )}
            </Link>
          )}

          {!token ? (
            <div className="flex gap-x-2">
              <Link to="/sendOTP">
                <button
                  type="button"
                  className="border border-richblack-500 text-richblack-100 p-3 rounded-md font-medium"
                >
                  Log in
                </button>
              </Link>

              <Link to="/signup">
                <button
                  type="button"
                  className="border border-richblack-500 text-richblack-100 p-3 rounded-md font-medium"
                >
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <ProfileDropDown />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;




