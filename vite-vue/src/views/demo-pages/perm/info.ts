import { PermKeyMap , type PermKey } from "./config"

export interface PermInfo {
  value: PermKey,
  label: string
  children?: PermInfo[]
}

export const INFOS:PermInfo[] = [
  {
    value: PermKeyMap.cert_base,
    label: '证书管理',
    children: [
      {
        value: PermKeyMap.cert_read,
        label: '查看'
      },
      {
        value: PermKeyMap.cert_write,
        label: '编辑'
      },
      {
        value: PermKeyMap.cert_grunt,
        label: '发布'
      },
      {
        value: PermKeyMap.cert_audit,
        label: '审核'
      },
      {
        value: PermKeyMap.cert_admin,
        label: '管理'
      }
    ]
  },
  {
    value: PermKeyMap.revance_base,
    label: '收益管理',
    children: [
      {
        value: PermKeyMap.revance_income_base,
        label: '明细管理',
        children: [
          {
            value: PermKeyMap.revance_income_read,
            label: '读取'
          },
          {
            value: PermKeyMap.revance_income_write,
            label: '写入'
          }
        ]
      },
      {
        value: PermKeyMap.revance_cost_base,
        label: '成本管理',
        children: [
          {
            value: PermKeyMap.revance_cost_read,
            label: "读取"
          },
          {
            value: PermKeyMap.revance_cost_write,
            label: "写入"
          }
        ]
      }
    ]
  },
  {
    value: PermKeyMap.export_base,
    label: '导出管理',
    children: [
      {
        value: PermKeyMap.export_base,
        label: '导出'
      }
    ]
  }
]

// 现在有一个数组，数组中的元素是PermKey
/* 
```text
[’cert_read‘,’revance_income_read‘] => ['cert_base','revance_income_base',’cert_read‘,’revance_income_read‘]

├── []cert_base
│   ├── []cert_read、[]cert_write、[]cert_grunt、[]cert_audit、[]cert_admin
└── []revance_base
    ├── []revance_income_base
    │   ├── []revance_income_read、[]revance_income_write
    └── []revance_cost_base
        ├── []revance_cost_read、[]revance_cost_write
```
*/

/* 
├── []cert_base
│   ├── [√]cert_read、[]cert_write、[]cert_grunt、[]cert_audit、[]cert_admin
└── []revance_base
    ├── []revance_income_base
    │   ├── []revance_income_read、[]revance_income_write
    └── []revance_cost_base
        ├── [√]revance_cost_read、[]revance_cost_write
arr = [’cert_read‘,’revance_cost_read‘] =>  ['cert_base',’cert_read‘,‘revance_base’,’revance_cost_base‘,’revance_cost_read‘]
├── [√]cert_base ['cert_read','cert_base']
│   ├── [√]cert_read、[]cert_write、[]cert_grunt、[]cert_audit、[]cert_admin
└── []revance_base ['revance_cost_read','revance_cost_base','revance_base']
    ├── []revance_income_base
    │   ├── []revance_income_read、[]revance_income_write
    └── [√]revance_cost_base ['revance_cost_read','revance_cost_base']
        ├── [√]revance_cost_read、[]revance_cost_write
*/
export function normalizePermKeys(keys:PermKey[],item?:PermInfo,itemParrent?:PermInfo){
  const normalizedKeys:PermKey[] = []
  if(!item && !itemParrent){
    const set = new Set(INFOS.map(info=>info.value))
    const offItemKeys = keys.filter(k=> !set.has(k))
    INFOS.forEach(info=>{
      normalizedKeys.push(...normalizePermKeys(offItemKeys,info))
    })
  }
  if(item?.children){
    const offItemKeys = keys.filter(key=> key!==item.value)
    item.children.forEach(child=>{
      normalizedKeys.push(...normalizePermKeys(offItemKeys,child,item))
    })
    if(item?.value && !keys.includes(item?.value) && itemParrent){
        normalizedKeys.push(itemParrent.value,item.value)
    }
  }else{
    if(itemParrent){
      if(item?.value && keys.includes(item?.value)){
        normalizedKeys.push(itemParrent.value,item.value)
      }
    }
  }
  return Array.from(new Set(normalizedKeys))
}
// key: {level,parent}
/* 
if(!keys.includes(parent.value)){
  keys.push(parent.value)
}
*/
