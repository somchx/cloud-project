// Product images mapping
export const productImages = {
  'เลย์ รสออริจินัล': '/img/doritos.jpg',
  'โดริโทส': '/img/lays.jpg',
  'ช็อคโกแลต': '/img/snack.jpg',
  'น้ำดื่ม 600ml': '/img/water.jpg',
  'โค้ก 325ml': '/img/coke.jpg',
  'เป็ปซี่ 325ml': '/img/pepsi.jpg',
  'น้ำชาเขียว': '/img/greentea.jpg',
  'ทิชชู่': '/img/tissue.jpg',
  'ถุงขยะ': '/img/trash.jpg',
  'สบู่': '/img/soap.jpg',
  'มาม่า': '/img/mama.jpg',
  'ยำยำ': '/img/yumyum.jpg'
};

export const getProductImage = (productName) => {
  return productImages[productName] || '/img/default.png';
};
