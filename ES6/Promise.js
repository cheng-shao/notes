// 1.Promise的立即执行性
  var p = new Promise(function(resolve, reject){
    console.log("create a promise");
    resolve("success");
  }); // create a promise

// 2.Promise 三种状态 pending，resolved，rejected
// 3.Promise 状态的不可逆性
// 4.链式调用

// https://juejin.cn/post/6844903664516071438
// <-- 顺序执行异步任务 -->
// 使用 Promise.resolve()
// <1>
function mergePromise2(ajaxArray) {
  let p = Promise.resolve();
  let arr = [];
  ajaxArray.forEach(promise => {
    p = p.then(promise).then((data) => { // 若promise为 `() => {}` 也会执行
        arr.push(data); // 此刻arr中每项都是执行完成的 `返回值`
        return arr;
    });
  });
  return p;
}
// <2>
function mergePromise2(ajaxArray) {
  let p = Promise.resolve();
  let arr = [];
  ajaxArray.forEach(promise => {
    p = p.then(promise) // 会执行 promise
    arr.push(p) // 此刻arr中每项都是执行完成的 `promise`
  });
  return p;
}
// 使用 async
function mergePromise4(ajaxArray) {
  let arr = [];
  async function run() {
      for(let p of ajaxArray) {
          let val = await p();
          arr.push(val);
      }
      return arr;
  }
  return run();
}

