const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateAvatar, updateUser, getCurrentUser,
} = require('../controllers/users');
const { url, id, password } = require('../utils/regexps');

router.get('/me', getCurrentUser);
router.get('/', getUsers);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(id).length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
        'string.empty': 'Поле "about" должно быть заполнено',
      }),

  },
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(url),
  }),
}), updateAvatar);

module.exports = router;
