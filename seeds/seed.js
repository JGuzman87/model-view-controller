const sequelize = require("../config/connection");
const { User, Blog } = require("../models");
const userData = require("./userData.json");
const blogData = require("./blogData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users first
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log(
    "Seeded users:",
    users.map((user) => user.toJSON())
  );

  for (const blog of blogData) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const createdBlog = await Blog.create({
      ...blog,
      user_id: randomUser.id,
     
    });
    console.log(
      `Blog titled "${createdBlog.title}" was assigned user_id: ${createdBlog.user_id}`
    );
  }

  process.exit(0);
};

seedDatabase();
