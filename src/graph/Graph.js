import Edge from "./Edge";

class Graph {
  constructor(numVertecies) {
    this.numVertecies = numVertecies;
    this.adj = new Map();
    this.weights = new Map();
  }

  printGraph() {
    return this.adj;
  }

  addVertex(node) {
    this.adj.set(node, []);
  }

  addEdge(u, v, weight) {
    if (u === v) throw new Error("No loops allowed");
    if (!this.adj.has(u)) this.addVertex(u);
    if (!this.adj.has(v)) this.addVertex(v);

    this.adj.get(u).push(v);
    const edge = new Edge(u, v, weight);
    this.weights.set(edge, weight);
    return edge;
  }

  getWeight(u, v) {
    const edges = Array.from(this.weights.keys());
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i];
      if (edge.a === u && edge.b === v) {
        return edge.w;
      }
    }
    throw new Error("error brother");
  }

  getVertecies() {
    const vertecies = [];
    this.adj.forEach((v, k) => vertecies.push(k));
    return vertecies;
  }

  getEdges() {
    return this.weights;
  }

  getNeighbours(node) {
    return this.adj.get(node);
  }

  addFromArray(arr) {
    arr.forEach((item) => this.addVertex(item));
  }
}

export default Graph;
