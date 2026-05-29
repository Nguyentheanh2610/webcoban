// main.js
// JavaScript đơn giản cho nút thêm vào giỏ, hiển thị giỏ hàng, và gửi form liên hệ.
// Ghi chú: hàm go() chỉ cần với phiên bản SPA chung bainop.html.
// Với các trang HTML riêng biệt (home.html / about.html / products.html / contact.html),
// các liên kết dùng thẻ <a href="..."> và vẫn dùng chung giỏ hàng cùng toast.

let cart = [];

// Thay đổi trang trong SPA (nếu dùng bainop.html)
function go(page) {
  document.querySelectorAll('.page').forEach((section) => section.classList.remove('on'));
  document.querySelectorAll('.nb').forEach((button) => button.classList.remove('on'));

  document.getElementById('page-' + page).classList.add('on');
  document.getElementById('nav-' + page).classList.add('on');
  document.getElementById('cpanel').classList.remove('open');

  window.scrollTo(0, 0);
}

// Thêm sản phẩm vào giỏ hàng
function add(name, price, qty, button, originalText) {
  qty = Math.max(1, +qty || 1);
  const item = cart.find((product) => product.name === name);

  if (item) {
    item.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  updateCartUI();
  toast('Đã thêm ' + name);

  button.textContent = '✓ Đã thêm';
  button.classList.add('ok');

  setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove('ok');
  }, 1400);
}

// Cập nhật số lượng và nội dung giỏ hàng trên trang
function updateCartUI() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  document.getElementById('cc').textContent = totalQty;
  document.getElementById('ctot').textContent = totalQty + ' sản phẩm';

  const itemsElement = document.getElementById('citems');
  if (cart.length === 0) {
    itemsElement.innerHTML = '<div class="ce">Giỏ hàng trống</div>';
    return;
  }

  itemsElement.innerHTML = cart
    .map(
      (item) =>
        '<div class="ci">' +
        '<div>' +
        '<div class="ci-n">' + item.name + '</div>' +
        '<div style="font-size:11px;color:#999">' + item.price + '</div>' +
        '</div>' +
        '<span style="font-size:12px;font-weight:500">×' + item.qty + '</span>' +
        '</div>'
    )
    .join('');
}

// Hiện thông báo nhỏ phía dưới trang
function toast(message) {
  const toastElement = document.getElementById('toast');
  toastElement.textContent = message;
  toastElement.classList.add('show');

  setTimeout(() => {
    toastElement.classList.remove('show');
  }, 2200);
}

// Xử lý nút gửi form liên hệ
function send() {
  const fullName = document.getElementById('fn').value.trim();
  const phone = document.getElementById('fp').value.trim();

  if (!fullName || !phone) {
    toast('Vui lòng điền họ tên và số điện thoại');
    return;
  }

  document.getElementById('ok').style.display = 'block';

  ['fn', 'fp', 'fe', 'fa', 'fm'].forEach((id) => {
    document.getElementById(id).value = '';
  });
}

// Mở / đóng bảng giỏ hàng khi click
const cartToggle = document.getElementById('ct');
const cartPanel = document.getElementById('cpanel');
const clearButton = document.getElementById('clrbtn');

cartToggle.onclick = (event) => {
  event.stopPropagation();
  cartPanel.classList.toggle('open');
};

document.addEventListener('click', (event) => {
  if (!event.target.closest('#cpanel') && !event.target.closest('#ct')) {
    cartPanel.classList.remove('open');
  }
});

clearButton.onclick = () => {
  cart = [];
  updateCartUI();
};
