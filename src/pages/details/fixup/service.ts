import request from "umi-request";

export async function queryAdvancedProfile() {
  return request("/api/profile/advanced");
}

export async function queryTicketInfo(ticketId: number) {
  return request("/api/fixup/" + ticketId.toString());
}
