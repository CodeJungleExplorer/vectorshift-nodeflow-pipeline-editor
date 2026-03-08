# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

app = FastAPI(title="Pipeline Parser API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: list[dict[str, Any]]
    edges: list[dict[str, Any]]


def is_dag(nodes: list[dict], edges: list[dict]) -> bool:
    """
    Detect whether the graph is a Directed Acyclic Graph using
    Kahn's algorithm (topological sort via in-degree counting).
    """
    node_ids = {n["id"] for n in nodes}

    # Build adjacency list + in-degree map
    adj: dict[str, list[str]] = {nid: [] for nid in node_ids}
    in_degree: dict[str, int] = {nid: 0 for nid in node_ids}

    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        if src in adj and tgt in in_degree:
            adj[src].append(tgt)
            in_degree[tgt] += 1

    # Start with nodes that have no incoming edges
    queue = [nid for nid, deg in in_degree.items() if deg == 0]
    visited = 0

    while queue:
        node = queue.pop()
        visited += 1
        for neighbour in adj[node]:
            in_degree[neighbour] -= 1
            if in_degree[neighbour] == 0:
                queue.append(neighbour)

    # If we visited all nodes → no cycle → it's a DAG
    return visited == len(node_ids)


@app.get("/")
def read_root():
    return {"ping": "pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag,
    }
