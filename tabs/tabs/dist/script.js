//!đặt các biến để lấy ra các element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $(".tab-item.active");
const line = $(".tabs .line");

// SonDN fixed - Active size wrong size on first load.
// Original post: https://www.facebook.com/groups/649972919142215/?multi_permalinks=1175881616551340
requestIdleCallback( () => {  //? hàm này giúp hiện thanh line khi vừa load trang là lúc rãnh
  //cho left của line = tabActive
  line.style.left = tabActive.offsetLeft + "px";
  // cho line move một đoạn left = khoảng cách left tính từ tabActive ra cha của nó lá tab
  line.style.width = tabActive.offsetWidth + "px";
});

tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    //bỏ active tại tab-item và tab-pane
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");
    //di chuyển thanh line
    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";
    // active cho item và pane
    this.classList.add("active"); // this ở đấy là tab được onclick
    pane.classList.add("active");
  };
});
//! nhấn mũi tên để chuyển tab
document.addEventListener('keyup', e => {
  // console.log(e.which);  //tìm giá trị phím vừa bấm
//  console.log(tabs[0]);
  switch (e.which) {
      case 39:
        //i là xét từ ember qua trái nếu i đang active thì click vào cái tiếp theo
          for (var i = tabs.length - 2; i >= 0; i--) {
              if (tabs[i].classList.contains('active') === true) {
                  tabs[i + 1].click();
              }
          }
          break;
      case 37:
          for (var i = 1; i < tabs.length; i++) {
              if (tabs[i].classList.contains('active') === true) {
                  tabs[i - 1].click();
              }
          }
          break;
  }
});
