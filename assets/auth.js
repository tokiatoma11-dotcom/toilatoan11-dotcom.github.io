const supabaseUrl = "https://czdwjvrxurhowgduypbe.supabase.co";
const supabaseKey = "sb_publishable_ZzTEGiH075LhKy1YkeXxsQ_P2Puw1YF";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function chuyenTab(tab) {
  document.getElementById("formDangNhap").style.display = tab === "dangnhap" ? "flex" : "none";
  document.getElementById("formDangKy").style.display = tab === "dangky" ? "flex" : "none";
  document.getElementById("tabDangNhap").classList.toggle("active", tab === "dangnhap");
  document.getElementById("tabDangKy").classList.toggle("active", tab === "dangky");
}

document.getElementById("formDangKy").addEventListener("submit", async (e) => {
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
    msg.textContent = "Đăng ký thành công! Đang chuyển hướng...";
    setTimeout(() => window.location.href = "index.html", 1200);
  }
});

document.getElementById("formDangNhap").addEventListener("submit", async (e) => {
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
    msg.textContent = "Đăng nhập thành công! Đang chuyển hướng...";
    setTimeout(() => window.location.href = "index.html", 1000);
  }
});
async function kiemTraDangNhap() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

async function capNhatMenuDangNhap() {
  const session = await kiemTraDangNhap();
  const nav = document.getElementById("navAuth");
  if (nav && session) {
    nav.textContent = "Đăng xuất";
    nav.href = "#";
    nav.onclick = async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      window.location.reload();
    };
  }
}

async function chanTaiFileNeuChuaDangNhap() {
  const session = await kiemTraDangNhap();
  if (session) return;

  document.querySelectorAll(".download-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Bạn cần đăng nhập để tải file. Đang chuyển đến trang đăng nhập...");
      window.location.href = "login.html";
    });
  });
}

capNhatMenuDangNhap();
chanTaiFileNeuChuaDangNhap();