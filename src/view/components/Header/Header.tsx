import React, { memo } from 'react'
import IMAGE from '../../../assets/img'
import ThemeDarkMode from '../ThemeDarkMode/ThemeDarkMode'
import '../../../assets/style/Header.css'


const MyHeader : React.FC= () => {
  const {log} = console
  log('Header-render')

  return (
    <header>
      <div className="container">
        {/* <!-- Logo --> */}
        <div className="logo">
          <a href='./' >Bookstore</a>
        </div>

       {/* User action */}
        <div className="user-actions">
          {/* Dark-Mode */}
          <ThemeDarkMode/>

          {/* <!-- User Info --> */}
          <div className="user_info">
            <div className="avatar">
              <img src={IMAGE.user} alt="avatar" />
            </div>
            <div className="user_name">
              <p>Ngo Hung</p>
            </div>
          </div>
        </div>
        
      </div>
    </header>
  )
}

const Header = memo(MyHeader);

export default Header