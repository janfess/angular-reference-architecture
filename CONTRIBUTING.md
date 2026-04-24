# Contributing to the Senior Angular Showcase

Thank you for your interest in this project! As a showcase of senior-level Angular architecture, we maintain high standards for code quality and structural integrity.

## 📜 Principles

- **Architecture First**: All changes must adhere to the Core/Shared/Layout/Feature hierarchy.
- **Standalone Only**: No `NgModules` are allowed.
- **Performance Budget**: Avoid adding heavy third-party dependencies. Prioritize native Angular or lightweight custom implementations.
- **Strict Typing**: No `any`. Use strict TypeScript types and interfaces.

## 🛠️ Development Workflow

1.  **Fork & Clone**: Create your own branch from `main`.
2.  **Architecture Check**: Ensure new components are placed in the correct feature or shared directory.
3.  **Local Testing**: Run `npm run start` and verify changes in the browser.
4.  **Production Validation**: Run `npm run build:prod` to ensure hydration and SSR compatibility.

## 🎨 Styling Guidelines

- Use **Primeflex** for layout utilities.
- Use **PrimeNG** for complex UI components (configured with Ripple: disabled).
- Maintain the **Glassmorphism** aesthetic where applicable.

---

*This project is primarily a portfolio, but constructive feedback or architecture-improving PRs are always welcome.*
