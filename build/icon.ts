import Jimp from "jimp";
import args from "args";
import icongen from "icon-gen";
import { resolve, join } from "node:path";
import { renameSync, existsSync, mkdirSync } from "node:fs";

const pngSizes = [16, 24, 32, 48, 64, 128, 256, 512, 1024];

args
  .option("input", "Input PNG file. Recommended (1024x1024)", "./icon.png")
  .option("output", "Folder to output new icons folder", "./")
  .option("flatten", "Flatten output structure for electron-builder", false);

const flags = args.parse(process.argv);

// correct paths
const input = resolve(process.cwd(), flags.input);
const output = resolve(process.cwd(), flags.output);
const flatten = flags.flatten;
const o = output;
const oSub = join(o, "icons/");
const PNGoutputDir = flatten ? oSub : join(oSub, "png");
const macOutputDir = flatten ? oSub : join(oSub, "mac");
const winOutputDir = flatten ? oSub : join(oSub, "win");

createPNGs(0).catch(err => {
  console.log(err);
});

// calls itself recursivly
async function createPNGs(position) {
  const info = await createPNG(pngSizes[position]);
  console.log(info);

  if (position < pngSizes.length - 1) {
    // keep going
    createPNGs(position + 1);
  } else {
    // done, generate the icons
    ensureDirExists(macOutputDir);
    await icongen(PNGoutputDir, macOutputDir, {
      icns: { name: "icon" },
      report: true
    });

    ensureDirExists(winOutputDir);
    await icongen(PNGoutputDir, winOutputDir, {
      ico: { name: "icon" },
      report: true
    });

    // rename the PNGs to electron format
    console.log("Renaming PNGs to Electron Format");
    await renamePNGs(0);
  }
}

async function renamePNGs(position) {
  const startName = pngSizes[position] + ".png";
  const endName = pngSizes[position] + "x" + pngSizes[position] + ".png";
  renameSync(join(PNGoutputDir, startName), join(PNGoutputDir, endName));
  console.log("Renamed " + startName + " to " + endName);

  if (position < pngSizes.length - 1) {
    // not done yet. Run the next one
    renamePNGs(position + 1);
  } else {
    console.log("\n ALL DONE");
  }
}

async function createPNG(size) {
  const fileName = size.toString() + ".png";

  // make dir if does not exist
  ensureDirExists(output);
  ensureDirExists(oSub);
  if (!flatten) {
    ensureDirExists(PNGoutputDir);
  }

  const image = await Jimp.read(input);
  image.resize(size, size);
  await image.writeAsync(join(PNGoutputDir, fileName));

  return "Created " + join(PNGoutputDir, fileName);
}

function ensureDirExists(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}
