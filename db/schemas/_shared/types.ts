export enum ESubscriptionTier {
	FREE = "free",
	PRO = "pro",
}

export const SubscriptionTier = Object.values(ESubscriptionTier) as [
	string,
	...string[],
];

export enum EMatchStatus {
	PENDING = "pending",
	ACCEPTED = "accepted",
	DECLINED = "declined",
}

export const MatchStatus = Object.values(EMatchStatus) as [string, ...string[]];
