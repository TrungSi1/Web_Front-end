//!Đầu tiên cần khởi chạy json-server để có thể giao tiếp xử lí database với nó
//! chọn terminal đứng ở cái file json-server nhập vào: npm start
var courseAPI = 'http://localhost:3000/courses';

function start(){
    // getCourses(function(courses){
    //     renderCourses(courses);
    // });
    //? có thể viết rút gọn lại, courses nhận sẽ được truyền trực tiếp vào renderCourses
    getCourses(renderCourses);
    handleCreateFrom();
}

start();

//!Bước 1:tạo hàm lấy JSON từ API, callback kết quả để render sử dụng
//? hàm lấy chuỗi json từ API trả ra javascrip
function getCourses(callback){
    fetch(courseAPI) //!mặc định phương thức là GET
    .then(function(response){
        return response.json();
    })
    .then(callback); //? callback là một hàm được gửi vào khi gọi funtion getCourses,
    //? hàm này sẽ lấy code javascrip được return ở trên ra để xử lý
}

//!Bước 2:tạo hàm render để chuyển mảng javascrip vừa lấy được thành string HTML
function renderCourses (courses){
    var listCoursesBlock = document.querySelector('#list-courses');
var HTML = courses.map(function(course){ //?course không có s
    return `
    <li class="course-item-${course.id}">
        <h4>${course.name}</h4>   
        <p>${course.description}</p>
        <div class = "updateForm-${course.id}"></div>
        <button onclick = deleteCourses(${course.id})>Delete</button>   
        <button id="updateCourses" onclick = updateForm(${course.id},handleUpdateCourses(${course.id}))>Update</button>   
    </li>
    `
});
//! kết quả return ở trên là 1 mảng gồm các element <li></li> tương ứng
//! ta phải join chúng lại để tạo ra đúng 1 chuỗi string html 
    listCoursesBlock.innerHTML = HTML.join('');
}
//!Bước 3: xử lí việc tạo mới khóa học bằng form
function handleCreateFrom(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick= function(e){
      var name =document.querySelector('input[name=name]').value;
      var description =document.querySelector('input[name=description]').value;
      var formData = {
        name: name,
        description: description
      }
      createCourses(formData, function(){
                 getCourses(renderCourses);
      }); //! hàm này là đối số callback, mục đích render ra lại HTML hiển thị lên
   
    }
}
//! hàm tạo mới bằng phương thức POST gửi data json lên cho server 
function createCourses(data,callback){
    var options = { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
    };
    fetch(courseAPI, options) //! options là lựa chọn phương thức: ở đây đang chọn post 
        .then(function(response){
            return response.json();
        })
        .then(callback) //! lấy data đó xử lý hiển thị HTML luôn
};
//! bước 4 xử lý xóa khóa học
function deleteCourses(id){
    var options = { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
};
fetch(courseAPI + '/' + id, options) //! options là lựa chọn phương thức: ở đây đang chọn post 
    .then(function(response){
        return response.json();
    })
    .then(function(){
       // getCourses(renderCourses); //! trường hợp này không cần gọi lại API có thể xóa trực tiếp bằng DOM
        var courseItem = document.querySelector('.course-item-'+id);
        courseItem.remove();
    })
}
//! xử lý update khóa học
function updateForm(id, callback){
    var courseItem = document.querySelector('.updateForm-'+id);
    courseItem.innerHTML = ` 
<div>
    <div>
      <label for="">NAME</label>
      <input type="text" name="nameUpdate" />
    </div>
    <div>
      <label for="">DESCRIPTION</label>
      <input type="text" name="descriptionUpdate" />
    </div>
  </div>`
  return callback;
  }

function handleUpdateCourses(id){
   var btnUpdate = document.querySelector('#updateCourses');
   btnUpdate.onclick = function(){
    var name =document.querySelector('input[name=nameUpdate]').value;
    var description =document.querySelector('input[name=descriptionUpdate]').value;
    var formData = {
      name: name,
      description: description
    }
    updateCourses(id, formData, function(){
               getCourses(renderCourses);
    }); //! hàm này là đối số callback, mục đích render ra lại HTML hiển thị lên
   }
}
function updateCourses(id, data, callback){
    var options = { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
};
fetch(courseAPI+ "/" +id, options) //! options là lựa chọn phương thức: ở đây đang chọn post 
    .then(function(response){
        return response.json();
    })
    .then(callback) //! lấy data đó xử lý hiển thị HTML luôn
}