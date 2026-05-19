const express = require("express");

const {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
} = require("./users-model");

const { get: getPosts, insert: insertPost } = require("../posts/posts-model");

const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get("/", async (req, res, next) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
    const users = await get();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  res.status(200).json(req.user);
});

router.post("/", validateUser, async (req, res, next) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  try {
    const newUser = await insert(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res, next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    const updatedUser = await update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await remove(req.params.id);
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    const posts = await getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/posts",
  validateUserId,
  validatePost,
  async (req, res, next) => {
    // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
    // user id yi doğrulayan bir ara yazılım gereklidir.
    // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
    try {
      const newPost = await insertPost({
        user_id: req.params.id,
        text: req.body.text,
      });
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  },
);

// routerı dışa aktarmayı unutmayın
module.exports = router;
