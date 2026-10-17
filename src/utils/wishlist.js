function storageKey(email) {
  return `wishlist:${email}`
}

export function readWishlist(email) {
  const saved = localStorage.getItem(storageKey(email))
  return saved ? JSON.parse(saved) : []
}

export function saveWishlist(email, ids) {
  localStorage.setItem(storageKey(email), JSON.stringify(ids))
}
