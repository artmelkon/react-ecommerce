import Color from "../models/color";

export const postProduct = async (req: any, res: any) => {
  try {
    const docs: any[] = [
      { "color": "red" },
      { "color": "purple" },
      { "color": "yellow" },
      { "color": "blue" }
    ];

    const resault = await Color.insertMany(docs);
    const ids = resault;
    for(let id of Object.values(ids)) {
      console.log(`Inserted a document with id ${id}`);
    }
    res.status(200).json({ message: req.body.name })
  } catch (error) {
    console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`)
  }
}
