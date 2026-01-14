import { fetchComments } from "./service";

export type TComment = Awaited<ReturnType<typeof fetchComments>>[number];
