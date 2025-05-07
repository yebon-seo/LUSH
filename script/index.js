const menuBtn = document.querySelector(".w-768_nav > .menubtn")
const showMenu = document.querySelector(".w-768_nav > ul")
const closeBtn = document.querySelector(".w-768_nav > ul > .closebtn")

menuBtn.addEventListener("mouseover", function () {
  showMenu.style.display = "block"
})
closeBtn.addEventListener("click", function () {
  showMenu.style.display = "none"
})


let current = 1; // 현재 섹션 번호 (1부터 시작)
const section = document.querySelectorAll(".section")
const total = section.length; // 전체 섹션의 개수
let isScrolling = false; // 현재 스크롤/스와이프 동작 중인지 여부
let touchStartY = 0; // 터치 시작 지점의 Y 좌표
let touchEndY = 0; // 터치 종료 지점의 Y 좌표
// 마우스 휠 이벤트 리스너
window.addEventListener('wheel', handleScroll);
// 터치 이벤트 리스너 추가
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY; // 터치 시작 지점의 Y 좌표 저장
});
// window.addEventListener('touchmove', (e) => {
//   e.preventDefault(); // 기본 스크롤 동작 방지
// }, { passive: false }); // passive: false 옵션을 사용하여 preventDefault() 호출 허용
// 터치가 끝났을 때의 이벤트 리스너
window.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].clientY; // 터치가 끝난 지점의 Y 좌표 저장
  handleTouch(); // 터치 동작 처리 함수 호출
});
// 터치 동작을 처리하는 함수
function handleTouch() {
  // 현재 스크롤 중이면 추가 동작 방지
  if (isScrolling) return;
  // 터치의 시작점과 끝점의 차이 계산 (위로 스와이프하면 양수, 아래로 스와이프하면 음수)
  const diffY = touchStartY - touchEndY;
  const minSwipeDistance = 50; // 최소 스와이프 거리 설정 (픽셀 단위)
  // 최소 스와이프 거리보다 작으면 동작하지 않음
  if (Math.abs(diffY) < minSwipeDistance) return;
  // 스크롤 중임을 표시하고 0.7초 후에 다시 스크롤 가능하도록 설정
  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 700);
  // 위로 스와이프하고 마지막 섹션이 아닐 경우
  if (diffY > 0 && current < total) {
    current++; // 현재 섹션 번호 증가
    upSections(); // 다음 섹션으로 이동
  }
  // 아래로 스와이프하고 첫 번째 섹션이 아닐 경우
  else if (diffY < 0 && current > 1) {
    downSection(); // 이전 섹션으로 이동
    current--; // 현재 섹션 번호 감소
  }
}
function handleScroll(e) {
  if (isScrolling) return;
  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 700);
  if (e.deltaY > 0 && current < total) {
    current++;
    upSections();
  } else if (e.deltaY < 0 && current > 1) {
    downSection();
    current--;
  }
}
function upSections() {
  const section = document.getElementById(`page${current}`);
  section.style.transform = `translateY(0%)`;
}
function downSection() {
  const section = document.getElementById(`page${current}`);
  section.style.transform = `translateY(100%)`;
}

/*스와이퍼*/
const swiper = new Swiper('.swiper', {
  // 기본 설정
  loop: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 0, /*수정*/
  effect: "coverflow",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },

  // 페이지네이션
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // 자동 재생
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
