import request from "umi-request";

export async function queryAdvancedProfile() {
  return request("/api/profile/advanced");
}

export async function queryTicketInfo(ticketId: number) {
  return request("/api/fixup/" + ticketId.toString());
}

export async function queryBriefUserInfo(userId: number) {
  return request("/api/user/" + userId.toString());
}
