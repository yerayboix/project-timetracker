export default async function ProjectDetail({
    params,
}: {
    params: Promise<{ projectId: string }>
}) {
    const { projectId } = await params;
    return (
        <div>
            <h1>Project Detail</h1>
            <p>Project ID: {projectId}</p>
        </div>
    );
}