import { DocumentData } from "firebase/firestore";

import { ProjectData } from "../../types";

export function isValidProjectData(data: DocumentData): data is ProjectData {
  return (
    typeof data.projectName === "string" &&
    typeof data.slug === "string" &&
    typeof data.description === "string" &&
    typeof data.selectedToken === "string" &&
    typeof data.rewardAmount === "number" &&
    typeof data.redirectUrl === "string" &&
    (data.logo === null || typeof data.logo === "string") &&
    (data.cover === null || typeof data.cover === "string") &&
    typeof data.websiteUrl === "string" &&
    typeof data.discordUrl === "string" &&
    typeof data.twitterUrl === "string" &&
    typeof data.instagramUrl === "string" &&
    typeof data.ownerAddress === "string" &&
    Array.isArray(data.affiliateAddress) &&
    data.createdAt.toDate() instanceof Date &&
    data.updatedAt.toDate() instanceof Date
  );
}