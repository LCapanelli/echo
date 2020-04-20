const expressUser = require('express');
const { check, validationResult} = require('express-validator');
const routerUser = expressUser.Router();
const jwt = require('jsonwebtoken');
const bcryptRouter = require('bcrypt');
const secret = process.env.APP_KEY;
const saltRounds = 10;
const auth = require('../middleware/auth');

const User = require('../models/user.ts');

/**
 * @method - GET
 * @param - /
 * @description - return all Users
 */
routerUser.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

/**
 * @method - GET
 * @param - /id
 * @description - return an Users by Id
 */
routerUser.get('/:id', getUser, (req, res) => {
    res.json(res.user);
})

/**
 * @method - PATCH
 * @param - /id
 * @description - Update an User
 */
routerUser.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err){
        res.status(400).json({ message: err.message });
    }
})

/**
 * @method - DELETE
 * @param - /:id
 * @description - Delete an User
 */
routerUser.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Deleted this User' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
routerUser.post(
    '/signup',
    [
      check('username', 'Please, enter a valid Username')
          .not()
          .isEmpty(),
      check('email', 'Please, enter a valid email')
          .isEmail(),
      check('password', 'Please, enter a valid password')
          .isLength({
          min: 6
        })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }

      const {
        username,
        email,
        password,
        hash
      } = req.body;

      try {
        let user = await User.findOne({
          email
        });

        if (user) {
          return res.status(400).json({
            msg: 'User already exists'
          });
        }

        user = new User({
          username,
          email,
          password,
          hash
        });

        await bcryptRouter
            .hash(password, saltRounds)
            .then(hash => {
                console.log(`Hash: ${hash}`);  // eslint-disable-line
                user.hash = hash;
            });

        await user.save();

        const payload = {
          user: {
              id: user.id,
              hash: user.hash
          }
        };

        jwt.sign(
            payload,
            secret, {
              expiresIn: '30d'
            },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token
              });
            }
        );

      } catch (err) {
        console.log(err.message);   // eslint-disable-line
        res.status(500)
            .send("Error saving the user");
      }
    }
);

/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */
routerUser.post(
    "/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({
                email
            });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exists"
                });

            const isMatch = await bcryptRouter.compare(password, user.hash);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password!"
                });

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                secret,
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */
routerUser.get("/me", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

async function getUser(req, res, next) {
    try {
        let user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cant find user'});
        }

        res.user = user;

    } catch(err){
        return res.status(500).json({ message: err.message });
    }
    next();
}

module.exports = routerUser;
