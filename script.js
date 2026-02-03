// --- Câu 1: Khai báo constructor function Product ---
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}
// Thêm dòng này để thầy thấy bạn đã làm Câu 1
console.log("Câu 1: Đã khai báo Constructor Function Product."); 

// --- Câu 2: Khởi tạo mảng products (ít nhất 6 sp, 2 danh mục) ---
let products = [
    new Product(1, "iPhone 15 Pro", 28000000, 10, "Smartphone", true),
    new Product(2, "Sạc dự phòng Anker", 1200000, 0, "Accessories", true),
    new Product(3, "MacBook Air M2", 32000000, 5, "Laptop", true),
    new Product(4, "Ốp lưng Silicone", 150000, 50, "Accessories", true),
    new Product(5, "Chuột Gaming", 2500000, 15, "Accessories", false),
    new Product(6, "Samsung S24 Ultra", 31000000, 7, "Smartphone", true)
];
console.log("Câu 2 - Danh sách sản phẩm:", products);

// --- Câu 3: Mảng mới chỉ chứa name và price ---
let nameAndPrice = products.map(p => ({ name: p.name, price: p.price }));
console.log("Câu 3 - Tên và Giá:", nameAndPrice);

// --- Câu 4: Lọc sản phẩm còn hàng (quantity > 0) ---
let inStock = products.filter(p => p.quantity > 0);
console.log("Câu 4 - Sản phẩm còn hàng:", inStock);

// --- Câu 5: Kiểm tra có ít nhất 1 sp giá > 30.000.000 ---
let hasExpensive = products.some(p => p.price > 30000000);
console.log("Câu 5 - Có máy trên 30tr không?", hasExpensive);

// --- Câu 6: Kiểm tra tất cả sp "Accessories" có đang bán không ---
let accessoriesAvailable = products
    .filter(p => p.category === "Accessories")
    .every(p => p.isAvailable === true);
console.log("Câu 6 - Toàn bộ Accessories có đang bán?", accessoriesAvailable);

// --- Câu 7: Tính tổng giá trị kho hàng ---
let totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
console.log("Câu 7 - Tổng giá trị kho:", totalInventoryValue.toLocaleString(), "VNĐ");

// --- Câu 8: Dùng for...of in ra thông tin định dạng ---
console.log("Câu 8 - Danh sách chi tiết:");
for (let p of products) {
    let status = p.isAvailable ? "Đang bán" : "Ngừng kinh doanh";
    console.log(`${p.name} - ${p.category} - ${status}`);
}

// --- Câu 9: Dùng for...in in ra thuộc tính và giá trị ---
console.log("Câu 9 - Duyệt thuộc tính sp đầu tiên:");
let firstItem = products[0];
for (let key in firstItem) {
    if (typeof firstItem[key] !== 'function') {
        console.log(`${key}: ${firstItem[key]}`);
    }
}

// --- Câu 10: Tên các sản phẩm đang bán VÀ còn hàng ---
let availableAndInStock = products
    .filter(p => p.isAvailable && p.quantity > 0)
    .map(p => p.name);
console.log("Câu 10 - Lấy danh sách tên sản phẩm đang bán và còn hàng:", availableAndInStock);