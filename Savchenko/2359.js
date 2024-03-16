/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
var closestMeetingNode = function(edges, node1, node2) {
    const visited1 = new Array(edges.length).fill(false);
    const visited2 = new Array(edges.length).fill(false);
    const distances1 = new Array(edges.length).fill(0);
    const distances2 = new Array(edges.length).fill(0);
    const queue = [];
    
    queue.push(node1);
    visited1[node1] = true;
    
    while (queue.length > 0) {
        const currentNode = queue.shift();
        const nextNode = edges[currentNode];
        if (nextNode !== -1 && !visited1[nextNode]) {
            queue.push(nextNode);
            visited1[nextNode] = true;
            distances1[nextNode] = distances1[currentNode] + 1;
        }
    }
    
    queue.push(node2);
    visited2[node2] = true;
    
    while (queue.length > 0) {
        const currentNode = queue.shift();
        const nextNode = edges[currentNode];
        if (nextNode !== -1 && !visited2[nextNode]) {
            queue.push(nextNode);
            visited2[nextNode] = true;
            distances2[nextNode] = distances2[currentNode] + 1;
        }
    }
    
    let closestDistance = Infinity;
    let closestNode = -1;
    
    for (let i = 0; i < edges.length; i++) {
        if (visited1[i] && visited2[i]) {
            const maxDistance = Math.max(distances1[i], distances2[i]);
            if (maxDistance < closestDistance) {
                closestDistance = maxDistance;
                closestNode = i;
            }
        }
    }
    
    return closestNode;
};