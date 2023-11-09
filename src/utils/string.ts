export function toUrlFriendly(str: string): string {
    const urlFriendly = str.replace(/\s+/g, "-").toLowerCase();
  
    return urlFriendly.replace(/[^a-z0-9-]/g, "");
  }