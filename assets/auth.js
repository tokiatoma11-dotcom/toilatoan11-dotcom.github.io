const supabaseUrl = "https://czdwjvrxurhowgduypbe.supabase.co";
const supabaseKey = "sb_publishable_ZzTEGiH075LhKy1YkeXxsQ_P2Puw1YF";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function chuyenTab(tab) {
  const formDangNhap = document.getElementById("formDangNhap");
  const formDangKy = document.getElementById("formDangKy");
  const tabDangNhap = document.getElementById("tabDangNhap");
  const tabDangKy = document.getElementById("tabDangKy");
  if (!formDangNhap || !formDangKy) return;
  formDangNhap.style.display = tab === "dangnhap" ? "flex" : "none";
  formDangKy.style.display = tab === "dangky" ? "flex" : "none";
  tabDangNhap.classList.toggle("active", tab === "dangnhap");
  tabDangKy.classList.toggle("active", tab === "dangky");
}

const formDangKyEl = document.getElementById("formDangKy");
if (formDangKyEl) {
  formDangKyEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const hoTen = document.getElementById("regHoTen").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const msg = document.getElementById("regMsg");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: hoTen } }
    });

    if (error) {
      msg.style.color = "#e05656";
      msg.textContent = "Lỗi: " + error.message;
    } else {
      msg.style.color = "#5b8dff";
      msg.textContent = "Đăng ký thành công! Đang cập nhật...";
      setTimeout(() => window.location.reload(), 1200);
    }
  });
}

const formDangNhapEl = document.getElementById("formDangNhap");
if (formDangNhapEl) {
  formDangNhapEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const msg = document.getElementById("loginMsg");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      msg.style.color = "#e05656";
      msg.textContent = "Lỗi: " + error.message;
    } else {
      msg.style.color = "#5b8dff";
      msg.textContent = "Đăng nhập thành công! Đang cập nhật...";
      setTimeout(() => window.location.reload(), 1000);
    }
  });
}

async function kiemTraDangNhap() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

async function capNhatMenuDangNhap() {
  const session = await kiemTraDangNhap();
  const nav = document.getElementById("navAuth");
  const authBox = document.getElementById("authBox");

  if (nav) {
    if (session) {
      nav.textContent = "Đăng xuất";
      nav.href = "#";
      nav.onclick = async (e) => {
        e.preventDefault();
        await supabase.auth.signOut();
        window.location.reload();
      };
    } else {
      nav.textContent = "Đăng nhập";
      nav.href = "index.html#authBox";
      nav.onclick = null;
    }
  }

  if (authBox) {
    authBox.style.display = session ? "none" : "flex";
  }
}

async function chanTaiFileNeuChuaDangNhap() {
  const session = await kiemTraDangNhap();
  if (session) return;

  document.querySelectorAll(".download-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Bạn cần đăng nhập để tải file. Đang chuyển đến trang đăng nhập...");
      window.location.href = "index.html#authBox";
    });
  });
}

async function hienThiThongTinNguoiDung() {
  const session = await kiemTraDangNhap();
  const elThongTin = document.getElementById("thongTinUser");
  if (elThongTin && session) {
    const ten = session.user.user_metadata?.full_name || session.user.email;
    elThongTin.textContent = "Xin chào, " + ten;
  }
}

capNhatMenuDangNhap();
chanTaiFileNeuChuaDangNhap();
hienThiThongTinNguoiDung();