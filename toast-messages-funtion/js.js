const $ = document.querySelector.bind(document);

const btnSuccess = $('.btnSuccess');
const btnError = $('.btnError');


btnSuccess.onclick = function() {
    toast({
        title: "Thành công!",
        message: "Bạn đã đăng ký thành công.",
        type: "success",
        duration: 5000
      });
}
btnError.onclick = () => {
    toast({
        title: "Thất bại!",
        message: "Có lỗi xảy ra, vui lòng liên hệ quản trị viên.",
        type: "error",
        duration: 5000
      });
    }
function toast({ title = "", message = "", type = "", duration = 3000}) {

    const icons = {
        success: "fas fa-check-circle",
        error: "fas fa-exclamation-circle"
      };

    const toastId = document.getElementById("toast");

    if (toastId) {

      const toast = document.createElement("div"); //tạo thẻ div
      toast.classList.add("toast", `toast__${type}`); // thêm class vào
      const delay = (duration / 1000).toFixed(2); //fix cho kết quả chỉ còn 2 số sau phẩy
      toast.style.animation = `slideInLeft ease .3s, fadeOut ease 1s ${delay}s forwards`; // thêm animation ẩn sau thời gian delay, quá trình là trong 1s

      //render ra thẻ vừa tạo có chứa HTML như sau
      toast.innerHTML = `
        <div class="toastIcon"><i class="${icons[type]}"></i></div>
        <div class="toastContent">
          <h2>${title}</h2>
          <p>${message}</p>
        </div>
        <div class="toastClose">
          <i class="fas fa-times"></i>
        </div>
  `;
        toastId.appendChild(toast); // add thẻ div mới tạo bằng createElement vào thẻ cha là toastId

         // Auto remove toast, animation là chỉ ẩn nên cần dùng hàm này để xóa khỏi view luôn
        const autoRemoveId = setTimeout(function () {
            toastId.removeChild(toast);
        }, duration + 1000); //1000 là thời gian quá trình ẩn diễn ra là 1s

        // Remove toast when clicked
         toast.onclick = function (e) {
            if (e.target.closest(".toastClose")) {
                toastId.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };
    }

    
};