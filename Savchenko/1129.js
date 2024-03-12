/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
var shortestAlternatingPaths = function(n, redEdges, blueEdges) {
    let graph = new Array(n);
    const answer = new Array(n).fill(-1);
    answer[0] = 0;
    const visited = new Array(n);

    for(let i = 0; i < n; ++i) {
        graph[i] = [];
    }

    for(const edge of redEdges) {
        graph[edge[0]].push([edge[1], 0]);
    }

    for(const edge of blueEdges) {
        graph[edge[0]].push([edge[1], 1]);
    }

    for(let i = 0; i < n; ++i) {
        visited[i] = new Array(2).fill(false);
    }
    visited[0][0] = true;
    visited[0][1] = true;

    let queue = [[0, 0, -1]];
    while(queue.length) {
        let [node, pathLen, prevColor] = queue.shift();
        for(const [neighbor, color] of graph[node]) {
            if(!visited[neighbor][color] && color !== prevColor) {
                queue.push([neighbor, pathLen + 1, color]);
                visited[neighbor][color] = true;
                if(answer[neighbor] === -1) {
                    answer[neighbor] = pathLen + 1;
                }
            }
        }
    }
    return answer;
};