//! PHÂN TÍCH FNC TEMPLAETE TRING 
function fnc([first,...strings],...values){
    return values.reduce(
        (acc, curr)=>[...acc, `<span>${curr}</span>`,strings.shift()]
    ,[first]).join('');
}
const name = 'javascrip' , web = 'f8';
const html = fnc`học lập trình ${name} tại ${web} !`
console.log(html)

//todo khi gọi fnc bằng template string thì chuỗi đó là đối số truyền cho hàm
//todo đối số này gồm các chuỗi và các biến
//todo khi hàm lấy đối số đó nó lưu vào một mảng có index 0 là mảng các chỗi, các index sau lần lượt là giá trị các biến
//! do đó khi khai báo tham số của fnc phải khai báo dạng destructuring ...để rãi mảng đó ra function fnc(...n)
//để tiện sử dụng thì lấy ra như sau
//*function fnc([first,...string],...variable) thì first = học lập trình; strings=[ ' tại ', '!' ]; values=[ 'javascrip', 'f8' ]

//todo phương thức reduce có 2 tham số callback và khởi tạo trong fnc callback có tham số (tích lũy, hiện tại)
//todo khi fnc callback thực thi có trình tự như sau
/** 
 * * acc là first = 'học lập trình' được gán kiểu arr[] để vòng lập thứ 2 ta có thể rải mảng vừa nhận để thêm vào mảng mới
 * * curr là values[0] = 'javascrip' ,strings[0] = 'javascrip'
 * * vòng thứ 1 giá trị return của callback là ['học lập trình','<span>javascrip</span>']
 * * sau vòng 1 thì strings[0] = '!' do phương thức shift đã lấy ra cái đầu và xóa đi, first là return vừa nhận được
 * * acc là return, curr là values[1] = 'f8'
 * * vòng thứ 2 giá trị return trả về 
 * *[ 'học lập trình ',
 * *'<span>javascrip</span>',
 * * ' tại ',
 * *  '<span>f8</span>',
 * *  ' !' ]
*/

