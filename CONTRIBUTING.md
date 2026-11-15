# Contributing to Dynamic Metal Storefront

Thank you for your interest in contributing to this project! Whether you want to add features, fix bugs, or improve the documentation, your help is appreciated.

## Code of Conduct
Feel free to set up a Code of Conduct if you deem it necessary. The current project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) for healthy open‑source communities.

## Getting Started

1. **Fork** the repository and clone your fork: 
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/dynamic-metal-storefront
   ```
2. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/my-awesome-feature
   ```
3. **Make your changes**. Keep code style consistent with the project’s existing patterns and run lint/formatter:
   ```bash
   npm i
   npm run lint
   ```
4. **Run the test suite** (add or update tests as needed):
   ```bash
   npm test
   ```
5. **Commit** your changes with a clear message:
   ```bash
   git commit -m "Add feature X"
   ```
6. **Push** to your fork and open a pull request.

## Pull Request Checklist

- [ ] The change follows the guide of the existing components.
- [ ] The commit message is concise and describes the purpose of the change.
- [ ] All linting and unit tests pass.
- [ ] Documentation is updated if necessary.
- [ ] The new functionality works in `npm run dev`.

## Testing

The project uses a basic sandboxed test approach. Run:
```bash
npm run test
``` 
to execute the tests.

## Security

If you discover a security vulnerability, please do not commit or open a pull request; instead contact the project maintainer via email.

---

We appreciate any level of contribution. Good luck!
