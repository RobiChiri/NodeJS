import { writeFile } from "node:fs";

writeFile("message.txt", "Hello Node.js", "utf8", function (error) {
  if (error) {
    return console.log(error);
  }

  console.log("The file has been saved!");
});
