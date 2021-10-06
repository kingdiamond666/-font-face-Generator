import { opendir } from "fs/promises";
//This takes two directories of exactly the same length, combines them into one array and then interpolates the file names into an @font-face command for css. Use whenever you have two folders of fonts you need to generate a bunch of css for.
try {
  const fileArr = [];
  const fileArr2 = [];

  // Loop through first directory and push filename onto an array
  const dir = await opendir("DIRECTORY1");
  for await (const font of dir) {
    fileArr.push(font.name);
  }
  // Loop through second directory and push filename onto a second array
  const dir2 = await opendir("DIRECTORY2");
  for await (const font2 of dir2) {
    fileArr2.push(font2.name);
  }
  // Sort Each Array Alphabetically
  const finfileArr = fileArr.sort();
  const finfileArr2 = fileArr2.sort();

  const newArr = finfileArr.map((e, i) => [e, finfileArr2[i]]);
  // Loop over and return an interpolated string to create a new array of final strings in their formats.
  const finalArr = newArr.map((item) => {
    return `@font-face{
      font-family: "${item[0].split(".")[0]}";
      src: url("${item[0]}") format("woff2"),
           url("${item[1]}") format("woff");
      font-style: normal;
      font-weight: normal;
    }`;
  });
  finalArr.forEach((item) => {
    console.log(item);
  });
  // const fileArr2 = fileArr.map((item) => item.split("}"));
  // console.log(fileArr2);
} catch (err) {
  console.error(err);
}

// fontStr.replace(/(\r\n|\n|\r)/gm, "");
// fileArr.push(fontStr);

//item.split("[\\r\\n]+")[item.split("[\\r\\n]+").length - 1]
// @font-face{
//   font-family: "Ogg-Bold";
//   src: url("Ogg-Bold.woff2") format("woff2"),
//        url("Ogg-Bold.woff") format("woff");

//  }
