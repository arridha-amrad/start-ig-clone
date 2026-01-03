import db from "@/db";
import * as schema from "@/db/schema";
import { faker } from "@faker-js/faker";

const generateDummyPosts = async (total: number) => {
  const users = await db.select().from(schema.user);
  for (let i = 0; i < total; i++) {
    const result = await db
      .insert(schema.post)
      .values({
        userId: faker.helpers.arrayElement(users).id,
        caption: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        location: faker.location.city(),
        aspectRatio: faker.helpers.arrayElement(["1 / 1", "4 / 5"]),
      })
      .returning();

    // set media
    const randomInt = faker.number.int({ min: 1, max: 5 });
    const promises = Array.from({ length: randomInt }).map(async (_, i) => {
      await db.insert(schema.postMedia).values({
        postId: result[0].id,
        url: faker.image.url(),
        type: "image",
        order: i,
      });
    });
    await Promise.all(promises);

    // set likes
    const numberOfLikes = faker.number.int({ min: 1, max: users.length });
    const promises2 = Array.from({ length: numberOfLikes }).map(async () => {
      await db
        .insert(schema.postLike)
        .values({
          userId: faker.helpers.arrayElement(users).id,
          postId: result[0].id,
        })
        .onConflictDoNothing();
    });
    await Promise.all(promises2);
  }
};

generateDummyPosts(50)
  .then(() => console.log("posts seeded"))
  .catch((e) => console.error(e));
