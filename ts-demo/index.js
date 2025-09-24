"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var numbers = [1, 2, 2, 3, 4, 4, 5];
var uniqueNumbers = lodash_1.default.uniq(numbers);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
var users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 1, name: 'Johnny' } // 重复的 ID
];
// 根据 id 属性去重
var uniqueUsers = lodash_1.default.uniqBy(users, 'id');
console.log(uniqueUsers); // [{id:1, name:'John'}, {id:2, name:'Jane'}]
