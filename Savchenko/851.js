/**
 * @param {number[][]} richer
 * @param {number[]} quiet
 * @return {number[]}
 */
var loudAndRich = function(richer, quiet) {
    const answer = new Array(quiet.length).fill(-1);
    const visited = new Array(quiet.length).fill(false);
    const graph = new Map();
    for (let i = 0; i < quiet.length; ++i) {
        graph.set(i, []);
    }
    for(const edge of richer) {
        graph.get(edge[1]).push(edge[0]);
    }
    const dfs = (start) => {
        if(answer[start] > 0){
            return answer[start];
        }
        answer[start] = start;
        for(const v of graph.get(start)) {
            if(quiet[answer[start]] > quiet[dfs(v)]) {
                answer[start] = answer[v];
            }
        }
        return answer[start];
    }
    for (let i = 0; i < quiet.length; ++i) {
        dfs(i);
    }
    return answer;
};








// // Черновая версия с промежуточным выводом 
// var loudAndRich = function(richer, quiet) {
//     const answer = new Array(quiet.length).fill(-1);
//     const visited = new Array(quiet.length).fill(false);
//     const graph = new Map();
//     // const queue = [];
//     for (let i = 0; i < quiet.length; ++i) {
//         graph.set(i, []);
//     }
//     for(const edge of richer) {
//         graph.get(edge[1]).push(edge[0]);
//     }
//     const dfs = (start) => {
//         console.log(`Погружение ${start}`)
//         if(answer[start] > 0){
//             return answer[start];
//         }
//         answer[start] = start;
//         console.log(`answer[start(${start})](${answer[start]}) = start(${start})`);
//         for(const v of graph.get(start)) {
//             console.log(`iteration of ${v}`);
//             console.log(`if(quiet[answer[start(${start})](${answer[start]})](${quiet[answer[start]]})   >   quiet[dfs(v(${v}))]`);
            
//             if(quiet[answer[start]] > quiet[dfs(v)]) {
//                 console.log(`Выход из dfs${v}`)
//                 console.log(`answer[start(${start})](${answer[start]}) = answer[v(${v})](${answer[v]})`);
//                 answer[start] = answer[v];
//                 console.log(answer);
//             }
//         }
//         return answer[start];
//     }
//     // for(const v of graph.get(1)) {
//     //     console.log(v);
        
//     // }
//     for (let i = 0; i < quiet.length; ++i) {
//         dfs(i);
//     }
//     console.log(answer);
//     return answer;
//     
// };


// loudAndRich([[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], [3,2,5,4,6,1,7,0]);
// loudAndRich([[1,0]], [3,2]);
// loudAndRich([[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], [3,2,5,4,6,1,7,0]);
// loudAndRich([[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], [0,1,2,3,4,5,6,7]);