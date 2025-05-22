import Upload from "../models/upload";

export const viewRoleBasedContent = async (
  role: string,
  excludeField: string
): Promise<any[]> => {
  let query = {};
  if (role === "teacher") query = { role: "admin" };
  else if (role === "child") query = { role: "teacher" };

  const content = Upload.find(query || {}) // if query is empty, find all (admin)
    .select(`-${excludeField}`);

  return await content;
};

export const deleteContent = async (id: string) => {
  await Upload.findOneAndDelete({ _id: id });
};
