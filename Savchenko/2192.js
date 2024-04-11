/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var getAncestors = function(n, edges) {
    const ans = new Array(n).fill(null).map(() => []);
    const reversedEdges = new Array(n).fill(null).map(() => []);

    for (const [from, to] of edges) {
        reversedEdges[to].push(from);
    }
    
    const dfs = (node, ancestors, visited) => {
        visited[node] = true;
        for (const parent of reversedEdges[node]) {
            if (!visited[parent]) {
                ancestors.push(parent);
                dfs(parent, ancestors, visited);
            }
        }
    };

    for (let i = 0; i < n; i++) {
        dfs(i, ans[i], new Array(n).fill(false));
        ans[i].sort((a, b) => a - b);
    }

    return ans;
};
