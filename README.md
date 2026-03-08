# VectorShift NodeFlow Pipeline Editor

A visual pipeline editor built with **ReactFlow (React)** and **FastAPI (Python)** that allows users to create node-based workflows and analyze their structure as a **Directed Acyclic Graph (DAG)**.

This project was developed as part of a **VectorShift frontend technical assessment**.

---

## 🚀 Features

* **Node Abstraction**

  * Reusable `BaseNode` component
  * Quickly create new node types with minimal code

* **Multiple Node Types**

  * Input Node
  * Output Node
  * LLM Node
  * Text Node
  * Additional custom nodes

* **Dynamic Text Node**

  * Automatically resizes based on input text
  * Detects variables using `{{variableName}}`
  * Dynamically generates input handles for variables

* **Pipeline Builder**

  * Drag and connect nodes visually
  * Build complex workflows using edges

* **Backend Analysis**

  * Sends pipeline structure to FastAPI backend
  * Calculates:

    * number of nodes
    * number of edges
    * whether the pipeline forms a **Directed Acyclic Graph (DAG)**

* **User Feedback**

  * Displays pipeline analysis results in an alert

---

## 🛠 Tech Stack

### Frontend

* React
* ReactFlow
* JavaScript
* CSS

### Backend

* Python
* FastAPI
* Uvicorn

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone https://github.com/CodeJungleExplorer/vectorshift-nodeflow-pipeline-editor.git
```

```
cd vectorshift-nodeflow-pipeline-editor
```

---

### 2️⃣ Start Backend

```
cd backend
```

Create virtual environment:

```
python -m venv venv
```

Activate environment (Windows):

```
venv\Scripts\activate
```

Install dependencies:

```
pip install fastapi uvicorn
```

Run backend:

```
uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

API Docs:

```
http://127.0.0.1:8000/docs
```

---

### 3️⃣ Start Frontend

Open a new terminal:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run React app:

```
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔍 How It Works

1. Users create nodes in the visual editor.
2. Nodes are connected to form a pipeline.
3. When **Submit** is clicked:

   * The frontend sends nodes and edges to the backend.
4. The backend:

   * Counts nodes
   * Counts edges
   * Checks if the graph is a **DAG**

## 📌 Future Improvements

* Persist pipelines to database
* Add more node types
* Export/import pipelines
* Real-time pipeline validation
* Enhanced node styling

---

## 👨‍💻 Author

**Vishal Pandey**


