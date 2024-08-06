import { ExitIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import NavMenu from '../nav-menu/NavMenu'
import { useNavigate } from 'react-router-dom'

function SideBar() {
  const navigate = useNavigate()

  const logout = async () => {
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <>
      <div className="w-[182px] flex-grow mx-4 h-[calc(100vh_-_74px)]">
       
        {/* NAV MENU */}
        <NavMenu />

        {/* BOTTOM NAV */}
        <div className="w-[182px] absolute bottom-0 mb-5">
          <Button
            variant="solid"
            size="3"
            className="text-black bg-white w-[182px] h-10 justify-start cursor-pointer"
            onClick={() => logout()}
            style={{
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            <ExitIcon width="20" height="20" /> Sign Out
          </Button>
        </div>
      </div>
    </>
  )
}

export default SideBar
