/* =============================================
   个人作品集网站 - JavaScript 交互
   学号：25303230134  姓名：易显坤
   ============================================= */

// ============================================
// 1. 页面加载完成后执行
// ============================================
document.addEventListener("DOMContentLoaded", function () {
    console.log("网站已加载完成，欢迎访问易显坤的个人作品集！");

    // 初始化所有功能
    initMobileMenu();
    initBackToTop();
    initClock();
    initDarkMode();
    initFormValidation();
    initProjectFilter();
    initSmoothScroll();
});

// ============================================
// 2. 移动端菜单切换
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        // console.log("菜单切换：", navLinks.classList.contains("active") ? "展开" : "收起");
    });

    // 点击导航链接后关闭菜单
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });
    });
}

// ============================================
// 3. 回到顶部按钮
// ============================================
function initBackToTop() {
    const backToTop = document.getElementById("backToTop");
    if (!backToTop) return;

    // 监听滚动事件，显示/隐藏按钮
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    // 点击回到顶部
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

// ============================================
// 4. 实时时间显示
// ============================================
function initClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;

    function updateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
        const weekday = weekdays[now.getDay()];

        clock.textContent =
            year +
            "-" +
            month +
            "-" +
            day +
            "  星期" +
            weekday +
            "  " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
    }

    // 立即执行一次，然后每秒更新
    updateTime();
    setInterval(updateTime, 1000);
}

// ============================================
// 5. 暗黑模式切换（亮色/暗色切换）
// ============================================
function initDarkMode() {
    const toggle = document.getElementById("darkModeToggle");
    if (!toggle) return;

    // 默认是暗黑模式，切换为亮色模式
    let isDark = true;

    toggle.addEventListener("click", function () {
        if (isDark) {
            // 切换为亮色模式
            document.documentElement.style.setProperty("--bg-primary", "#f8f9fa");
            document.documentElement.style.setProperty("--bg-secondary", "#ffffff");
            document.documentElement.style.setProperty("--bg-card", "#ffffff");
            document.documentElement.style.setProperty("--bg-card-hover", "#f0f0f5");
            document.documentElement.style.setProperty("--text-primary", "#1a1a2e");
            document.documentElement.style.setProperty("--text-secondary", "#555570");
            document.documentElement.style.setProperty("--text-muted", "#8888a0");
            document.documentElement.style.setProperty("--border", "#dddde8");
            document.documentElement.style.setProperty("--accent", "#7c3aed");
            document.documentElement.style.setProperty("--accent-light", "#6d28d9");
            toggle.textContent = "🌙";
        } else {
            // 切换为暗黑模式
            document.documentElement.style.setProperty("--bg-primary", "#0a0a0f");
            document.documentElement.style.setProperty("--bg-secondary", "#12121a");
            document.documentElement.style.setProperty("--bg-card", "#1a1a26");
            document.documentElement.style.setProperty("--bg-card-hover", "#222233");
            document.documentElement.style.setProperty("--text-primary", "#e8e8f0");
            document.documentElement.style.setProperty("--text-secondary", "#9090a8");
            document.documentElement.style.setProperty("--text-muted", "#606078");
            document.documentElement.style.setProperty("--border", "#2a2a3a");
            document.documentElement.style.setProperty("--accent", "#7c3aed");
            document.documentElement.style.setProperty("--accent-light", "#a78bfa");
            toggle.textContent = "🌞";
        }
        isDark = !isDark;
        console.log("主题切换：", isDark ? "暗黑模式" : "亮色模式");
    });
}

// ============================================
// 6. 表单验证
// ============================================
function initFormValidation() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // 表单提交验证
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // 阻止表单默认提交
        let isValid = true;

        // 清空错误信息
        nameError.classList.remove("visible");
        emailError.classList.remove("visible");
        messageError.classList.remove("visible");

        // 验证姓名：不能为空
        if (!nameInput.value.trim()) {
            nameError.textContent = "姓名不能为空，请输入您的姓名";
            nameError.classList.add("visible");
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            nameError.textContent = "姓名至少需要2个字符";
            nameError.classList.add("visible");
            isValid = false;
        }

        // 验证邮箱格式
        if (emailInput && emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = "请输入有效的邮箱地址（例如：name@example.com）";
                emailError.classList.add("visible");
                isValid = false;
            }
        }

        // 验证留言内容：不能为空
        if (!messageInput.value.trim()) {
            messageError.textContent = "留言内容不能为空，请输入您的留言";
            messageError.classList.add("visible");
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = "留言内容至少需要10个字符";
            messageError.classList.add("visible");
            isValid = false;
        }

        // 验证是否选择了联系偏好
        const contactPref = document.querySelector('input[name="contactPref"]:checked');
        if (!contactPref) {
            alert("请选择您偏好的联系方式");
            isValid = false;
        }

        if (isValid) {
            // 验证通过，弹出成功提示
            alert("表单提交成功！感谢您的留言，我会尽快回复您。");
            console.log("表单数据：", {
                姓名: nameInput.value.trim(),
                邮箱: emailInput ? emailInput.value.trim() : "",
                留言: messageInput.value.trim(),
                联系方式偏好: contactPref ? contactPref.value : "未选择",
            });
            form.reset();
        } else {
            alert("表单验证失败，请检查红色标记的字段。");
        }
    });

    // 实时清除错误（输入时）
    nameInput.addEventListener("input", function () {
        if (nameInput.value.trim()) {
            nameError.classList.remove("visible");
        }
    });

    if (emailInput) {
        emailInput.addEventListener("input", function () {
            if (emailInput.value.trim()) {
                emailError.classList.remove("visible");
            }
        });
    }

    messageInput.addEventListener("input", function () {
        if (messageInput.value.trim().length >= 10) {
            messageError.classList.remove("visible");
        }
    });
}

// ============================================
// 7. 作品分类筛选（Tab 切换）
// ============================================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll(".works-filter button");
    const projectCards = document.querySelectorAll(".project-card");

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // 切换按钮激活状态
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            this.classList.add("active");

            const filter = this.getAttribute("data-filter");

            console.log("筛选作品分类：", filter === "all" ? "全部" : filter);

            // 筛选作品卡片
            projectCards.forEach(function (card) {
                if (filter === "all") {
                    card.style.display = "block";
                } else {
                    const tag = card.getAttribute("data-category");
                    if (tag === filter) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                }
            });
        });
    });
}

// ============================================
// 8. 平滑滚动（导航锚点）
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href === "#") return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
}

// ============================================
// 额外的控制台输出
// ============================================
console.log("JavaScript 功能已全部启动！");
console.log("包含功能：移动端菜单、回到顶部、实时时钟、暗黑模式切换、表单验证、作品筛选");
