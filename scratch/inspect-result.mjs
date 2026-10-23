import fs from "fs";
const d = JSON.parse(fs.readFileSync("d:/maindextora/scratch/omni-result.json","utf8"));
const ov = d.output_video;
console.log("output_video keys:", Object.keys(ov || {}));
if (ov) {
  console.log("mimeType:", ov.mime_type || ov.mimeType);
  console.log("data length:", (ov.data || "").length);
  // Save it as video to verify
  if (ov.data) {
    fs.writeFileSync("d:/maindextora/scratch/test-output.mp4", Buffer.from(ov.data, "base64"));
    console.log("Saved test-output.mp4, size:", fs.statSync("d:/maindextora/scratch/test-output.mp4").size, "bytes");
  }
}
