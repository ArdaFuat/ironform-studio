import { readFile,writeFile } from 'node:fs/promises';
const input=process.argv[2] || new URL('../.local/faceted-eagle-source.glb',import.meta.url);
const source=await readFile(input);
if(source.readUInt32LE(0)!==0x46546c67 || source.readUInt32LE(4)!==2)throw Error('Expected glTF 2 binary model.');
const length=source.readUInt32LE(12);
const model=JSON.parse(source.subarray(20,20+length).toString('utf8'));
// Preserve every vertex, normal, index and node transform from the supplied file.
model.materials=(model.materials||[{}]).map((material,index)=>({
  name:`Ironform_Mirror_Gold_${index+1}`,
  pbrMetallicRoughness:{baseColorFactor:[0.83,0.57,0.19,1],metallicFactor:1,roughnessFactor:0.16},
  extensions:{KHR_materials_clearcoat:{clearcoatFactor:0.25,clearcoatRoughnessFactor:0.08}}
}));
model.extensionsUsed=[...new Set([...(model.extensionsUsed||[]).filter(x=>x!=='KHR_materials_volume'),'KHR_materials_clearcoat'])];
const json=Buffer.from(JSON.stringify(model));
const padded=Buffer.alloc(Math.ceil(json.length/4)*4,0x20);json.copy(padded);
const rest=source.subarray(20+length);
const header=Buffer.from(source.subarray(0,12));header.writeUInt32LE(12+8+padded.length+rest.length,8);
const chunkHeader=Buffer.alloc(8);chunkHeader.writeUInt32LE(padded.length,0);chunkHeader.writeUInt32LE(0x4e4f534a,4);
const output=Buffer.concat([header,chunkHeader,padded,rest]);
await writeFile(new URL('../public/assets/products/floor-eagle/floor-eagle-gold.glb',import.meta.url),output);
if(!output.subarray(20+padded.length).equals(rest))throw Error('Binary mesh data changed.');
console.log(`Gold GLB saved (${output.length} bytes). Original binary geometry preserved byte for byte.`);
