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
  }
]