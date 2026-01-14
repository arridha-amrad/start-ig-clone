import { pgEnum } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender_options_enum", [
  "-",
  "female",
  "male",
]);

export const mediaTypeEnum = pgEnum("media_type", ["image", "video"]);
