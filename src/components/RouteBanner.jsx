import { useLocation } from 'react-router-dom'
import './RouteBanner.css'

const banners = [
  {
    match: (path) => path === '/',
    src: '/images/banner-home.jpg',
    alt: 'Living room with wood wall panels',
  },
  {
    match: (path) => path.startsWith('/catalog/'),
    src: '/images/banner-details.jpg',
    alt: 'Kitchen cabinets made from wood panels',
  },
  {
    match: (path) => path === '/catalog',
    src: '/images/banner-catalog.jpg',
    alt: 'Showroom of wood cabinets',
  },
  {
    match: (path) => path === '/wishlist',
    src: '/images/banner-wishlist.jpg',
    alt: 'Bedroom with an oak wardrobe',
  },
  {
    match: (path) => path === '/panels/new',
    src: '/images/banner-create.jpg',
    alt: 'Studio table with wood panel samples',
  },
]

function RouteBanner() {
  const { pathname } = useLocation()
  const banner = banners.find((item) => item.match(pathname)) ?? banners[0]

  return (
    <div className="route-banner">
      <img src={banner.src} alt={banner.alt} />
    </div>
  )
}

export default RouteBanner
