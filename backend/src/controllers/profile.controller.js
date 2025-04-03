import User from "../models/user.model.js";

export const getUserDetails = async (req, res) => {
	try {
		const userId = req.user && req.user.id;
		if (!userId) {
			return res.status(401).json({ message: "Unauthorized access" });
		}

		const user = await User.findById(userId).lean();
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const { password, ...safeUser } = user;

		return res.status(200).json(safeUser);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Server error", error: error.message });
	}
};
