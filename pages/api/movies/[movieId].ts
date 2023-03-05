import { WithId, Document, ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (
  req: any,
  res: { json: (arg0: WithId<Document>) => void }
) => {
  const { movieId } = req.query;
  
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movie = await db
      .collection("movies")
      .findOne({_id: new ObjectId(movieId)});

    res.json(movie || {} as WithId<Document>);
  } catch (e) {
    console.error(e);
  }
};
