# 角色权限编辑组件解决方案
## 功能描述
如何实现一个角色权限编辑组件，用户输入角色名，并为该角色分配不同的权限。
## 实现难点
### 一、角色权限数据结构
在一个后台管理项目中，通常将项目按菜单来进行分类，每个菜单下又有多个页面，每个页面不同的角色有不同的权限。页面中不同角色能看见、操作的元素也不同。
比如:
```text
├── 仪表盘-管理员
├── 系统管理/-管理员
│   ├── 用户管理-管理员
│   ├── 角色管理-管理员
│   └── 菜单管理-管理员
└── 报表中心/
    ├── 销售报表-审核者
    └── 财务报表-审核者
```

```ts
// 角色权限数据结构
interface Role {
  name: string;
  permissions: string[];
}


export const report_base = {
  paths: [],
  apis: []
}

export const report_scales_base = {
  paths: [PATHS.report_scales],
  apis: []
}

export const report_scales_read = {
  paths: [...report_scales_base.paths],
  apis: [APIS.report_scales_read]
}
export const report_scales_write = {
  paths: [...report_scales_base.paths],
  apis: [APIS.report_scales_write]
}

export const report_financial_base = {
  paths: [PATHS.report_financial],
  apis: []
}

export const report_financial_read = {
  paths: [...report_financial_base.paths],
  apis: [APIS.report_financial_read]
}
export const report_financial_write = {
  paths: [...report_financial_base.paths],
  apis: [APIS.report_financial_write]
} 

const PERMS = {
  report_base,
  report_scales_base,
  report_scales_read,
  report_scales_write,
  report_financial_base,
  report_financial_read,
  report_financial_write,
}
```


### 二、角色权限编辑组件
角色权限编辑组件的功能是用户输入角色名，并为该角色分配不同的权限。
在为角色分配权限时，不同层级的权限它的粒度是不同的。这就需要组件以树的形式展示权限，用户可以通过勾选不同的节点来为角色分配权限。
比如：
- 系统管理：普通用户、管理员
- 报表中心：销售报表-查看者、销售报表-审核者、财务报表-查看者、财务报表-审核者
```text
[ 输入角色名 ]
├── 仪表盘-[]普通用户、[]管理员
├── 系统管理
│   ├── 用户管理-[]普通用户、[]管理员
│   ├── 角色管理-[]普通用户、[]管理员
│   └── 菜单管理-[]普通用户、[]管理员
└── 报表中心
    ├── 销售报表-[]销售查看者、[]销售审核者
    └── 财务报表-[]财务查看者、[]财务审核者、[]管理员
```
#### 3.1组件实现难点
- 如何以树的形式展示权限？
- 如何为角色分配权限？
  用户勾选了[]报表中心-销售报表-销售查看者，那么该角色就有了销售报表-查看者的权限,在组件permkeys = ['report_scales_read']。
