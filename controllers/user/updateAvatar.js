const { UserModel } = require("../../database/models/user.model");

const updateAvatar = async (req, res) => {
    const { _id } = req.user;

    await UserModel.findByIdAndUpdate(_id, { avatar: req.file.path });

    res.json({ avatar: req.file.path });
};

module.exports = {
    updateAvatar,
};