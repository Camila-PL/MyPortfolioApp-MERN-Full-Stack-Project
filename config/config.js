const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://Cami_pl:Sasha3881160@cami.tazttqn.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cami" ||
    process.env.MONGODB_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGODB_PORT || "27017") +
      "/mernproject",
};

export default config;
