
import {FaSearch} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
function Header() {
    const {currentUser} =useSelector(state=>state.user)
    return (
        <header className="bg-slate-200 shadow-md ">
            <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
                <Link to="/">
                <h1 className="font-bold text-sm sm:text-xl md:text-2xl lg:text-4xl flex flex-wrep flex-col sm:flex-row">
                    <span className="text-slate-500">Markande</span>
                    <span className="text-slate-700">Construction</span>
                </h1>
                </Link>
                <form className="bg-slate-100 rounded-lg p-3 flex items-center w-30 sm:w-64">
                    <input type="text" placeholder="Search..." 
                    className="bg-transparent focus:outline-none w-24 sm:w-64"
                    
                    />
                    <FaSearch className='text-slate-600'/>
                </form>
                <ul className="flex gap-4 items-center">
                   <Link to="/"><li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li></Link>
                   <Link to="/about"><li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li></Link>
                   {currentUser?
                   <Link to="/profile">
                       <img src={currentUser.data.photo} alt="profile" className='w-7 rounded-full h-7 object-cover'/>
                   </Link>:
                   <Link to="/sign-in"><li className='sm:inline text-slate-700 hover:underline cursor-pointer'>SignIn</li></Link>
                   }
                </ul>
            </div>
        </header>
    )
}

export default Header
