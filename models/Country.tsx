import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed },
    updated_at: { type: Date, default: () => new Date() },
});

export default mongoose.models.Country || mongoose.model("Country", CountrySchema);