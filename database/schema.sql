set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."logs" (
	"logId"     serial NOT NULL,
	"log"       TEXT NOT NULL,
	"location"  TEXT NOT NULL,
	"latitude"  DECIMAL NOT NULL,
	"longitude" DECIMAL NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT  "logs_pk" PRIMARY KEY ("logId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."photos" (
	"photoId"   serial NOT NULL,
	"logId"     int NOT NULL,
	"image"    TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "photos_pk" PRIMARY KEY ("photoId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("logId") REFERENCES "logs"("logId");
