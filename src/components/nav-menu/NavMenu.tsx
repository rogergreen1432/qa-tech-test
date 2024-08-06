import { Pencil2Icon, RocketIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setCurrentPage } from '../../reducers/users'
import { navItems } from '../../data/nav-items'

function NavMenu() {
  const { currentPage } = useSelector(selectUser)
  const dispatch = useDispatch()

  const selectIcon = (item: string) => {
    switch (item) {
      case 'PUBLISHED':
        return <RocketIcon width="20" height="20" />
      case 'IN_PROGRESS':
        return <Pencil2Icon width="20" height="20" />
      default:
        return <RocketIcon width="20" height="20" />
    }
  }

  return (
    <>
      <div className="w-[169px] mt-5">
        {navItems.map((item) => (
          <Button
            key={item.type}
            variant="solid"
            size="3"
            style={{
              justifyContent: 'left',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
            }}
            className={`h-10 !w-[176px] ${currentPage === item.type ? 'bg-PurpleBlue-10 text-white' : 'bg-white text-black'} mb-1 `}
            onClick={() => {
              localStorage.setItem('DASHBOARD_PAGE_COOKIE', item.type)
              dispatch(setCurrentPage(item.type))
            }}
          >
            {selectIcon(item.type)}
            {item.display}
          </Button>
        ))}
      </div>
    </>
  )
}

export default NavMenu
