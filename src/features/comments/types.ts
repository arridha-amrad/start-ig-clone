import { fetchComments, fetchReplies } from "./service";

export type TComment = Awaited<ReturnType<typeof fetchComments>>[number];
export type TReply = Awaited<ReturnType<typeof fetchReplies>>[number];
