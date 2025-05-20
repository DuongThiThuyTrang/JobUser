import classNames from "classnames/bind";
import styles from "./SearchSection.module.scss";
import SearchContainer from "../SearchContainer/SearchContainer";

const cx = classNames.bind(styles);

function SearchSection() {
	return (
		<div className={cx("Search")}>
			<div className={cx("SearchContent")}>
				<h2 className={cx("SectionTitle")}>Cơ hội nghề nghiệp đang chờ bạn</h2>
				<h5 className={cx("SectionHeader")}>
					Chúng tôi không chỉ tuyển nhân viên, chúng tôi tìm kiếm những người đồng hành cùng xây dựng tương lai.
				</h5>
				<p className={cx("SectionDescription")}>
					Khám phá hàng trăm vị trí hấp dẫn từ khắp mọi miền đất nước. Hãy để hành trình sự nghiệp của bạn bắt đầu tại đây!
				</p>
				<div className={cx("SectionSearchContainer")}>
					<div className={cx("SearchField")}>
						<SearchContainer />
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchSection;
