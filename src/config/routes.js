const routes = {
	// public
	login: "/login",
	home: "/",
	detailJob: "/job/:_id",
	company: "/company",
	detailCompany: "/company/:_id",
	blog: "/blog",
	signUp: "/sign-up",
	forgotPassword: "/forgot-password",
	recruitment: "https://job-admin-six.vercel.app/",

	resetPassword: "/reset-password",
	error: "*",
	// private
	job: "/job",
	opportunities: "/opportunities",
	test: "/test",
	setting: "/setting",
	myApplications: "/applications",
};

export default routes;
