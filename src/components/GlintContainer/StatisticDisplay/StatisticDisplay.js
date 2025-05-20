import classNames from "classnames/bind";
import styles from "./StatisticDisplay.module.scss";
import CountUp from "react-countup";
import { FaUserTie, FaBuilding, FaBriefcase } from "react-icons/fa";

const cx = classNames.bind(styles);

function StatisticDisplay() {
	return (
		<section className={cx("StatisticSection")}>
			<div className={cx("StatItem")}>
				<div className={cx("IconWrapper")}><FaUserTie /></div>
				<p className={cx("StatNumber")}>
					<CountUp end={4013612} duration={3} separator="." />+
				</p>
				<p className={cx("StatLabel")}>Ứng viên đã tìm được việc làm phù hợp</p>
			</div>

			<div className={cx("StatItem")}>
				<div className={cx("IconWrapper")}><FaBuilding /></div>
				<p className={cx("StatNumber")}>
					<CountUp end={52591} duration={3} separator="." />+
				</p>
				<p className={cx("StatLabel")}>Doanh nghiệp tin tưởng và đồng hành</p>
			</div>

			<div className={cx("StatItem")}>
				<div className={cx("IconWrapper")}><FaBriefcase /></div>
				<p className={cx("StatNumber")}>
					<CountUp end={12991} duration={3} separator="." />+
				</p>
				<p className={cx("StatLabel")}>Cơ hội việc làm cập nhật mỗi tháng</p>
			</div>
		</section>
	);
}

export default StatisticDisplay;
