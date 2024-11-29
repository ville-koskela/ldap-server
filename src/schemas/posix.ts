import * as z from "zod";

export const posixAccountSchema = z.object({
  objectClass: z.array(z.string()),
  cn: z.string(),
  uid: z.string(),
  uidNumber: z.coerce.number(),
  gidNumber: z.coerce.number(),
  homeDirectory: z.string(),
  loginShell: z.string().default("/bin/bash"),
  gecos: z.string().optional(),
  userPassword: z.string().optional(),
});

// Lowercase version of the schema
export const lowerCasePosixAccountSchema = z
  .object({
    objectclass: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => (typeof val === "string" ? val.split(",").map((s) => s.trim()) : val)),
    givenname: z.string().optional(),
    sn: z.string().optional(),
    cn: z.string(),
    uid: z.string(),
    uidnumber: z.coerce.number(),
    gidnumber: z.coerce.number(),
    homedirectory: z.string(),
    loginshell: z.string().default("/bin/bash"),
    gecos: z.string().optional(),
    userpassword: z.string().optional(),
  })
  .transform((data) => ({
    objectClass: Array.isArray(data.objectclass) ? data.objectclass : [data.objectclass],
    cn: data.cn,
    uid: data.uid,
    uidNumber: data.uidnumber,
    gidNumber: data.gidnumber,
    homeDirectory: data.homedirectory,
    loginShell: data.loginshell,
    gecos: data.gecos || `${data.givenname ?? ""} ${data.sn ?? ""}`.trim(),
    userPassword: data.userpassword,
  }));

export const posixGroupSchema = z.object({
  cn: z.string(),
  gidNumber: z.coerce.number(),
  memberUid: z.array(z.string()).optional(),
});

export type PosixAccount = z.infer<typeof posixAccountSchema>;
export type PosixGroup = z.infer<typeof posixGroupSchema>;
