var users = [
    {
        id:1,
        name:'quang thanh'
    },

    {
        id: 2,
        name: 'son dang'
    },

    {
        id:3,
        name:'Hung Dam'
    }
]


var comments = [
    {
        id: 1,
        user_id:1,
        content:'anh son chua ra video :('
    },
    {
        id:2,
        user_id: 2,
        content:'vua ra xong em oi'
    }
]
//? đây là một hoạt động không đồng bộ trong hệ thống gọi là aSync
//? nếu không dùng promise thì phải dùng nhiều funtion xếp tầng tạo thành callback hell
//! có 3 bước:
//! 1 lấy comment từ API:
//! 2 lọc user có comment bằng id 
//! 3 gắn comment cho user tương ứng
//! 4 chuyển thành thẻ html gắn vào file html
 

// fake ipa
// * lấy ra danh sách comment
//* function này trả về một promise
// * Promise này có exclutor là funtion với tham số là resolve
// * exclutor này có chức nắng là setTimeout thực thi phương thức resolve với đối số là mảng tên comments
// todo: hiểu đơn giản là hàm getComments này sau 1s thực thi  resolve(comments)
var btnElement = document.querySelector('button');

function getComments(){
    return new Promise(function(resolve){
        
        btnElement.onclick = function(){
            resolve(comments);
        } 
    })
}
// duyệt qua danh sách người dùng xem: 
// người nào có id trùng với user_id của danh sách comment ko
// sau 1s trả về kết quả trùng(result) cho promise, promise trả về cho getUserById
function getUserByIds(user_id){
    return new Promise(function(resolve){
        var result = users.filter(function(user){
            return user_id.includes(user.id)
        })
            resolve(result)
    })
}
// gọi đến hàm comment
getComments()
//? do hàm getComments trả về Promise được resolve(comments) do đó trong đây ta gọi .then để thực thi
//? tham số của function trong then sẽ được truyền tham số là mảng comments trong resolve(comments)
    .then(function(comments){
        // lấy ra danh sách userIds = các user_id con
        var userIds = comments.map(function(comment){
            return  comment.user_id
        })
        return getUserByIds(userIds)
            // thực hiện lấy ra các người dùng có id = user_id dựa trên hàm getUserByIds
            .then(function(users){
                return {
                    users:users,
                    comments: comments
                }
            })
    })
   
    //? bây giờ ta đã có được thông tin những người dùng đã comment đặt tên là data
    //? data gồm 2 mảng 1 là comment, 2 là users gồm 2 item có id giống id trong commnet
    /** 
    */ 
    
    .then(function(data){
        var commentBlock = document.getElementById('comment-block')
        var html = ''
        // object data có 2 đối tượng là users và comments
        // sau đó duyệt qua từng phần tử của comments
        // lần lặp đầu tiên sẽ dựa trên user_id của comment1 để tìm ra user1
        // tương tự với lần lặp thứ 2 và ...
        data.comments.forEach(function(comment) {
            // kiểm tra xem trong users, phần tử nào có id bằng id trong user_id của comment
            // sau đó trả phần tử đó về user
            var user = data.users.find(function(user){
                return user.id === comment.user_id;
            })
            html += `<li>${user.name}: ${comment.content}</li>`;
        });

        commentBlock.innerHTML = html;
    })

//     // console.log(getComments());