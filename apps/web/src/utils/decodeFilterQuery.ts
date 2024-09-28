export const decodeFilterQuery = (query: string) => {
    const decoed = decodeURIComponent(query);

    const data = decoed.split(",");
    return { all: !!data?.[0]?.split(":")[1] || true, by_user: data?.[1]?.split(":")[1] || undefined, from: data?.[2]?.split(":")[1] || undefined, to: data?.[3]?.split(":")[1] || undefined }

}
