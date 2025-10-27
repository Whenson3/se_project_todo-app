# AI Assistant Instructions for Simple Todo App

## Project Overview
This is a vanilla JavaScript todo application with a focus on clean HTML structure and CSS organization. The project follows a component-based architecture without using any framework.

## Key Architecture Patterns

### File Structure
- `blocks/`: Contains CSS files following BEM methodology for individual components
- `components/`: JavaScript components (e.g., `Todo.js`, `Validate.js`)
- `pages/`: Main application logic and styles (`index.js`, `index.css`)
- `utils/`: Shared utilities and constants
- `vendor/`: Third-party styles and fonts

### Component Architecture
- Components are initialized in `pages/index.js`
- HTML templates are defined in `index.html` using the `<template>` tag
- Each component has its own CSS file in `blocks/` following BEM naming

### Important Patterns
1. Todo Item Generation:
```javascript
// Example from index.js
const generateTodo = (data) => {
  const todoElement = todoTemplate.content.cloneNode(true);
  // ... component initialization
};
```

2. Modal Handling:
```javascript
const openModal = (modal) => {
  modal.classList.add("popup_visible");
};
```

## CSS Conventions
- BEM methodology is strictly followed
- Component styles are isolated in separate files
- Files are named after their main block (e.g., `todo.css`, `popup.css`)
- Vendor styles are kept separate in `vendor/`

## Key Files
- `index.html`: Main app structure and component templates
- `pages/index.js`: Core application logic and component initialization
- `components/Todo.js`: Todo item component logic (WIP)
- `blocks/*.css`: Individual component styles

## Development Workflow
1. Component Changes:
   - Add HTML template to `index.html`
   - Create component logic in `components/`
   - Add corresponding styles in `blocks/`

2. Styling:
   - Follow BEM naming: `block__element_modifier`
   - Place new styles in appropriate block file
   - Import new stylesheets in `pages/index.css`

## Data Flow
- Todo data is managed in memory without persistence
- Components communicate through DOM events
- Form submissions are handled in `pages/index.js`

## Known Limitations
- No data persistence
- Limited error handling
- Todo.js component implementation pending

When modifying this codebase, maintain the clean separation of concerns between HTML structure (templates), JavaScript behavior (components), and CSS styling (blocks).