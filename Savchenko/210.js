/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */

const DFS = (graph, courseNode, visited, stack, cycleCheck) => {
    visited[courseNode] = true;
    cycleCheck[courseNode] = true;
    
    for (const neighbor of graph.get(courseNode)) {
        if (cycleCheck[neighbor]) {
            return false;
        }
        if (!visited[neighbor]) {
            if (!DFS(graph, neighbor, visited, stack, cycleCheck)) {
                return false;
            }
        }
    }
    
    cycleCheck[courseNode] = false;
    stack.push(courseNode);
    return true;
};

const findOrder = (numCourses, prerequisites) => {
    if (prerequisites.length === 0 && numCourses === 1) {
        return [0];
    } else if (prerequisites.length === 0 && numCourses > 1) {
        return Array.from(Array(numCourses).keys()).reverse();
    }
    
    const graph = new Map();
    for (let i = 0; i < numCourses; ++i) {
        graph.set(i, []);
    }
    
    for (const course of prerequisites) {
        graph.get(course[1]).push(course[0]);
    }
    
    const stack = [];
    const visited = Array(numCourses).fill(false);
    const cycleCheck = Array(numCourses).fill(false);
    
    for (let i = 0; i < numCourses; ++i) {
        if (!visited[i]) {
            if (!DFS(graph, i, visited, stack, cycleCheck)) {
                return [];
            }
        }
    }
    
    return stack.reverse();
};
