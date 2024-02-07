import Marina from "./marinas.mjs";
import { getParams } from "./utils.mjs";

const marinaID = getParams('marina');
const marina = new Marina(marinaID,0,0,"ID");
await marina.init();
const marinaArray = marina.getMarinaArray();
console.table('marina array =',marinaArray);
//marina.init();