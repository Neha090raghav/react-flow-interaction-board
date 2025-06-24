# React Flow Interaction Board

A modular React-based visual editor using React Flow that allows users to drag blocks into a canvas, connect them visually, and use undo/redo functionality. Designed for clarity, modularity, and extendability.

---

## 🔧 Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Neha090raghav/react-flow-interaction-board.git
   cd react-flow-interaction-board
   ```
2. **Installation steps**
   npm install
3. **Start development server**
   npm run dev

4. **How to run app**
   After running npm start, go to:

arduino
Copy
Edit
http://localhost:3000
From there, you can:

Drag Block A or Block B from the sidebar into the canvas

Connect Block A → Block B using visual handles

Use Undo (Ctrl+Z) or Redo (Ctrl+Y) to revert state

Delete blocks or edges using the Delete/Backspace key 5. **How to run app**
After running npm start, go to:

arduino
Copy
Edit
http://localhost:3000
From there, you can:

Drag Block A or Block B from the sidebar into the canvas

Connect Block A → Block B using visual handles

Use Undo (Ctrl+Z) or Redo (Ctrl+Y) to revert state

Delete blocks or edges using the Delete/Backspace key 6. **Summary of the Solution**
The application uses React Flow to manage and render a canvas of nodes and edges.

A sidebar is implemented to provide draggable node types (Block A, Block B).

Only Block A → Block B connections are allowed (validated in onConnect).

A custom undo/redo hook (useUndoRedo) tracks canvas changes using a history stack.

Deleting nodes/edges and right-click context menu features are implemented or extendable.

Everything is structured in components (App.jsx, Canvas.jsx, Sidebar.jsx) with clear separation of logic and UI. 7. **Design Decisions**
Modular Structure
App.jsx is kept clean and only wires together the main layout (Canvas, Sidebar, and useUndoRedo).

UI logic (drag and drop, node creation) is fully encapsulated inside Canvas.jsx.

Sidebar is self-contained and only deals with block definitions and drag handling.

State Management
Local component state is used for nodes and edges using useState.

useUndoRedo custom hook allows tracking changes without external libraries like Redux.

useCallback ensures memoized functions for performance.

Connection Constraints
Users can only connect from Block A to Block B.

Invalid connections show an alert and are prevented.

Visual Feedback
Nodes use Handle components from React Flow for proper connection UI.

The layout uses minimal inline styling for full flexibility and simplicity.

Accessibility
Supports keyboard-based deletion and undo/redo shortcuts.

Easily extendable for full accessibility compliance if needed.
