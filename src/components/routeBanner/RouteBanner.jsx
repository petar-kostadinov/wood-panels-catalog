import { useLocation } from 'react-router-dom'
import './RouteBanner.css'

const banners = {
  '/': {
    src: '/images/banner-home.jpg',
    alt: 'Living room with wood wall panels',
  },
  '/catalog': {
    src: '/images/banner-catalog.jpg',
    alt: 'Showroom of wood cabinets',
  },
  '/wishlist': {
    src: '/images/banner-wishlist.jpg',
    alt: 'Bedroom with an oak wardrobe',
  },
  '/panels/new': {
    src: '/images/banner-create.jpg',
    alt: 'Studio table with wood panel samples',
  },
}

const detailsBanner = {
  src: '/images/banner-details.jpg',
  alt: 'Kitchen cabinets made from wood panels',
}

export default function RouteBanner() {
  const { pathname } = useLocation()
  const banner = pathname.startsWith('/catalog/')
    ? detailsBanner
    : banners[pathname] || banners['/']

  return (
    <div className="route-banner">
      <img src={banner.src} alt={banner.alt} />
    </div>
  )
}
