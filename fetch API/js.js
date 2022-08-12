var API_Post = 'https://jsonplaceholder.typicode.com/posts';
fetch(API_Post) //? đây là một cái promise lấy thông tin gửi về từ backend qua cổng API
    .then(function(response){
            return response.json(); //? trả ra kiểu javacrip từ Json hiểu như json.prase
    })
    .then(function(posts){ //? do API_post trên gồm 100 bài post, do đó posts lúc này là mảng với 100 object
      var arrPost =  posts.map(function(item){
            return `<h1>${item.title}</h1>
                    <h4>${item.body}</h4>`
        })
        document.getElementById('posts').innerHTML = arrPost.join('');

    })
