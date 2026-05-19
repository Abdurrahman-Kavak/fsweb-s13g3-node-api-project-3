const { getById } = require("../users/users-model");

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    const user = await getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kullanıcı bilgileri alınırken hata oluştu" });
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const { name } = req.body;
  if (!name || typeof name !== "string" || !name.trim()) {
    res.status(400).json({ message: "gerekli name alanı eksik" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const { text } = req.body;
  if (!text || typeof text !== "string" || !text.trim()) {
    res.status(400).json({ message: "gerekli text alanı eksik" });
  } else {
    next();
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
