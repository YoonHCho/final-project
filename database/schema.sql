set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."logs" (
	"logId" serial NOT NULL,
	"userId" int,
	"log" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	"latitude" DECIMAL NOT NULL,
	"longitude" DECIMAL NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "logs_pk" PRIMARY KEY ("logId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."photos" (
	"photoId" serial NOT NULL,
	"userId" int,
	"logId" int NOT NULL,
	"image" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "photos_pk" PRIMARY KEY ("photoId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"joinedAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "logs" ADD CONSTRAINT "logs_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "photos" ADD CONSTRAINT "photos_fk1" FOREIGN KEY ("logId") REFERENCES "logs"("logId");
