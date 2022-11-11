class Edge {
  constructor(a, b, w) {
    if (a === b) throw new Error("Loops are not allowed");
    if (a == null || b == null) throw new Error("Nodes can not be null");
    if (w < 0) this.w = 0;
    this.a = a;
    this.b = b;
    this.w = w;
  }
}

export default Edge;
