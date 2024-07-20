/**
 * this is just a dummy implementation , how we should 
 * used useMutation  in next.js with clean and solid coding standards
 */
import { useMutation,useQueryClient } from '@tanstack/react-query';
//@ts-expect-error
import { GetUser } from '@/types/definitions';
//@ts-expect-error
import { useToast } from '../useToast';
//@ts-expect-error
import { useSession } from 'next-auth/react';

export function useFollowsMutations({
	targetUserId,
}: {
	targetUserId: string;
}) {
	const qc = useQueryClient();
	const { data: session } = useSession();
	const queryKey = ['users',targetUserId];
	const { showToast } = useToast();

	const followMutation = useMutation({
		mutationFn: () => follow({ userId: session?.user.id!,targetUserId }),
		onMutate: async () => {
			// Cancel outgoing queries and snapshot the prev value
			await qc.cancelQueries({ queryKey });
			const previousTargetUser = qc.getQueryData(queryKey);

			// Optimistically update the UI
			qc.setQueryData<GetUser>(queryKey,(oldTargetUser) => {
				if (!oldTargetUser) return;
				return {
					...oldTargetUser,
					isFollowing: true,
					followerCount: (oldTargetUser.followerCount || 0) + 1,
				};
			});

			// Return a context object with the snapshotted value
			return { previousTargetUser };
		},
		onError: (err: Error,variables,context) => {
			qc.setQueryData(queryKey,context?.previousTargetUser);
			showToast({
				title: 'Something Went Wrong',
				message: err.message,
				type: 'error',
			});
		},
	});

	const unFollowMutation = useMutation({
		mutationFn: () => unFollow({ userId: session?.user.id!,targetUserId }),
		onMutate: async () => {
			// Cancel outgoing queries and snapshot the prev value
			await qc.cancelQueries({ queryKey });
			const previousTargetUser = qc.getQueryData(queryKey);

			// Optimistically update the UI
			qc.setQueryData<GetUser>(queryKey,(oldTargetUser) => {
				if (!oldTargetUser) return;
				return {
					...oldTargetUser,
					isFollowing: false,
					followerCount: (oldTargetUser.followerCount || 0) - 1,
				};
			});

			// Return a context object with the snapshotted value
			return { previousTargetUser };
		},
		onError: (err: Error,variables,context) => {
			qc.setQueryData(queryKey,context?.previousTargetUser);
			showToast({
				title: 'Something Went Wrong',
				message: err.message,
				type: 'error',
			});
		},
	});

	return { followMutation,unFollowMutation };
}

const follow = async ({
	userId,
	targetUserId,
}: {
	userId: string;
	targetUserId: string;
}) => {
	const res = await fetch(`/api/users/${userId}/following`,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userIdToFollow: targetUserId }),
	});

	if (!res.ok) {
		if (res.status === 409) return;
		throw new Error('Failed to follow user.');
	}

	return true;
};

const unFollow = async ({
	userId,
	targetUserId,
}: {
	userId: string;
	targetUserId: string;
}) => {
	const res = await fetch(`/api/users/${userId}/following/${targetUserId}`,{
		method: 'DELETE',
	});

	if (!res.ok) {
		if (res.status === 409) return;
		throw new Error('Failed to unfollow user.');
	}

	return true;
};


//eg. 
// export const useUpdateTitle = (id) => {
// 	const queryClient = useQueryClient()

// 	return useMutation({
// 		mutationFn: (newTitle) =>
// 			axios
// 				.patch(`/posts/${id}`,{ title: newTitle })
// 				.then((response) => response.data),
// 		// 💡 response of the mutation is passed to onSuccess
// 		onSuccess: (newPost) => {
// 			// ✅ update detail view directly
// 			queryClient.setQueryData(['posts',id],newPost)
// 		},
// 	})
// }
