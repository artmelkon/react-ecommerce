import mongoose from 'mongoose';

export async function dbConnect(app: any) {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("MongoDB connected successfully");
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server started successfully!`))
  } catch (error) {
    throw new Error('Unable connecting to MongoDB')
  }
}
