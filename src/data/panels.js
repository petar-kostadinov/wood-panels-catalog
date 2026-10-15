export const panels = [
  {
    id: 'sonoma-oak',
    name: 'Sonoma oak, 16 mm',
    material: 'Chipboard',
    swatch: 'chipboard',
    width: 2800,
    height: 2070,
    thickness: 16,
    price: 15.03,
    author: 'Georgi Iliev',
    added: '14 Oct 2026',
    copy: 'Sonoma oak chipboard for wardrobe carcasses. The foil face is even, with a light wood grain.',
  },
  {
    id: 'birch',
    name: 'Birch, 12 mm',
    material: 'Plywood',
    swatch: 'plywood',
    width: 2500,
    height: 1250,
    thickness: 12,
    price: 19.53,
    author: 'Maria Koleva',
    added: '9 Oct 2026',
    copy: 'Birch plywood for furniture and cabinets. The sheet is flat, with a sound edge. It cuts cleanly on a table saw.',
  },
  {
    id: 'white-matte',
    name: 'White matte, 18 mm',
    material: 'MDF',
    swatch: 'mdf',
    width: 2800,
    height: 2070,
    thickness: 18,
    price: 23.93,
    author: 'Ivan Petrov',
    added: '2 Oct 2026',
    copy: 'White matte MDF for cabinet doors and shelves. The face is smooth and ready for paint.',
  },
]

export function getPanel(id) {
  return panels.find((panel) => panel.id === id)
}

export function formatPrice(price) {
  return `€${price.toFixed(2)}`
}
