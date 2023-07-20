export const DotEnvConfig = () => ({
  mongodb: process.env.MONGODB,
  port: +process.env.PORT || 3000,
});
