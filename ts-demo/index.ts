import _ from 'lodash'

const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = _.uniq(numbers);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'Johnny' } // 重复的 ID
];
// 根据 id 属性去重
const uniqueUsers = _.uniqBy(users, 'id');
console.log(uniqueUsers); // [{id:1, name:'John'}, {id:2, name:'Jane'}]
