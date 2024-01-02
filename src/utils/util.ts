export function calculateRemainChildComments({
    totalChildComments,
    fetchedChildComments,
}: {
    totalChildComments: number;
    fetchedChildComments: number;
}) {
    return totalChildComments - fetchedChildComments;
}
