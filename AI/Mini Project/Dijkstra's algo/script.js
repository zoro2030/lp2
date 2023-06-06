/*const graph = {
  "Mumbai": { 
    "Delhi": 6,
    "Bangalore": 2,
    "Hyderabad": 7,
    "Kolkata": 10,
    "Pune": 7,
    "Surat": 1
  },
  "Delhi": { 
    "Mumbai": 6,
    "Hyderabad": 2,
    "Chennai": 10,
    "Kolkata": 2,
    "Ahmedabad": 9,
    "Jaipur": 3,
  },
  "Bangalore": { 
    "Mumbai": 2,
    "Hyderabad": 3,
    "Kolkata": 3,
    "Ahmedabad": 10,
  },
  "Hyderabad": { 
    "Mumbai": 7,
    "Delhi": 2,
    "Bangalore": 3,
    "Chennai": 4,
    "Ahmedabad": 9,
    "Pune": 2,
    "Surat": 3
  },
  "Chennai": { 
    "Delhi": 10,
    "Hyderabad": 4,
    "Kolkata": 7,
    "Pune": 9,
    "Surat": 8
  },
  "Kolkata": { 
    "Mumbai": 10,
    "Delhi": 2,
    "Bangalore": 3,
    "Chennai": 7,
    "Ahmedabad": 8,
    "Pune": 6,
    "Jaipur": 6,
    "Surat": 8
  },
  "Ahmedabad": { 
    "Delhi": 9,
    "Bangalore": 10,
    "Hyderabad": 9,
    "Kolkata": 8,
    "Pune": 7,
    "Jaipur": 10,
    "Surat": 1
  },
  "Pune": { 
    "Mumbai": 7,
    "Hyderabad": 2,
    "Chennai": 9,
    "Kolkata": 6,
    "Ahmedabad": 7,
    "Jaipur": 6,
    "Surat": 5
  },
  "Jaipur": { 
    "Delhi": 3,
    "Kolkata": 6,
    "Ahmedabad": 10,
    "Pune": 6,
    "Surat": 9
  },
  "Surat": { 
    "Mumbai": 1,
    "Hyderabad": 3,
    "Chennai": 8,
    "Kolkata": 8,
    "Ahmedabad": 1,
    "Pune": 5,
    "Jaipur": 9
  }
};*/


const graph = {
    "New York": { "Los Angeles": 5, "Chicago": 2 },
    "Los Angeles": { "New York": 5, "Chicago": 1, "San Francisco": 3 },
    "Chicago": { "New York": 2, "Los Angeles": 1, "San Francisco": 1,"India":4 },
    "San Francisco": { "Los Angeles": 3, "Chicago": 1, "Seattle": 2 },
    "Seattle": { "San Francisco": 2 },
    "India":{"New York":6,"Chicago":4}
  };

  /*const nodeCoordinates = {
    "Mumbai": { x: 50, y: 250 },
    "Delhi": { x:1100, y: 150 },
    "Bangalore": { x: 350, y: 450 },
    "Hyderabad": { x: 750, y: 450 },
    "Chennai": { x: 1050, y: 350 },
    "Kolkata": { x: 1200, y: 250 },
    "Ahmedabad": { x:350, y: 40 },
    "Pune": { x: 150, y: 350 },
    "Jaipur": { x: 750, y: 40 },
    "Surat": { x: 150, y: 150 }
  };*/
  

  const nodeCoordinates = {
    "New York": { x: 250, y: 250 },
    "Los Angeles": { x: 500, y: 150 },
    "Chicago": { x: 750, y: 150 },
    "San Francisco": { x: 500, y: 350 },
    "Seattle": { x: 1000, y: 250 },
    "India":{ x: 750, y: 350 }
  };

  /*const nodeLabels = {
    "Mumbai": "Mumbai",
    "Delhi": "Delhi",
    "Bangalore": "Bangalore",
    "Hyderabad": "Hyderabad",
    "Chennai": "Chennai",
    "Kolkata": "Kolkata",
    "Ahmedabad": "Ahmedabad",
    "Pune": "Pune",
    "Jaipur": "Jaipur",
    "Surat": "Surat"
  };*/

  const nodeLabels = {
    "New York": 'New York',
    "Los Angeles": 'Los Angeles',
    "Chicago": 'Chicago',
    "San Francisco": 'San Francisco',
    "Seattle": 'Seattle',
    "India": 'India'
  };


    class PriorityQueue {
      constructor() {
        this.queue = [];
      }

      enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sort();
      }

      dequeue() {
        return this.queue.shift();
      }

      isEmpty() {
        return this.queue.length === 0;
      }

      sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
      }
    }

    function findShortestPath() {
      const startNode = document.getElementById('startNode').value;
      const endNode = document.getElementById('endNode').value;

      const distances = {};
      const previousNodes = {};
      const queue = new PriorityQueue();

      // Initialize distances and previousNodes
      for (let node in graph) {
        distances[node] = Infinity;
        previousNodes[node] = null;
      }
      distances[startNode] = 0;

      queue.enqueue(startNode, 0);

      // Dijkstra's algorithm to find the shortest path
      while (!queue.isEmpty()) {
        const { element: currentNode, priority: currentDistance } = queue.dequeue();

        if (currentNode === endNode) {
          break; // Found the shortest path to the end node
        }

        if (currentDistance > distances[currentNode]) {
          continue; // Skip if a shorter path to this node has already been found
        }

        for (let neighbor in graph[currentNode]) {
          const distance = currentDistance + graph[currentNode][neighbor];
          if (distance < distances[neighbor]) {
            distances[neighbor] = distance;
            previousNodes[neighbor] = currentNode;
            queue.enqueue(neighbor, distance);
          }
        }
      }

      // Build the path from startNode to endNode
      const path = [];
      let currentNode = endNode;
      while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previousNodes[currentNode];
      }

      // Output the shortest path distance and highlight the path on the graph
      const shortestPathDistance = distances[endNode];
      const resultElement = document.getElementById('graph');
      resultElement.innerHTML = '';

      // Draw the graph
      for (let node in graph) {
        const { x, y } = nodeCoordinates[node];

        // Draw the node
        const nodeElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        nodeElement.setAttribute('cx', x);
        nodeElement.setAttribute('cy', y);
        nodeElement.setAttribute('r', 10);
        resultElement.appendChild(nodeElement);

        // Draw the label for the node
        const labelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelElement.setAttribute('x', x);
        labelElement.setAttribute('y', y + 20);
        labelElement.textContent = nodeLabels[node];
        resultElement.appendChild(labelElement);

        // Draw the edges
        for (let neighbor in graph[node]) {
          const { x: neighborX, y: neighborY } = nodeCoordinates[neighbor];
          const distance = graph[node][neighbor];

          const edgeElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          edgeElement.setAttribute('x1', x);
          edgeElement.setAttribute('y1', y);
          edgeElement.setAttribute('x2', neighborX);
          edgeElement.setAttribute('y2', neighborY);
          resultElement.appendChild(edgeElement);

          // Draw the label for the edge distance
          const edgeLabelElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          const edgeLabelX = (x + neighborX) / 2;
          const edgeLabelY = (y + neighborY) / 2;
          edgeLabelElement.setAttribute('x', edgeLabelX);
          edgeLabelElement.setAttribute('y', edgeLabelY);
          edgeLabelElement.textContent = distance;
          resultElement.appendChild(edgeLabelElement);

          // Store the from and to attributes for highlighting later
          edgeElement.setAttribute('data-from', node);
          edgeElement.setAttribute('data-to', neighbor);
        }
      }

      // Highlight the path on the graph
      for (let i = 0; i < path.length - 1; i++) {
        const fromNode = path[i];
        const toNode = path[i + 1];
        const edgeElement = document.querySelector(`[data-from="${fromNode}"][data-to="${toNode}"]`);
        edgeElement.classList.add('highlighted');
      }

      // Display the shortest path distance and path heading
      const pathResultElement = document.getElementById('pathResult');
      pathResultElement.innerHTML = `
        <h3>Shortest Path from ${startNode} to ${endNode}</h3>
        <p>Shortest distance: ${shortestPathDistance}</p>
        <p>Path: ${path.join(' -> ')}</p>
      `;
    }