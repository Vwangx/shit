const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const router = Router()

// api/auth
router.post('/api/auth/registration', [], async (req, res) => {
    try {
        const { email, password } = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            res.status(400).json({message: "Email already exist..."})
        }
        const hashedPass = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPass})

        await user.save()

        res.status(201).json({message: "User created!"})

    } catch (e) {
        res.status(500).json({
            message: "Something went wrong..."
        })
    }
})

router.post('/api/auth/login', [], async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({message: "Email or password is not correct"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: "Email or password is not correct"})
        }

        const token = jwt.sign(
            { userId: user.id },
            "Mbunity2020",
            { expiresIn: '7d' }
        )

        res.json({
            token,
            userId: user.id
        })

    } catch (e) {
        res.status(500).json({
            message: "Something went wrong..."
        })
    }
})

module.exports = router