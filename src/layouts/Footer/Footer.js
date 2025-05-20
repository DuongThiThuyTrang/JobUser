import classNames from "classnames/bind";
import styles from "./Footer.module.scss";


const cx = classNames.bind(styles);

function Footer() {
	return (
		<footer className={cx("footer")}>
			<div className={cx("footerContainer")}>
				{/* Cột logo và mô tả */}
				<div className={cx("footerColumn", "about")}>
					<a href="/" className={cx("logo")}>

						<span>JobFinder</span>
					</a>
					<p className={cx("description")}>
						Nền tảng hỗ trợ tìm việc làm hiệu quả, kết nối nhà tuyển dụng và ứng viên một cách nhanh chóng.
					</p>
					<div className={cx("socialIcons")}>
						<a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
						<a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
						<a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
						<a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
						<a href="#" title="Email"><i className="fas fa-envelope"></i></a>
					</div>
				</div>

				{/* Cột liên kết nhanh */}
				<div className={cx("footerColumn")}>
					<h4>Về chúng tôi</h4>
					<ul>
						<li><a href="#">Giới thiệu</a></li>
						<li><a href="#">Tin tức</a></li>
						<li><a href="#">Liên hệ</a></li>
						<li><a href="#">Tuyển dụng</a></li>
					</ul>
				</div>

				{/* Cột hỗ trợ */}
				<div className={cx("footerColumn")}>
					<h4>Hỗ trợ</h4>
					<ul>
						<li><a href="#">Câu hỏi thường gặp</a></li>
						<li><a href="#">Chính sách bảo mật</a></li>
						<li><a href="#">Điều khoản dịch vụ</a></li>
						<li><a href="#">Trợ giúp</a></li>
					</ul>
				</div>

				{/* Cột thông tin liên hệ */}
				<div className={cx("footerColumn")}>
					<h4>Liên hệ</h4>
					<ul className={cx("contactInfo")}>
						<li>Địa chỉ: Đường Z115, Quyết Thắng, TP. Thái Nguyên</li>
						<li>Email: <a href="mailto:contact@ictu.edu.vn">contact@ictu.edu.vn</a></li>
						<li>Hotline: 0123 456 789</li>
					</ul>
				</div>
			</div>

			<div className={cx("footerBottom")}>
				<p>© 2025 CÔNG TY TNHH JobFinder VIỆT NAM. All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
