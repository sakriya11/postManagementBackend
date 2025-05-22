import db from "./config/db/db";
import Upload from "./models/upload";

 const post = [
      {
        id: 1,
        img: "uploads\img\apple.jpg",
        title: "Grand Opening!",
        description: "Join us for the grand opening of our new restaurant location!",
        date:"25 septmber",
        role:"teacher"
      },
       {
        id: 2,
        img: "uploads\img\apple.jpg",
        title: "Grand Opening!",
        description: "Join us for the grand opening of our new restaurant location!",
        date:"25 septmber",
        role:"teacher"
      },
    

    ];

db.once("open", async () => {
  console.log("Connected to MongoDB");
  try {
    await Upload.deleteMany({}); 
    console.log("Existing exercises deleted.");
    const result = await Upload.insertMany(post);
    console.log("Seeded exercises:", result);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    db.close();
    console.log("Connection closed.");
  }
});

