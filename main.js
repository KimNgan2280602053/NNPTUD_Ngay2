async function getData() {
    try {
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json();
        let body = document.getElementById('table_body');
        body.innerHTML = '';
        for (const post of posts) {
            let isDel = post.isDeleted;
            
            let displayTitle = isDel ? `<del>${post.title}</del>` : post.title;
            let displayViews = isDel ? `<del>${post.views}</del>` : post.views;

            body.innerHTML += `<tr>
                <td>${post.id}</td>
                <td>${displayTitle}</td>
                <td>${displayViews}</td>
                <td><input type='submit' value='Delete' onclick='Delete("${post.id}")'></td>
            </tr>`
        }
    } catch (error) {
        console.log(error);
    }
}

async function Save() {
    let id = document.getElementById('txt_id').value.trim();
    let title = document.getElementById('txt_title').value;
    let views = document.getElementById('txt_views').value;

    if (id === "") {
        try {
            let resPosts = await fetch('http://localhost:3000/posts');
            let posts = await resPosts.json();
            
            let maxId = 0;
            if (posts.length > 0) {
                let ids = posts.map(p => parseInt(p.id));
                maxId = Math.max(...ids);
            }
            
            //  Tự tăng ID lên 1
            let newId = (maxId + 1).toString();

            //  Gọi API POST để tạo mới
            let res = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: newId,
                    title: title,
                    views: views
                })
            });
            if (res.ok) {
                console.log("Tạo mới thành công");
                getData(); // Cập nhật lại bảng ngay lập tức
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        // TRƯỜNG HỢP: CẬP NHẬT (Đã nhập ID)
        try {
            let res = await fetch('http://localhost:3000/posts/' + id, {
                method: 'PATCH', // Dùng PATCH để chỉ cập nhật title, views, không làm mất isDeleted
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    views: views
                })
            });
            if (res.ok) {
                console.log("Cập nhật thành công");
                getData(); // Cập nhật lại bảng ngay lập tức
            }
        } catch (error) {
            console.log(error);
        }
    }
}

async function Delete(id) {
    // CHUYỂN THÀNH XÓA MỀM
    let res = await fetch('http://localhost:3000/posts/' + id, {
        method: 'PATCH', // Cập nhật lại dữ liệu thay vì xóa
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isDeleted: true // Thêm thuộc tính isDeleted
        })
    });
    if (res.ok) {
        console.log("Xóa mềm thành công");
        getData(); // Load lại bảng để thấy chữ bị gạch ngang
    }
}

getData();