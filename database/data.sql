INSERT INTO "logs" ("log", "location", "latitude", "longitude")
VALUES             ('this is where i have visited the most past 14 weeks','LearningFuze', 33.6348748, -117.7404808);

INSERT INTO "photos" ("logId", "image")
VALUES               (1, '/images/LFZimage.png');

INSERT INTO "users" ("username", "hashedPassword")
VALUES              ('anonymous', '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA');
