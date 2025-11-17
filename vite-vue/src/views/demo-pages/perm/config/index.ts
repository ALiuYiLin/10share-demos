import { PERMS as CERT_PERMS } from "./cert"
import { PERMS as REVANCE_PERMS } from "./revance"
import { PERMS as EXPORT_PERMS } from "./export"

export const PERMS = {
  ...CERT_PERMS,
  ...REVANCE_PERMS,
  ...EXPORT_PERMS 
}

export type PermKey = keyof typeof PERMS

export const PermKeyArr = Object.keys(PERMS) as PermKey[]


export const PermKeyMap = PermKeyArr.reduce<Record<PermKey,PermKey>>((acc,key)=>{
  acc[key] = key
  return acc
},{} as Record<PermKey,PermKey>)
