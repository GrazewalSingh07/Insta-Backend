const cloudinary=require("cloudinary")

cloudinary.config({
    cloud_name: 'des4i2xu7', 
    api_key: '858183295937275', 
    api_secret: 'tYNp2m7DTGdWSKJbUYUP3snQ5UI',
    secure: true
})

module.exports = cloudinary;