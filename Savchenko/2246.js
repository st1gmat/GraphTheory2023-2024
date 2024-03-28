/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
var longestPath = function(parent, s) { // попытка дфс со дна и вверх учитывая длину в других ветках
    const graph = {};

    let globalMaxDist = 0; // максимальная длина в общем
    for (let i = 0; i < parent.length; i++) {
        graph[i]=[];
    }
    for (let i = 0; i < parent.length; i++) {
        if (parent[i] !== -1) {
            graph[parent[i]].push(i);
        }
    }

    const dfs = (currNode) => {

        let currentMaxDist = 0; // текущая длина (со дна)

        for(let child of graph[currNode]) {

            let childDist = dfs(child); // опускаемся вниз до дна, потом на основе условия ниже обновляем макс длину суммируя текущую длину пути и нижележащих(из дфс)

            if(s[child] !== s[currNode]) {
               
                globalMaxDist = Math.max(globalMaxDist, childDist + currentMaxDist);
                
                currentMaxDist = Math.max(currentMaxDist, childDist);
            } 
        }
        
        return currentMaxDist + 1;
    }

    dfs(0) // начинаем опускаться от корня

    return globalMaxDist + 1;
}
