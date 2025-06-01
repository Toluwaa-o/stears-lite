import redis from "@/lib/redis";

export async function enqueueCompanyJob(slug: string) {
    // RPUSH adds to the end of the list
    console.log(slug, ' Job queued')
    await redis.rpush("company-ingestion-queue", slug);
}

export async function dequeueCompanyJob(): Promise<string | null> {
    const result = await redis.lpop("company-ingestion-queue");
    if (typeof result === "string" || result === null) {
        return result;
    }
    // Unexpected type — handle error or return null
    return null;
}
