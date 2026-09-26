import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
const source = path.resolve(
  process.env.UAT_SCREENSHOT_SOURCE ||
    "../iOS/UAT Pocket/docs/App Store Screenshots/iPhone 6.5-inch - App Store Connect",
);
await mkdir("public/images", { recursive: true });
for (const file of (await readdir(source)).filter((x) => x.endsWith(".png"))) {
  const stem = file.replace(".png", "");
  for (const width of [384, 640, 960])
    await sharp(path.join(source, file))
      .resize({ width })
      .webp({ quality: 85 })
      .toFile(`public/images/${stem}-${width}.webp`);
  await sharp(path.join(source, file))
    .resize({ width: 640 })
    .png({ compressionLevel: 9, palette: true })
    .toFile(`public/images/${file}`);
}
await sharp(
  process.env.UAT_APP_ICON_SOURCE ||
    "../iOS/UAT Pocket/UAT Pocket/Assets.xcassets/AppIcon.appiconset/Icon-1024.png",
)
  .resize(180, 180)
  .png()
  .toFile("public/icon.png");
