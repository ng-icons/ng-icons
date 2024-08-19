# Contributing

We welcome contributions from the community! Whether you're a seasoned developer or just getting started, there are many ways to get involved. Here are a few ideas to get you started:

- **Report a bug**: If you find a bug in the library, please open an issue on GitHub. Be sure to include a detailed description of the bug, steps to reproduce, and any relevant code snippets.
- **Request a feature**: If you have an idea for a new feature or enhancement, please open an issue on GitHub. Be sure to include a detailed description of the feature, use cases, and any relevant code snippets.
- **Submit a pull request**: If you'd like to contribute code to the library, please open a pull request on GitHub. Be sure to include a detailed description of the changes, any relevant issue numbers, and any relevant code snippets.
- **Improve the documentation**: Documentation is a critical part of any library. If you'd like to help improve the library's documentation, please open a pull request on GitHub.
- **Spread the word**: If you enjoy using the library, please consider sharing it with others. The more people who use the library, the more feedback we'll receive, and the better the library will become.

## Requesting a new feature

If you have an idea for a new feature or enhancement, please open an issue on GitHub. Be sure to include a detailed description of the feature, use cases, and any relevant code snippets.

## Submitting a pull request

Before submitting a pull request, please make sure the following steps are completed:

1. Fork the repository and create a new branch from `main`.
2. Make your changes and ensure the tests pass.
3. Update the documentation if necessary.
4. Submit a pull request with a detailed description of the changes.

## Commit message guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. This allows us to automatically generate a changelog and version the library.

Here are a few examples of valid commit messages:

- `feat(core): add new size input`
- `fix(core): resolve issue with glyph icons`
- `docs: adding documentation for icon component`

## Setting up the development environment

To set up the development environment, follow these steps:

1. Clone the repository: `git clone https://github.com/ng-icons/ng-icons.git`
2. Install the dependencies: `pnpm install`
3. Start the documentation server: `pnpm start`

## Adding a new iconset

Angular Icons is built with Nx which comes with support for generators. We have created several generators to help you quickly scaffold new features.

The following generators are available:

- `nx g @ng-icons/workspace-plugin:icon-library <name>`: Generates a new icon library.
- `nx g @ng-icons/workspace-plugin:svg-to-ts`: Generates icon libraries from SVG files.
- `nx g @ng-icons/workspace-plugin:update-readmes `: Updates the README files for all icon libraries.

It is recommended to use the [Nx Console](https://nx.dev/getting-started/editor-setup) to run these generators as it provides a user-friendly interface right in your IDE.

Before adding a new icon library ensure that the license for the icon set allows for redistribution and modification.

## Running the linting

To run the linting, use the following command:

```bash
pnpm lint
```

## Running the tests

To run the tests, use the following command:

```bash
pnpm test
```

## Building the library

To build the library and documentation, use the following command:

```bash
pnpm build
```

## Running the documentation

To run the documentation locally, use the following command:

```bash
pnpm start
```

Thank you for your understanding and contributions!
