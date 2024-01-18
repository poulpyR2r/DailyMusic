

const verifyIfIsAdmin = (req, res, next) => {
  if (req.user.role === "false") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Accès interdit: vous n'êtes pas administrateur" });
  }
};
