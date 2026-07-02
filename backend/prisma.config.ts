{
  "name": "novastore-backend",
  "version": "1.0.0",
  "description": "NovaStore E-commerce Backend API",
  "main": "src/server.js",
  "engines": {
    "node": "22.x"
  },
  {
  "scripts": {
    "dev": "nodemon src/server.js",
    "build": "prisma generate",
    "postinstall": "prisma generate",
    "start": "node src/server.js"
  }
}
  "keywords": [
    "ecommerce",
    "api",
    "nodejs",
    "express"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@prisma/client": "^6.19.3",
    "bcrypt": "^6.0.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "prisma": "^6.19.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
