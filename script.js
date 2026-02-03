// Câu 1: Constructor
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = Number(price);
    this.quantity = Number(quantity);
    this.category = category;
    this.isAvailable = isAvailable === "true" || isAvailable === true;
}

// Câu 2: Khởi tạo mảng ban đầu
let products = [
    new Product(1, "iPhone 15", 25000000, 10, "Phone", true),
    new Product(2, "Sạc nhanh", 500000, 0, "Accessories", true),
    new Product(3, "MacBook M3", 42000000, 5, "Laptop", true),
    new Product(4, "Ốp lưng", 200000, 50, "Accessories", true),
    new Product(5, "Chuột BT", 800000, 20, "Accessories", false),
    new Product(6, "Samsung S24", 21000000, 8, "Phone", true)
];

// Hàm vẽ bảng để người dùng sửa dữ liệu
function renderTable() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
    products.forEach((p, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td><input type="text" value="${p.name}" onchange="updateData(${index}, 'name', this.value)"></td>
                <td><input type="number" value="${p.price}" onchange="updateData(${index}, 'price', this.value)"></td>
                <td><input type="number" value="${p.quantity}" onchange="updateData(${index}, 'quantity', this.value)"></td>
                <td><input type="text" value="${p.category}" onchange="updateData(${index}, 'category', this.value)"></td>
                <td>
                    <select onchange="updateData(${index}, 'isAvailable', this.value)">
                        <option value="true" ${p.isAvailable ? 'selected' : ''}>Bán</option>
                        <option value="false" ${!p.isAvailable ? 'selected' : ''}>Nghỉ</option>
                    </select>
                </td>
            </tr>
        `;
    });
}

// Hàm cập nhật dữ liệu khi người dùng gõ vào bảng
function updateData(index, field, value) {
    if(field === 'price' || field === 'quantity') value = Number(value);
    if(field === 'isAvailable') value = (value === "true");
    products[index][field] = value;
}

// Hàm hiển thị kết quả 10 câu hỏi
function showResult(cau) {
    const box = document.getElementById("result-box");
    let out = "";

    switch(cau) {
        case 1:
            out = "Dữ liệu hiện tại trong mảng products:\n" + JSON.stringify(products, null, 2);
            break;
        case 3:
            out = "Câu 3 (Map): Tên và Giá\n" + JSON.stringify(products.map(p => ({name: p.name, price: p.price})), null, 2);
            break;
        case 4:
            out = "Câu 4 (Filter): Sản phẩm còn hàng (Qty > 0)\n" + JSON.stringify(products.filter(p => p.quantity > 0), null, 2);
            break;
        case 5:
            let check5 = products.some(p => p.price > 30000000);
            out = `Câu 5 (Some): Có sp nào > 30tr không? => ${check5 ? "CÓ" : "KHÔNG"}`;
            break;
        case 6:
            let check6 = products.filter(p => p.category === "Accessories").every(p => p.isAvailable);
            out = `Câu 6 (Every): Tất cả Accessories có đang bán? => ${check6 ? "ĐÚNG" : "SAI"}`;
            break;
        case 7:
            let total = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
            out = `Câu 7 (Reduce): Tổng giá trị kho hàng = ${total.toLocaleString()} VNĐ`;
            break;
        case 8:
            out = "Câu 8 (for...of): Danh sách\n";
            for(let p of products) out += `- ${p.name} | ${p.category} | ${p.isAvailable ? 'Đang bán' : 'Ngừng'}\n`;
            break;
        case 9:
            out = "Câu 9 (for...in): Thuộc tính sp đầu tiên\n";
            for(let key in products[0]) out += `${key}: ${products[0][key]}\n`;
            break;
        case 10:
            let list10 = products.filter(p => p.isAvailable && p.quantity > 0).map(p => p.name);
            out = "Câu 10: Các SP sẵn sàng bán:\n" + list10.join(", ");
            break;
    }
    box.innerText = out;
}

// Chạy lần đầu
renderTable();